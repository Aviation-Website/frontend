# Netlify Deployment Guide

## Setup Steps for Your Next.js App on Netlify

### Prerequisites
- GitHub account and repository connected to Netlify
- Node.js and npm installed locally

### Configuration Files Added
- `netlify.toml` - Netlify build configuration with Next.js plugin
- `public/_redirects` - SPA fallback for client-side routing

### Manual Netlify Dashboard Configuration

1. **Go to Site Settings → Build & Deploy → Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20.x or higher

2. **Environment Variables** (if needed)
   - Add any required environment variables in Site Settings → Build & Deploy → Environment

3. **Trigger a Deploy**
   - Push changes to your main branch
   - Netlify will automatically build and deploy
   - Monitor the deploy logs in the Netlify dashboard

### Build Output
The build creates:
- Static pages in `.next` directory
- All routes are pre-rendered:
  - `/home` - Landing page
  - `/about` - About page
  - `/contact-us` - Contact page
  - `/faq` - FAQ page
  - `/login`, `/register`, `/verification` - Auth pages
  - `/privacy`, `/terms` - Legal pages

### Root Path Redirect
- `/` automatically redirects to `/home` (configured in next.config.ts)

### Troubleshooting
- Clear Netlify cache and trigger a rebuild
- Check deploy logs for build errors
- Ensure all dependencies are in package.json
- Verify Next.js version is compatible (v16.0.3)

### Performance Tips
✅ All pages are statically generated
✅ Code is fully linted and optimized
✅ No unused imports or variables
✅ All images use Next.js Image component
✅ Ready for production deployment
