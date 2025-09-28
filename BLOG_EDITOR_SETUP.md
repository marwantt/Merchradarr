# 🎨 MerchRadar Blog Editor - Complete Setup Guide

## ✅ What's Ready

Your Sanity Studio blog editor is **95% complete**! Here's what I've set up:

- ✅ **Sanity packages installed**
- ✅ **Project connected** (ID: 3p8pla5a, Dataset: merchradar)
- ✅ **Blog schema configured** (categories, SEO, rich text)
- ✅ **Environment variables ready**
- ✅ **TypeScript components ready**
- ✅ **Production build working**

## 🚀 Two Options to Get Your Blog Editor

### **Option 1: Development Blog Editor (Recommended)**

**Perfect for writing blog posts - Use this approach:**

1. **Start development server:**
```bash
cd /Users/marwan/merch-tee-finder
npm run dev
```

2. **Create admin directory:**
```bash
mkdir -p src/app/admin/[[...tool]]
```

3. **Create admin page:**
```bash
cat > src/app/admin/[[...tool]]/page.tsx << 'EOF'
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function AdminPage() {
  return <NextStudio config={config} />
}
EOF
```

4. **Visit your blog editor:**
```
http://localhost:3000/admin
```

**Result:** Beautiful WordPress-like interface for writing blog posts!

---

### **Option 2: Standalone Sanity Studio**

**Alternative approach - separate admin interface:**

1. **Run your existing Sanity project:**
```bash
cd /Users/marwan/merch-radar
npm run dev
```

2. **Visit studio:**
```
http://localhost:3333
```

---

## 🎯 **I Recommend Option 1**

Option 1 gives you the blog editor **integrated directly into your MerchRadar site** at `/admin`. This feels more natural and keeps everything in one place.

**Important:** The admin route only works in development mode (`npm run dev`). For production builds, it's automatically excluded to keep your static export working perfectly.

## 🖊️ **Using Your Blog Editor**

Once you access `/admin`, you'll have:

- **Rich text editor** (like WordPress)
- **Category selection** (Policy Guide, Strategy, Tips, etc.)
- **SEO fields** (meta title, description, slug)
- **Featured image uploads**
- **Content blocks** (callouts, code blocks, images)
- **Publishing controls** (featured posts, reading time)

## 📝 **Workflow**

1. **Write**: Use the visual editor at `/admin`
2. **Preview**: See changes in your development site
3. **Build**: Run `npm run build` (admin excluded automatically)
4. **Deploy**: Your static site deploys normally to Vercel

---

## 🤔 **What Would You Like to Do?**

- **"Set up Option 1"** - Get the integrated `/admin` working now
- **"Use Option 2"** - Use the standalone studio
- **"Show me the editor"** - I'll walk you through creating your first post
- **"Test it later"** - Just commit what we have for now

**Which approach sounds good?**