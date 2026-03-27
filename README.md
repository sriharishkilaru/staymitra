# stayमित्र — comfort comes with us

A modern, production-quality accommodation marketplace built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📁 Project Structure

```
staymitra/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Router / page switcher
│   ├── index.css             # Global styles + animations
│   ├── tokens.js             # Brand color tokens
│   ├── data/
│   │   ├── properties.js     # Mock property listings
│   │   ├── users.js          # Mock users
│   │   ├── bookings.js       # Mock bookings
│   │   └── carousel.js       # Carousel slides data
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Stars.jsx
│   │   │   ├── VerifiedBadge.jsx
│   │   │   └── StatusPill.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Carousel.jsx
│   │   ├── PriceComparison.jsx
│   │   ├── WhyChoose.jsx
│   │   └── ViewCounter.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── PropertyDetailPage.jsx
│       ├── LoginPage.jsx
│       ├── SignupPage.jsx
│       ├── PaymentPage.jsx
│       ├── HostPage.jsx
│       └── AdminDashboard.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🌐 Pages

| Page | Route (state) | Description |
|------|--------------|-------------|
| Home | `home` | Landing page with hero, search, listings |
| Property Detail | `property` | Full property view with booking |
| Login | `login` | User authentication |
| Sign Up | `signup` | New user registration |
| Payment | `payment` | Booking payment flow |
| Host | `host` | Property owner submission |
| Admin | `admin` | Full admin dashboard |

## 🔐 Admin Access

Click **"Admin Panel"** in the footer, or navigate to the login page and click **"Admin Login"**.

## 🎨 Brand Colors

- **Primary Green**: `#3a6647`
- **Beige**: `#faf6ef`
- **Amber**: `#c8975f`
- **Charcoal**: `#1a1a1e`

## 📦 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon library
- **DM Sans** — Body font
- **Playfair Display** — Display/heading font

## 🔧 Build for Production

```bash
npm run build
npm run preview
```
