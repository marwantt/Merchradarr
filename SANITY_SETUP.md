# 🎨 Sanity Studio Setup for MerchRadar Blog

## ✅ What's Already Done

I've set up the complete Sanity infrastructure for your blog:

- ✅ **Sanity packages installed**
- ✅ **Blog post schema created** (with categories, SEO fields, rich text)
- ✅ **Admin interface configured** at `/admin`
- ✅ **Portable text components** for rich content rendering
- ✅ **TypeScript configuration** ready

## 🚀 Next Steps (5 minutes to complete)

### Step 1: Authenticate with Sanity
```bash
cd /Users/marwan/merch-tee-finder
npx sanity init
```

When prompted:
- Choose **Google** or **GitHub** login
- Create a new project called "MerchRadar Blog"
- Use dataset: **production**
- Choose template: **clean**

### Step 2: Get Your Project Credentials
After authentication, you'll see something like:
```
✔ Project ID: abc123def
✔ Dataset: production
```

### Step 3: Create Environment File
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-here
```

### Step 4: Update sanity.config.ts
Replace `'your-project-id'` with your actual project ID.

## 🎉 Usage After Setup

### Access Admin Interface
- Visit: `http://localhost:3000/admin`
- You'll see a beautiful, WordPress-like editor!

### Creating Blog Posts
1. Click "Blog Post" in the admin
2. Fill in:
   - **Title** (auto-generates slug)
   - **Excerpt** (for SEO and blog listing)
   - **Category** (Policy Guide, Strategy, etc.)
   - **Content** (rich text editor with callouts, code blocks)
   - **Featured Image** (optional)
   - **SEO fields** (meta title/description)

### Content Features Available
- 📝 **Rich text editor** with formatting
- 🎨 **Callouts** (Info, Warning, Tip boxes)
- 💻 **Code blocks** with syntax highlighting
- 🖼️ **Images** with captions
- 🔗 **Links** and formatting
- 📱 **Mobile-responsive** admin

### Blog Post Schema Includes
- **Title & Slug** (SEO-friendly URLs)
- **Excerpt** (meta descriptions)
- **Categories** with color-coded badges
- **Featured Image** support
- **Rich Content** with special blocks
- **SEO metadata** fields
- **Reading time** estimation
- **Featured post** toggle
- **Publish date** scheduling

## 🎨 Matches Your Design

The admin interface will match MerchRadar's aesthetic:
- **Clean, modern design**
- **Professional typography**
- **Dark mode support**
- **Consistent with your branding**

## 🔄 Workflow

1. **Write**: Use the visual editor at `/admin`
2. **Preview**: See changes in real-time
3. **Publish**: Content appears on your blog instantly
4. **SEO**: Automatic sitemap generation

## 📱 Mobile Admin

The Sanity admin works perfectly on mobile, so you can write blog posts from anywhere!

---

**Ready to create your first blog post?** Just complete the 3 setup steps above and visit `/admin`!