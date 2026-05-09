# Ekvira Lights — DJ Lights on Rent

A modern, mobile-first website for Ekvira Lights — a DJ lighting rental business providing Sharpy, Blinder, Bottom, and Laser lights for weddings, parties, and events.

## 🔗 Live Site

[Coming soon on Vercel]

## ⚡ Features

- **Dark Neon Theme** — High-energy DJ-inspired design with glowing effects and animations
- **Mobile-First** — Optimized for mobile users
- **Bilingual** — English & Marathi (next-intl)
- **Scroll Animations** — Framer Motion powered reveal effects
- **Preloader** — Smooth loading experience on first visit
- **Contact Form** — Saves inquiries directly to database
- **WhatsApp Integration** — One-tap booking via WhatsApp (Marathi message)
- **Dynamic Gallery** — Admin-managed photo gallery from database
- **Admin Panel** — Secure dashboard to manage everything

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Database + Auth |
| next-intl | i18n (English/Marathi) |
| Vercel | Deployment |

## 📁 Structure

```
src/
├── app/[locale]/          # Pages (home, admin)
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, Gallery, Contact
│   └── ui/                # Preloader, ScrollAnimations
├── lib/                   # Supabase client
├── types/                 # TypeScript types
├── styles/                # Global CSS (neon theme)
└── messages/              # en.json, mr.json translations
```

## 🚀 Getting Started

```bash
# Install
npm install

# Add environment variables
cp .env.example .env.local
# Fill in your Supabase credentials

# Run database schema
# Paste docs/database/schema.sql in Supabase SQL Editor
# Paste docs/database/rls-policies.sql in Supabase SQL Editor

# Start dev server
npm run dev
```

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_BUSINESS_NAME=Ekvira Lights
NEXT_PUBLIC_BUSINESS_PHONE=+91 77218 73991
NEXT_PUBLIC_BUSINESS_EMAIL=info@ekviralights.com
NEXT_PUBLIC_BUSINESS_ADDRESS=Shemba, Tq. Nandura, Dist. Buldhana, Maharashtra
```

## 👨‍💼 Admin Panel

- URL: `/en/admin`
- Features:
  - View & manage customer inquiries
  - Update inquiry status (New → In Progress → Completed)
  - Reply via WhatsApp directly
  - Add/delete gallery photos
  - Update business info (phone, email, address, social links)

## 🗄 Database (Supabase)

Uses custom `ekvira` schema with tables:
- `business_info` — Phone, email, address, social links
- `services` — Sharpy, Blinder, Bottom, Laser
- `gallery` — Event photos with categories
- `inquiries` — Customer booking requests
- `users` — Admin authentication

## 📱 Services Offered

| Light | Description |
|-------|-------------|
| Sharpy | Powerful beam lights with sharp focused beams |
| Blinder | High-intensity flash/audience blinder lights |
| Bottom | LED uplighting and floor wash |
| Laser | Multi-color laser effects with patterns |

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables
4. Deploy

---

Built for Ekvira Lights, Shemba, Maharashtra
