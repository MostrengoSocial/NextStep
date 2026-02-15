from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'hello@nextstep.com.pt')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class StatusCheckCreate(BaseModel):
    client_name: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
async def send_notification_email(submission: ContactSubmission):
    """Send email notification for new contact form submission"""
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1A1A1A; border-bottom: 2px solid #1A8A84; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold; width: 30%;">Name:</td>
                    <td style="padding: 10px; background-color: #fafafa;">{submission.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; background-color: #fafafa;"><a href="mailto:{submission.email}" style="color: #1A8A84;">{submission.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px; background-color: #fafafa;">{submission.phone or 'Not provided'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">Service Interest:</td>
                    <td style="padding: 10px; background-color: #fafafa;">{submission.service or 'Not specified'}</td>
                </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f7f4; border-left: 4px solid #1A8A84;">
                <h3 style="margin: 0 0 10px 0; color: #1A1A1A;">Message:</h3>
                <p style="margin: 0; color: #444; line-height: 1.6;">{submission.message}</p>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #888;">
                Submitted on: {submission.timestamp.strftime('%B %d, %Y at %H:%M UTC')}
            </p>
        </div>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"nextStep - New Inquiry from {submission.name}",
            "html": html_content
        }
        
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Notification email sent successfully. Email ID: {email.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send notification email: {str(e)}")
        return False


async def send_confirmation_email(submission: ContactSubmission):
    """Send confirmation email to the person who submitted the form"""
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1A1A1A; font-size: 28px; margin: 0;">
                    <span style="color: #E44D60;">></span>
                    <span style="color: #E8893C;">></span>
                    <span style="font-style: italic;">nextStep</span>
                </h1>
            </div>
            
            <h2 style="color: #1A1A1A; margin-bottom: 20px;">Thank you for reaching out, {submission.name.split()[0]}!</h2>
            
            <p style="color: #444; line-height: 1.8; margin-bottom: 20px;">
                We've received your inquiry and one of our team members will get back to you within 24 hours to schedule your confidential consultation.
            </p>
            
            <div style="background-color: #f8f7f4; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1A1A1A; margin: 0 0 15px 0; font-size: 16px;">Your Message Summary:</h3>
                <p style="color: #666; margin: 0 0 10px 0;"><strong>Service Interest:</strong> {submission.service or 'General Consultation'}</p>
                <p style="color: #666; margin: 0; font-style: italic;">"{submission.message[:200]}{'...' if len(submission.message) > 200 else ''}"</p>
            </div>
            
            <p style="color: #444; line-height: 1.8; margin-bottom: 20px;">
                In the meantime, feel free to reach us directly via WhatsApp for faster response:
            </p>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://wa.me/351934229144" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                    Chat on WhatsApp
                </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #888; font-size: 12px; line-height: 1.6; margin: 0;">
                nextStep | Your Trusted Partner for Moving to Portugal<br>
                Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal<br>
                <a href="mailto:hello@nextstep.com.pt" style="color: #1A8A84;">hello@nextstep.com.pt</a> | +351 934 229 144
            </p>
            
            <p style="color: #aaa; font-size: 11px; margin-top: 20px;">
                This is an automated confirmation. Please do not reply directly to this email.
            </p>
        </div>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [submission.email],
            "subject": "Thank you for contacting nextStep - We'll be in touch soon!",
            "html": html_content
        }
        
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Confirmation email sent to {submission.email}. Email ID: {email.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
        return False


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(input: ContactSubmissionCreate):
    """Submit a contact form inquiry - saves to database and sends email notifications"""
    submission_dict = input.model_dump()
    submission_obj = ContactSubmission(**submission_dict)
    
    doc = submission_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contact_submissions.insert_one(doc)
    
    logger.info(f"New contact submission from {input.name} ({input.email})")
    
    # Send emails concurrently (non-blocking, don't fail if emails fail)
    await asyncio.gather(
        send_notification_email(submission_obj),
        send_confirmation_email(submission_obj),
        return_exceptions=True
    )
    
    return submission_obj


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub['timestamp'], str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    
    return submissions

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()