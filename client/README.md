# Parasmani Khunte — Engineering Portfolio

High-performance, accessibility-first portfolio and architecture case studies for **Parasmani Khunte** (Backend / Full-Stack Developer). Built with React 19, Vite, Tailwind CSS v4, and automated static pre-rendering.

---

## 🚀 Quickstart & Development

### 1. Prerequisites
- Node.js >= 18.0.0
- npm or pnpm

### 2. Installation
```bash
cd client
npm install
```

### 3. Local Development Server
```bash
npm run dev
```
Runs the Vite development server with HMR at `http://localhost:5173`.

### 4. Production Build & Static Pre-rendering
```bash
npm run build
```
This single command runs:
1. `vite build`: Compiles optimized client assets into `dist/`.
2. `vite build --ssr`: Compiles the server-side entry `src/entry-server.jsx` into `dist-ssr/`.
3. `node prerender.js`: Iterates through all authoritative routes (`/`, `/projects`, `/projects/:slug`, `/experience`, `/education`, `/skills`) and injects real pre-rendered HTML into each route's `index.html`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📂 Architecture & Data Management

All content is cleanly decoupled into modular data files in `src/data/`. **Never hardcode facts in JSX components.**

```
client/src/data/
├── profile.js       # Core contact info, headline, one-liner, resume link
├── projects.js      # All featured case studies and additional projects
├── skills.js        # 3 categorized engineering skill groups
├── experience.js    # Work internships, dates, locations, and achievements
└── education.js     # University degrees and hackathon records
```

### Adding a New Project
Open `src/data/projects.js` and add an object to the `projects` array:
```javascript
{
  slug: "project-slug",
  title: "Project Title",
  oneLiner: "Concise summary of the system.",
  problem: "Specific problem solved (or 'TODO')",
  myRole: "Your individual architectural contributions (or 'TODO')",
  stack: ["Technology 1", "Technology 2"],
  category: "Distributed Systems",
  metrics: [{ label: "Throughput", value: "10k req/s" }],
  hardestProblem: "Hardest technical hurdle and resolution (or 'TODO')",
  architectureImage: null, // path to image in /public or null
  architectureMermaid: "flowchart TD\n ...", // Optional Mermaid diagram
  liveUrl: "https://...",
  repoUrl: "https://github.com/...",
  demoVideoUrl: null,
  featured: true // true = shown on Home & top of /projects with case study
}
```
*Note: Any field set to `"TODO"` or omitted will automatically be hidden from the UI to protect resume integrity.*

### Updating Experience & Skills
- **Experience**: Edit `src/data/experience.js`. Keep titles and dates identical to your resume and LinkedIn.
- **Skills**: Edit `src/data/skills.js`. Keep to the curated list of core tools (no percentages or rating bars).

---

## ⚡ Static Pre-Rendering (SEO & Crawlers)

### Why Build-Time SSR Pre-Rendering?
Modern recruiters, bots (Googlebot, Bingbot, LinkedIn scraper), and users on low-powered mobile devices or with JavaScript disabled need immediate content. 

Rather than adopting complex full-stack SSR frameworks (like Next.js) for what is fundamentally a static site, we chose **Vite native build-time pre-rendering**:
- Zero server runtime required (hosts on any CDN/static provider like Render, Vercel, Cloudflare Pages, or GitHub Pages).
- Generates real, crawlable HTML files for each route (`dist/projects/zuvo/index.html`, etc.).
- Hydrates smoothly on the client with React 19's `hydrateRoot`.
- If JavaScript fails, is blocked, or is turned off, all text, case studies, and links are still fully readable.

---

## 🌐 Deployment (Render Static Site)

This client is configured for **Render Static Site Hosting**:

1. **Build Command**: `cd client && npm install && npm run build`
2. **Publish Directory**: `client/dist`
3. **SPA Deep-Link Redirects**: Handled by `client/public/_redirects`:
   ```
   /*    /index.html   200
   ```
   This ensures that direct deep links (e.g. `/projects/zuvo`) serve the pre-rendered page or fallback to `index.html` without 404 errors.
