# Next Step - Product Requirements Document

## Original Problem Statement
Build a modern, minimalist, and sophisticated landing page for "Next Step" - a boutique consultancy firm providing lawyer/mediator/consultancy services for LGBTQIA+ individuals investing in Portugal.

## Target Audience
- Boomer/Gen X LGBTQIA+ individuals and families
- Looking to invest, relocate, or establish business presence in Portugal
- International clients (primarily from UK, Canada, Brazil, USA)

## Core Requirements

### Functionality
- Bilingual support (English & Portuguese) with toggle
- Testimonials/Client Stories section
- Contact form with backend submission
- WhatsApp integration (934229144)
- Facebook Messenger integration

### Design
- Sophisticated, modern look and feel
- Inspired by reference site: https://apricot-harmonica-egca.squarespace.com/
- Hero slideshow featuring Algarve region (Tavira, Ria Formosa, Benagil)
- Smooth page-wide animations
- Custom rainbow-themed logo

---

## What's Been Implemented

### Completed Features (December 2025)
1. **Hero Section with Slideshow**
   - 4 high-quality images: Luxury villa, Tavira, Quinta do Lago aerial beach, Lagos cliffs
   - Auto-transitions every 6 seconds with Ken Burns effect
   - Clickable slide indicators with progress animation

2. **Bilingual Support**
   - Language context with EN/PT toggle
   - All content translatable via mock.js data file

3. **Contact Form (Full Stack)**
   - Frontend form with validation
   - Backend API: POST /api/contact
   - Saves submissions to MongoDB (contact_submissions collection)
   - Success/error toast notifications
   - Loading state with spinner

4. **WhatsApp Integration**
   - Direct link: wa.me/351934229144
   - Styled button in contact section

5. **Messenger Integration**
   - Direct link: m.me/nextstepportugal
   - Styled button in contact section

6. **Page Sections**
   - Header with navigation and language toggle
   - Hero with slideshow
   - About section with stats
   - Services section (6 service cards)
   - Testimonials section (3 testimonials)
   - Contact section with form
   - Footer

7. **Design & Animations**
   - Scroll-triggered fade animations
   - Mixed light/dark theme
   - Pride-colored accents on logo
   - Mobile responsive

---

## Architecture

### Frontend
- React 18
- TailwindCSS
- Shadcn UI components
- CSS animations (no external animation library)

### Backend
- FastAPI
- MongoDB (motor async driver)
- Pydantic models

### Key Files
- `/frontend/src/data/mock.js` - All page content (EN/PT)
- `/frontend/src/components/landing/` - Page sections
- `/frontend/src/context/LanguageContext.jsx` - Language state
- `/backend/server.py` - API endpoints

### API Endpoints
- `GET /api/` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List submissions (admin)

---

## Backlog

### P1 - High Priority
- **Email Notifications**: When domain is propagated, add Resend integration to send email notifications for contact form submissions to hello@nextstep.com.pt

### P2 - Medium Priority
- **Admin Dashboard**: View and manage contact submissions
- **SEO Optimization**: Meta tags, Open Graph, sitemap

### P3 - Future Enhancements
- **Blog/Resources Section**: Articles about moving to Portugal
- **Team Page**: Individual team member profiles
- **FAQ Section**: Common questions about relocation
- **Google Maps Integration**: Office location

---

## Testing Status
- Backend: 100% (9/9 pytest tests passed)
- Frontend: 100% (all features verified)
- Test report: `/app/test_reports/iteration_1.json`

---

## Credentials & Config
- WhatsApp: 351934229144
- Email: hello@nextstep.com.pt (domain not yet propagated)
- Messenger: nextstepportugal
- Preview URL: https://pride-legal-hub.preview.emergentagent.com
