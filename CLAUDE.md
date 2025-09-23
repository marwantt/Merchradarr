# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MerchRadar** is a Next.js web application that helps Amazon Merch by Amazon sellers find profitable niches for t-shirts, hoodies, and sweatshirts. The app is deployed at https://merchradarr.vercel.app.

## Technology Stack

- **Framework**: Next.js 15.4.6+ with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4+ (latest PostCSS plugin architecture)
- **Build**: Turbopack (dev mode), Static export for production
- **Deployment**: Vercel with static generation

## Development Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build + sitemap generation
npm run start        # Production server
npm run lint         # ESLint checking
```

## Architecture

### Directory Structure
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── page.tsx           # Main search interface
│   ├── layout.tsx         # Root layout with analytics
│   └── [various pages]/   # Static marketing pages
└── components/
    └── DarkModeLogo.tsx   # Custom components
```

### Key Files
- `src/app/page.tsx` - Core application logic for Amazon search tool
- `src/app/layout.tsx` - Root layout with Google Fonts and Vercel Analytics
- `next.config.ts` - Static export configuration
- `next-sitemap.config.js` - SEO sitemap generation

## Technical Details

### Build Configuration
- **Static Export**: Configured for `output: 'export'` (Vercel deployment)
- **Image Optimization**: Disabled (`unoptimized: true`) for static compatibility
- **Trailing Slash**: Enabled for consistent URLs
- **PostBuild**: Automatic sitemap generation via `next-sitemap`

### Key Features
- Multi-region Amazon marketplace support (US, UK, DE, FR)
- Real-time search URL generation
- Client-side filtering and sorting
- Responsive design with dark mode support
- SEO optimized with meta tags and sitemap

### Development Notes
- Uses `'use client'` directive for interactive components
- Tailwind CSS with custom CSS variables for theming
- TypeScript with path aliases configured
- ESLint with Next.js and TypeScript rules
- Google Fonts optimization with Geist, Fira Code, and Passero One

## Git Repository
Connected to: https://github.com/marwantt/Merchradarr.git