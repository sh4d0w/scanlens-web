# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Required Skills

**ALWAYS use the `frontend-designer` skill** for any design, styling, color, or UI changes. Invoke with:
```
/frontend-design <description of what to design or fix>
```

## Project Overview

ScanLens marketing landing page - static HTML/CSS/JS site for an iOS document scanner app. Deployed on Cloudflare Pages at https://scanlens.io.

## Commands

```bash
# Minify CSS after changes
npx clean-css-cli styles.css -o styles.min.css

# Minify JavaScript after changes
npx terser script.js -o script.min.js

# Deploy (auto-deploys on git push to main)
git push origin main
```

**Important**: After CSS/JS changes, always update the cache-buster query parameter in `index.html` (e.g., `styles.min.css?v=4`).

## Architecture

**Static site structure:**
- `index.html` - Main landing page with SEO meta tags, JSON-LD structured data
- `styles.css` / `styles.min.css` - Design system with CSS custom properties
- `script.js` / `script.min.js` - Animations (Intersection Observer, parallax, mobile nav)
- `privacy.html`, `terms.html` - Legal pages
- `auth/callback/index.html` - OAuth callback handler for iOS app

**CSS Design System** (Apple HIG-inspired):
- Brand colors: `--color-primary: #8B5CF6` (purple), `--color-accent: #EC4899` (pink)
- System fonts only (no Google Fonts)
- Custom properties for colors, spacing, shadows, transitions in `:root`

**iOS Integration:**
- `.well-known/apple-app-site-association` - Universal Links config
- App Store ID: `6670480926`
- Team ID: `F8738LNQQ3`

## Key Patterns

1. **Animations**: Use Intersection Observer API for scroll-triggered effects
2. **Responsive**: Mobile-first with clamp() for fluid typography
3. **No frameworks**: Pure vanilla HTML/CSS/JS
4. **Cloudflare**: `_headers` and `_redirects` for edge configuration
