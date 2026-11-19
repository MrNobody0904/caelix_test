# Caelix — The Operating System for Early-Stage Teams

> **Tagline:** Build Businesses. Empower People. Accelerate Growth.  
> **Brand Mission:** Think Beyond. Grow Beyond.

---

## 🚀 Overview

Caelix is a lightweight, unified operating system designed specifically for early-stage startup teams of 3 to 30 people. It solves operational fragmentation by uniting **Workforce** (core teams, roles, projects, tasks), **Growth Services** (vetted website, SEO, and branding execution), and **Talent Discovery** (evidence-based remote hiring) around **One Connected Record**.

Built with an **Apple Minimal Retail** design aesthetic:
- **Zero gradients, zero shadows, zero glow**: Pure planar depth via tonal backgrounds (`#FFFFFF`, `#F5F5F7`, `#1D1D1F`) and crisp 1px borders (`#E5E7EB`).
- **Signature Palette**: Primary Blue `#0071E3`, Dark `#1D1D1F`, Background `#F5F5F7`.
- **Typography**: SF Pro / Inter font stack with generous line heights and balanced hierarchy.

---

## 🛠 Tech Stack

### Frontend
- **React 18** with **Vite** & **TypeScript**
- **Three.js** + **@react-three/fiber** for lightweight flat 3D constellation & node visualizers
- **GSAP** + **ScrollTrigger** for scrubbed timelines, line drawing, and pin-based feature progression
- **Lenis** smooth scroll engine synchronized with GSAP ticker
- Custom Apple-minimal CSS variable design tokens

### Backend
- **Node.js + Express** in `/server`
- **Zod** schema validation
- **Express-Rate-Limit** & **CORS** configuration
- Local persistent JSON storage (`server/data/plans.json`, `waitlist.json`, `contact.json`)

---

## 📂 Project Structure

```
caelix/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav/                 # Sticky translucent blur nav + scroll border
│   │   │   ├── Hero/                # Hero headline, 3D scene, HTML/CSS dashboard mockup
│   │   │   ├── Problem/             # 4 startup pain points
│   │   │   ├── ConnectedRecord/     # 3 products joined by scroll-driven SVG line & 3D scene
│   │   │   ├── Showcase/            # Pinned dark section cross-fading 4 workforce features
│   │   │   ├── Growth/              # Website, SEO, and Branding packages + milestone tracker
│   │   │   ├── Talent/              # Remote hiring teaser, waitlist form, ethical AI footnote
│   │   │   ├── Trust/               # Transparent AI, humans-in-charge, privacy-first
│   │   │   ├── Pricing/             # Monthly/Annual toggle (20% off), plans from API, compare table
│   │   │   ├── Faq/                 # GSAP animated accordion
│   │   │   ├── Cta/                 # High-impact closing banner
│   │   │   ├── Footer/              # 4 columns, Made in India badge, brand mark
│   │   │   ├── common/              # Logo, ContactModal, TourModal
│   │   │   └── scenes/              # HeroScene (3D constellation) & RecordScene (3D nodes)
│   │   ├── hooks/                   # useLenis, useReveal
│   │   ├── lib/                     # api.ts, scrollStore.ts
│   │   └── styles/                  # tokens.css, globals.css
├── server/
│   ├── data/                        # plans.json, waitlist.json, contact.json
│   ├── routes/                      # plans.js, waitlist.js, contact.js
│   ├── index.js                     # Express server entry
│   └── .env.example
├── package.json                     # Root orchestrator with concurrently
└── README.md
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
# In the root directory:
npm install

# In client:
cd client && npm install

# In server:
cd ../server && npm install
```

### 2. Run Both Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:4000](http://localhost:4000)
  - `GET /api/plans` — Pricing tiers and comparison matrix
  - `POST /api/waitlist` — Role-based talent waitlist (`{ email, role }`)
  - `POST /api/contact` — Inquiries & demo booking (`{ name, email, message, topic }`)
  - `GET /api/health` — Service healthcheck

---

## 🌟 Key Features Built

1. **3D Hero Constellation (`HeroScene`)**:
   - ~24 cards representing people, tasks, and projects joined by thin lines.
   - Idle sine float drift and subtle pointer parallax (capped at 6°).
   - On scroll, nodes converge smoothly behind the HTML/CSS dashboard mockup.
   - Automatic fallback if WebGL is unavailable.
2. **HTML/CSS Interactive Dashboard Mockup**:
   - Zero external images: fully composed in clean Apple-minimal CSS.
   - Floating parallax chips indicating online members and live growth milestone status.
3. **Scroll-Drawn Connected Record (`Section 4`)**:
   - SVG vector path draws dynamically with `ScrollTrigger.scrub`.
   - Synchronized with 3D RecordScene nodes and active state cards.
4. **Pinned Workforce Feature Tour (`Section 5`)**:
   - Fixed mockup on desktop that cross-fades between Org setup, Role access, Skill profiles, and Task tracking.
   - Left-hand vertical progress rail. Stacks naturally on mobile.
5. **Live Pricing Engine (`Section 9`)**:
   - Real-time toggle with 20% annual discount and GSAP numerical roll.
   - Fetches live data from Express `/api/plans`.
   - Expandable feature breakdown table with keyboard accessibility.
6. **Form Submissions with State Feedback**:
   - Early access waitlist with role selector (`founder`, `employer`, `college`).
   - "Talk to us" & "Book a demo" interactive modals with instant feedback.
