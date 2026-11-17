# 📄 Client Application — Current State Documentation

> **Portfolio**: Parasmani Khunte — Full-Stack Developer Portfolio  
> **Branch**: `full-stack-portfolio`  
> **Generated**: October 31, 2026  
> **Stack**: React 19 · Vite 6 · Tailwind CSS 4 · Framer Motion · Lucide React · React Router 7

---

## 📁 Project Structure

```
client/
├── public/
│   ├── profilepic.jpg                  # Profile photo (Home hero)
│   ├── logo.jpg                        # Site logo
│   ├── Parasmani_Khunte_Resume.pdf     # Downloadable resume
│   ├── IntershipCertificate.pdf        # Akkuraa IT internship certificate
│   ├── isocertificate.jpg              # ISRO Hackathon certificate
│   ├── aithon.jpg                      # AITHON Hackathon certificate
│   ├── bluestock.jpg                   # Bluestock Fintech certificate
│   ├── akkuraItLogo.png                # Akkuraa IT company logo
│   └── vite.svg                        # Vite default asset
│
├── src/
│   ├── main.jsx                        # App entry point (React 19 createRoot)
│   ├── App.jsx                         # Root component with routing
│   ├── App.css                         # Global styles (minimal)
│   ├── index.css                       # Tailwind base/utility imports
│   │
│   ├── pages/
│   │   ├── Home.jsx                    # Landing page (~1189 lines)
│   │   ├── Projects.jsx                # Projects gallery (~519 lines)
│   │   ├── Skills.jsx                  # Technical skills matrix (~545 lines)
│   │   ├── Education.jsx               # Education & certifications (~241 lines)
│   │   ├── Experience.jsx              # Work experience timeline (~288 lines)
│   │   └── Admin.jsx                   # Admin panel (placeholder, ~113 lines)
│   │
│   ├── components/
│   │   ├── Navbar.jsx                  # Floating pill navbar with magnetic links
│   │   ├── Footer.jsx                  # Footer with social links & system status
│   │   ├── ProjectCard.jsx             # 3D tilt project card
│   │   ├── ProjectPreviewModal.jsx     # Iframe-based live project preview modal
│   │   ├── EducationCard.jsx           # Education/certification card
│   │   ├── ExperienceCard.jsx          # Experience card + grouped card
│   │   ├── SectionTitle.jsx            # Reusable section title (unused currently)
│   │   ├── ThemeToggle.jsx             # Standalone theme toggle (unused currently)
│   │   └── common/
│   │       ├── BackgroundParticles.jsx # Floating amber particle animation
│   │       ├── Layout.jsx              # Page transition wrapper + custom cursor + scroll progress
│   │       └── ScrollToTop.jsx         # Scroll-to-top FAB with progress ring
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx            # Dark/light mode (persisted to localStorage)
│   │   └── ToastContext.jsx            # Toast notification system
│   │
│   └── utils/
│       └── SoundManager.js            # Web Audio API UI sound effects
│
├── .env / .env.development / .env.production
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🧩 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | DOM renderer |
| `react-router-dom` | ^7.3.0 | Client-side routing |
| `framer-motion` | ^12.4.10 | Animations & transitions |
| `lucide-react` | ^0.479.0 | Icon library |
| `tailwindcss` | ^4.0.12 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0.12 | Tailwind Vite plugin |
| `axios` | ^1.8.2 | HTTP client (installed but not actively used in pages) |
| `@reduxjs/toolkit` | ^2.6.1 | State management (installed but not actively used) |
| `react-redux` | ^9.2.0 | React-Redux bindings (installed but not actively used) |
| `react-intersection-observer` | ^9.16.0 | Viewport detection |
| `react-toastify` | ^11.0.5 | Toast library (installed but custom ToastContext used instead) |
| `vite` | ^6.2.0 | Build tool |

---

## 🗺️ Routing Map

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing / hero page |
| `/projects` | `Projects` | Project gallery with filters |
| `/skills` | `Skills` | Technical skills matrix |
| `/education` | `Education` | Academic & certification records |
| `/experience` | `Experience` | Work experience timeline |
| `/admin` | `Admin` | Admin panel (hardcoded login, placeholder) |

**Note**: The `/admin` route is **not** linked from the Navbar — it's a hidden route.

---

## 📃 Page-by-Page Breakdown

### 1. 🏠 Home Page (`/`)

**File**: `src/pages/Home.jsx` — **~1189 lines**

The largest and most feature-rich page. Serves as the main landing page with multiple scrollable sections.

#### Sections (top to bottom):

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero Section** | Profile photo (clickable for fullscreen preview), name "Hi, I'm Paras", role tagline with typewriter effect, "Hire Me" button (opens name-prompt modal → mailto), "Download CV" button, "Preview CV" button (opens PDF in iframe modal) |
| 2 | **Engineer's Manifesto** | Expandable about section describing technical philosophy, skills summary, and current education. Has "Read Full Manifesto" toggle |
| 3 | **Career & Education Summary** | 2-column grid: Current Education (MCA at GGU) and Engineering Focus (Backend & Distributed Systems) |
| 4 | **Tech Stack CTA** | Call-to-action banner linking to `/skills` with "View Full Skills Matrix" button |
| 5 | **Stats Counters** | Animated counters: Projects count (dynamic from projects array), 4 Industry Internships, 8+ Microservices & Tools, 2 Hackathons |
| 6 | **Featured Project (Zuvo)** | Highlighted card for Zuvo microservices platform with tech badges and GitHub link |
| 7 | **What I Offer** | 4-card service grid: Web Development, Mobile Apps, LLM & RAG Systems, Backend & APIs |
| 8 | **Recent Milestones** | Timeline of 7 achievements (2024–2026) with expand/collapse. Items: AITHON Hackathon, Whiteboard.io, Zuvo, Gravitor, MyCircle, Bharatiya Antariksh Hackathon, IoT Executive |
| 9 | **Get In Touch** | Contact section with email (copy), phone (copy), location cards, and "Send Me an Email" button |
| 10 | **Social Links** | GitHub, LinkedIn, Instagram, Email icons |

#### Interactive Features:
- **Magnetic buttons** (Hire Me, Download CV) — follow cursor with spring physics
- **Animated counter** — counts up when scrolled into view
- **Typewriter text** — word-by-word reveal animation
- **Profile image preview modal** — fullscreen image viewer
- **CV preview modal** — iframe-based PDF viewer
- **Project preview modal** — lazy-loaded iframe viewer
- **Name prompt modal** — collects visitor name before composing mailto
- **Background particles** — floating amber dots
- **Scroll-to-top button** — appears after 400px scroll
- **Sound effects** — plays init sound on page load

#### Data (hardcoded):
- Profile info (name, role, bio, email, phone, location)
- 7 milestone achievements
- 4 service offerings
- Stats counters

---

### 2. 💼 Projects Page (`/projects`)

**File**: `src/pages/Projects.jsx` — **~519 lines**

#### Features:
- **Search bar** — filter by title, description, or tech stack
- **Category filter pills** — All, Full Stack, Backend, AI & Machine Learning, Mobile Apps, UI/UX & Portfolio
- **Live Demos toggle** — filter to only projects with live URLs
- **Paginated grid** — 6 projects per page with pagination controls
- **Project cards** — 3D tilt effect, tech tags, GitHub/live links, preview modal trigger
- **Empty state** — shown when no projects match filters

#### Projects Data (18 projects, exported as `projects` array):

| # | Project | Tech | Live Demo | Categories |
|---|---------|------|-----------|------------|
| 1 | Zuvo - Distributed Microservices Platform | Node.js, TypeScript, Redis Streams, MongoDB, OpenTelemetry, Docker | ❌ | Backend, Full Stack |
| 2 | MyCircle - Hyperlocal Exchange Platform | React 19, React Native, Node.js, MongoDB, Socket.io, Redis, BullMQ, Groq AI | ✅ | Mobile Apps, Full Stack |
| 3 | Gravitor - Privacy-First Local AI Coding IDE | VS Code Extension API, TypeScript, Node.js, Ollama, Vector Search | ❌ | AI & Machine Learning |
| 4 | SYNAPSE - Local Multimodal AI Assistant | Python, Ollama, FAISS, RAG, LLaVA, Whisper, Qwen-TTS | ❌ | AI & Machine Learning |
| 5 | Whiteboard.io - Collaborative Whiteboard with AI | React, Node.js, Express, Socket.io, HTML5 Canvas, Gen AI, Tailwind CSS | ✅ | Full Stack, AI & ML |
| 6 | NearMe - Location-Based Social Networking | TypeScript, Node.js, React Native, MongoDB, Redis, Geospatial | ❌ | Mobile Apps, Full Stack |
| 7 | Vaani - Real-Time Messaging Platform | React, Node.js, Express, Socket.io, MongoDB, Cloudinary | ✅ | Full Stack |
| 8 | CampusCompare | React, Node.js, PostgreSQL, Prisma, Cloudinary | ✅ | Full Stack |
| 9 | Modern Developer Portfolio | React 19, Tailwind CSS, Framer Motion, Lucide React, Vite | ✅ | UI/UX & Portfolio |
| 10 | Admin Dashboard | React, Node.js, Express, MongoDB, JWT, Tailwind CSS | ❌ | Full Stack |
| 11 | Warehouse Management System | React, Vite, Node.js, MongoDB, Recharts, Tailwind CSS | ❌ | Full Stack |
| 12 | OrgSync | JavaScript, Node.js, Express, React, MongoDB | ❌ | Full Stack |
| 13 | CafeAutomation | React, Node.js, Express, MongoDB | ❌ | Full Stack |
| 14 | Chat Application | React, Node.js, Socket.io, Google OAuth | ❌ | Full Stack |
| 15 | FaceTrack | React, Redux, Machine Learning, TailwindCSS, Express, MongoDB | ❌ | AI & Machine Learning |
| 16 | FRAS | Python, OpenCV, Deep Learning, Flask | ❌ | AI & Machine Learning |
| 17 | HRMS | React, Node.js, Express, MongoDB | ❌ | Full Stack |
| 18 | Resume Builder | React, JavaScript, CSS | ❌ | Full Stack |

---

### 3. ⚡ Skills Page (`/skills`)

**File**: `src/pages/Skills.jsx` — **~545 lines**

#### Features:
- **Search bar** — filter technologies by name
- **Category filter pills** — All, Languages, Backend, Frontend & Mobile, Databases & Queues, AI / LLM, DevOps & Tools
- **Spotlight cards** — radial gradient glow follows mouse cursor
- **Skill pills** — each shows name, highlight sparkle icon, and "PROD" badge for production-level skills
- **Primary Production Stack banner** — 6-pillar overview (MERN, Real-Time, Local AI, Microservices, Observability, Containerization)

#### Skill Domains (6 categories, 47 total skills):

| Domain | Skills Count | Highlighted Skills |
|--------|-------------|-------------------|
| **Programming Languages** | 6 | JavaScript, TypeScript, Python, SQL |
| **Backend Engineering** | 8 | Node.js, Express.js, REST APIs, WebSockets/Socket.io, JWT, Google OAuth, Microservices |
| **Frontend & Mobile** | 6 | React, Next.js, React Native, Tailwind CSS, Redux, Vite |
| **Databases & Queues** | 6 | MongoDB, PostgreSQL, Redis, Redis Streams, BullMQ |
| **AI / LLM Engineering** | 10 | RAG Pipelines, Vector Search, Qdrant, FAISS, Ollama, Groq API, Prompt Engineering |
| **DevOps & Tools** | 11 | Docker, GitHub Actions, AWS EC2/S3, OpenTelemetry, Vercel, Render, Cloudinary, Git, Postman, Linux |

---

### 4. 🎓 Education Page (`/education`)

**File**: `src/pages/Education.jsx` — **~241 lines**

#### Features:
- **Two sections**: Academic Education (2 entries) and Professional Certifications (4 entries)
- **Education cards** — degree, institution, year, location, GPA, description, key courses, achievements
- **Certificate preview** — modal with image/PDF viewer for entries that have certificate files
- **Continuous Learning** — philosophy statement at the bottom

#### Education Data:

**Academic:**
| Degree | Institution | Year | GPA |
|--------|-------------|------|-----|
| MCA, Computer Science & Technology | Guru Ghasidas Vishwavidyalaya | 2025–2027 | In Progress |
| BCA, Computer Science | Guru Ghasidas Vishwavidyalaya | 2022–2025 | 8.20/10.0 |

**Certifications:**
| Certification | Issuer | Year | Certificate |
|---------------|--------|------|-------------|
| Bharatiya Antariksh Hackathon 2025 | ISRO | 2025 | ✅ (isocertificate.jpg) |
| AITHON Hackathon Finalist | AITHON 2026 | 2026 | ✅ (aithon.jpg) |
| Python | Great Learning | 2023 | ❌ |
| Cyber Security | NIT Kanpur | 2023 | ❌ |

---

### 5. 💼 Experience Page (`/experience`)

**File**: `src/pages/Experience.jsx` — **~288 lines**

#### Features:
- **Alternating timeline layout** — cards alternate left/right on desktop
- **Timeline connector** — animated vertical line with dots
- **Experience cards** — role, company, duration, location, bullet-point highlights, skill tags with logos (from CDN)
- **Grouped card** — groups multiple roles at the same company (e.g., Akkuraa IT)
- **Certificate viewer** — modal preview for internship certificates
- **Skill logos** — auto-resolved from devicon CDN based on skill name

#### Experience Data (4 internships):

| # | Role | Company | Duration | Location | Certificate |
|---|------|---------|----------|----------|-------------|
| 1 | Technical Intern | Hybrowlabs Technologies | Mar 2025 – May 2025 | Remote | ❌ |
| 2 | Web Developer Intern | Akkuraa IT Services | Jan 2025 – Apr 2025 | Remote | ✅ (PDF) |
| 3 | SDE Intern | Bluestock Fintech | Nov 2024 – Dec 2024 | Remote | ✅ (JPG) |
| 4 | Full Stack Intern | Elite Tech | Oct 2024 – Nov 2024 | Remote | ❌ |

---

### 6. 🔐 Admin Page (`/admin`)

**File**: `src/pages/Admin.jsx` — **~113 lines**

#### Current State:
- **Placeholder** login page with hardcoded credentials (`admin` / `password`)
- After login, shows a simple "Welcome back!" message
- **No actual admin functionality** (no CRUD, no dashboard, no analytics)
- **Not linked** from the Navbar — hidden route at `/admin`

---

## 🧱 Shared Components

### Navbar (`Navbar.jsx`)
- **Floating pill design** — fixed at top, centered, backdrop blur, rounded-full
- **Magnetic links** — nav links follow cursor with spring physics on hover
- **Desktop nav links**: Home, Projects, Skills, Education, Experience
- **Active route indicator** — animated pill underline (layoutId animation)
- **Controls**: Audio mute/unmute toggle, Dark/Light mode toggle
- **Mobile menu** — hamburger → slide-down overlay with links
- **Logo**: "P." with amber accent dot

### Footer (`Footer.jsx`)
- **3-column grid**: Branding & Status, Quick Navigation, Connect Ecosystem
- **System status badge** — "SYSTEM STATUS: STABLE // BUILD: 2026.04" with green pulse
- **Social links**: GitHub, LinkedIn, Instagram, Twitter (Twitter href is "#")
- **Email copy** — click to copy `parasmanikhunte@gmail.com` with toast notification
- **Bottom line**: Location (Chhattisgarh, India // GMT +5:30), version (v2.0-STABLE)

### Layout (`common/Layout.jsx`)
- **Wraps all pages** — provides page transition animations (fade + slide)
- **Custom Cursor** — ghost-shaped SVG cursor that follows mouse, blinks, and reacts to clicks with:
  - Mood 1: Rotation spin
  - Mood 2: Pulse expand (squash/stretch)
  - Mood 3: Heart eyes (love mode)
  - Click particles burst on click
  - Sound effects on click (except on Navbar)
- **Scroll Progress Bar** — amber line at top of viewport showing scroll position
- **ScrollToTop** — included via Layout

### ScrollToTop (`common/ScrollToTop.jsx`)
- **FAB button** — fixed bottom-right, appears after 300px scroll
- **Progress ring** — SVG circle showing scroll percentage
- **Magnetic effect** — button follows cursor slightly on hover
- **Desktop only** — hidden on mobile (`hidden md:block`)

### BackgroundParticles (`common/BackgroundParticles.jsx`)
- **Floating dots** — `count` amber-colored 1×1px circles with random positions
- **Continuous drift** — slow vertical movement, opacity pulsing
- Used across all pages for ambient visual texture

### ProjectCard (`ProjectCard.jsx`)
- **3D tilt** — rotates based on mouse position using motion values
- **Tech tags** — split from comma-separated string, displayed as pills
- **Buttons**: Preview (opens modal), GitHub link, Live site link
- **"Latest" badge** — green pulsing dot for `isLatest: true` projects
- **Bottom accent bar** — amber bar animates on hover
- **Gloss reflection** — gradient overlay on hover

### ProjectPreviewModal (`ProjectPreviewModal.jsx`)
- **Fullscreen modal** — dark overlay with backdrop blur
- **Iframe embed** — loads live project URL
- **Fallback** — "Preview not available" state with GitHub link
- **Header** — project title, external link button, GitHub button, close button

### EducationCard (`EducationCard.jsx`)
- **Left accent border** — amber vertical bar
- **Icon** — GraduationCap for degrees, Award for certifications
- **Meta** — year, location, GPA
- **Key courses** — pills list
- **Achievements** — bullet list
- **Certificate button** — opens preview modal if `certificateUrl` exists

### ExperienceCard (`ExperienceCard.jsx`)
- **Left accent border** — amber (or green for current role)
- **Skill logos** — auto-resolved from devicon/vectorlogo CDN
- **Highlights** — bullet-point list with amber dots
- **Certificate button** — opens preview modal
- **ExperienceGroupCard** (exported separately) — groups multiple roles at same company with mini-timeline

---

## 🎨 Design System

### Theme
- **Color Palette**: Amber (primary accent), Gray (neutrals)
- **Dark Mode**: `bg-gray-900`, `text-white`, amber-400/500 accents
- **Light Mode**: `bg-amber-50` / `bg-white`, `text-gray-800`, amber-500/600 accents
- **Persisted** in `localStorage` as `"theme"` → `"dark"` or `"light"`

### Animations
- **Page transitions** — fade + slide Y via Framer Motion `AnimatePresence`
- **Scroll-triggered** — `whileInView` animations with staggered children
- **Hover effects** — scale, translateY, glow, border color changes
- **Spring physics** — used for magnetic buttons, cursor, and scroll-to-top

### Typography
- **Font**: `font-inter` (set in App wrapper)
- **Headings**: Bold, 4xl-6xl for page titles
- **Body**: base/lg size, relaxed line height

### Sounds
- **SoundManager** — Web Audio API based
- **Init sound** — low swell + high chime (plays on Home load and route changes)
- **Click sounds** — glassy tink variations
- **Mood sounds** — rotation, pulse, glisten
- **Mute toggle** — persisted in component state (not localStorage)

---

## ⚠️ Notable Observations

### Installed but Unused Dependencies
- `@reduxjs/toolkit` + `react-redux` — Redux is installed but no store/slices exist
- `axios` — installed but no API calls are made (all data is hardcoded)
- `react-toastify` — installed but a custom `ToastContext` is used instead

### Unused Components
- `SectionTitle.jsx` — generic section title component, not imported anywhere
- `ThemeToggle.jsx` — standalone theme toggle, superseded by the one built into `Navbar`

### Hardcoded Data
- **All page data** (projects, skills, education, experience, milestones) is hardcoded in JSX files
- No API calls, no database connection from the client
- The `server/` directory exists but client does not interact with it

### Admin Page
- Login uses hardcoded `admin` / `password` (no real authentication)
- No admin functionality after login — just a welcome message
- Route exists but is hidden from navigation

### Social Links
- Twitter link points to `"#"` (placeholder)

---

## 📊 File Size Summary

| File | Lines |
|------|-------|
| Home.jsx | ~1,189 |
| Skills.jsx | ~545 |
| Projects.jsx | ~519 |
| ExperienceCard.jsx | ~394 |
| Experience.jsx | ~288 |
| Education.jsx | ~241 |
| ProjectCard.jsx | ~187 |
| Navbar.jsx | ~187 |
| Layout.jsx | ~186 |
| Footer.jsx | ~147 |
| EducationCard.jsx | ~146 |
| ProjectPreviewModal.jsx | ~133 |
| Admin.jsx | ~113 |
| SoundManager.js | ~105 |
| ScrollToTop.jsx | ~91 |
| ToastContext.jsx | ~67 |
| App.jsx | ~40 |
| ThemeContext.jsx | ~33 |
| SectionTitle.jsx | ~33 |
| BackgroundParticles.jsx | ~31 |
| ThemeToggle.jsx | ~28 |
| main.jsx | ~10 |
| **Total** | **~4,722 lines** |
