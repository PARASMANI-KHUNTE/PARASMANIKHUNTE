# Parasmani Khunte — Engineering Portfolio

High-performance, accessibility-first portfolio and architecture case studies for **Parasmani Khunte** (Backend / Full-Stack Developer). Built with React 19, Vite, Tailwind CSS v4, and automated static pre-rendering.

---

## 🚀 CI / CD & Deployment Guide (Render)

This repository is configured for automatic deployment on **Render Static Site Hosting** and **GitHub Actions**.

### 1. Render Dashboard Configuration Checklist

If Render is **not automatically deploying** on push to `main`, verify the following in **Render Dashboard -> Your Service -> Settings**:

| Setting | Required Value | Notes |
| :--- | :--- | :--- |
| **Branch** | `main` | **Critical:** If previously pointed to a deleted branch (e.g. `full-stack-portfolio` or `prod-old`), update it to `main`. |
| **Auto-Deploy** | `Yes` | Must be toggled on for Render to listen to GitHub push events. |
| **Root Directory** | `client` | The frontend code resides in `./client`. |
| **Build Command** | `npm install && npm run build` | Builds Vite assets + SSR bundle + static HTML prerendering. |
| **Publish Directory** | `dist` | Path relative to Root Directory (`client/dist`). |

---

### 2. Infrastructure as Code (`render.yaml`)

A root `render.yaml` blueprint is included in this repository:
```yaml
services:
  - type: web
    name: parasmani-portfolio
    runtime: static
    branch: main
    rootDir: client
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    autoDeploy: true
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

### 3. GitHub Actions Automated Pipeline (`.github/workflows/ci.yml`)

A CI/CD workflow runs automatically on every Pull Request and Push to `main`:
1. **Lint & Test**: Runs ESLint checks.
2. **Build & Pre-render**: Validates that production build and SSR static pre-rendering succeed without errors.
3. **Optional Render Deploy Hook**:
   - Go to **Render Dashboard** -> Your Static Site -> **Settings** -> **Deploy Hook**.
   - Copy the Deploy Hook URL.
   - Go to **GitHub Repository** -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Add new secret `RENDER_DEPLOY_HOOK_URL` with that URL.
   - Every time code merges to `main`, GitHub Actions will trigger an instant deployment on Render.

---

## 💻 Local Development

```bash
cd client
npm install
npm run dev
```

Build and test locally:
```bash
cd client
npm run lint
npm run build
```
