# nextStep - Product Requirements Document

## Original Problem Statement
Build a modern, minimalist, and sophisticated landing page for "nextStep," a business providing lawyer/mediator/consultancy services for LGBTQIA+ individuals investing in Portugal.

## Business Information
- **Business Name:** nextStep (case-sensitive)
- **Services:** Legal/immigration/consultancy for LGBTQIA+ individuals relocating to Portugal
- **Target Audience:** LGBTQIA+ individuals and families from US, Canada, Brazil, and other countries seeking to move to Portugal

## Core Requirements
- Bilingual support (English & Portuguese) with language toggle
- Testimonials/Client Stories section
- Contact form that saves submissions to database
- WhatsApp integration
- Basic legal pages (Privacy Policy, Terms, Legal Disclaimer)
- SEO-optimized with proper meta tags
- Hero section with cross-fading image slideshow
- Custom logo with ">" symbol (also used as favicon)
- Consistent branding ("nextStep" casing)
- Smooth, modern animations

## Tech Stack
- **Frontend:** React, TailwindCSS, React Router, Shadcn/UI components
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Deployment:** Self-hosted on Hostinger VPS (Ubuntu), Nginx, systemd, Certbot SSL

## Architecture
```
/app
├── backend/
│   ├── server.py (FastAPI app with /api/contact endpoint)
│   ├── requirements.txt
│   └── .env (MONGO_URL, DB_NAME)
├── frontend/
│   ├── src/
│   │   ├── components/landing/ (Hero, About, Services, Testimonials, Contact, Footer)
│   │   ├── pages/ (Privacy, Terms, Legal)
│   │   ├── data/mock.js (centralized content for translations)
│   │   └── context/LanguageContext.js
│   └── .env (REACT_APP_BACKEND_URL)
└── deploy-vps.sh (deployment automation script)
```

## API Endpoints
- `POST /api/contact` - Submit contact form (saves to MongoDB)
- `GET /api/contact` - Retrieve all submissions

## Database Schema
- **contacts collection:** `{ id, name, email, phone?, service?, message, timestamp }`

---

## Completed Features (as of Feb 15, 2026)

### Landing Page Components
- [x] Hero section with 4-image cross-fading slideshow
- [x] About section with company description
- [x] Stats section (300+ families, 20+ years, 99% success, 24/7)
- [x] "Why Portugal for LGBTQIA+ Families?" section with colored checkmarks
- [x] Services section (6 service categories with decorative highlights)
- [x] Testimonials section (3 client stories)
- [x] Contact section with form + WhatsApp link
- [x] Footer with navigation and legal links

### Functionality
- [x] Bilingual toggle (EN/PT)
- [x] Contact form saves to MongoDB
- [x] WhatsApp integration button
- [x] React Router for legal pages
- [x] SEO meta tags and pre-rendering setup

### Design
- [x] Custom nextStep logo with ">" symbol
- [x] Custom favicon.svg
- [x] Pride-themed accent colors (rainbow dots, colored underlines)
- [x] Smooth scroll animations (fade-up, slide-in)
- [x] Responsive design (mobile-first)

### Deployment
- [x] VPS deployment script (deploy-vps.sh)
- [x] Nginx reverse proxy configuration
- [x] systemd service for backend
- [x] SSL via Certbot

### Recent Fixes (Feb 15, 2026)
- [x] Added 6th color (purple #C94FAB) to "Why Portugal" checkmarks
- [x] Reduced whitespace between "Why Portugal" and "Services" sections
- [x] Updated last slideshow image to user's chosen couple photo
- [x] Fixed VPS backend (uvicorn not installed in venv)

---

## Pending/Backlog

### P1 - High Priority
- [ ] Populate legal pages with real content (Privacy, Terms, Legal Disclaimer)
- [ ] Move legal content to mock.js for translation support

### P2 - Future Enhancements
- [ ] Email notifications via Resend for contact form submissions
- [ ] Add more testimonials/case studies
- [ ] Analytics integration

---

## Deployment Notes
After code changes, rebuild and deploy on VPS:
```bash
cd /var/www/nextstep/frontend && npm run build
sudo systemctl restart nextstep-backend
```

## Known Issues
- npm audit shows some vulnerabilities in dev dependencies (low priority)
