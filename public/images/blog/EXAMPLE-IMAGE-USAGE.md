# How to Add Images to Blog Posts

This guide shows you exactly how to add images to your MerchRadar blog posts.

## Quick Start

### 1. Add Your Image File
Place your image in `public/images/blog/` directory:
```
public/images/blog/my-screenshot.png
```

### 2. Reference in Your Blog Post
In your markdown file (`src/content/blog/your-post.md`):

```markdown
![Screenshot Description](/images/blog/my-screenshot.png)
```

## All Available Methods

### Method 1: Basic Markdown (Recommended)
```markdown
![Alt text for SEO and accessibility](/images/blog/example.jpg)
```

**When to use:** Simple images that should be full-width and responsive.

### Method 2: HTML with Custom Width
```markdown
<img src="/images/blog/example.jpg" alt="Description" width="600" />
```

**When to use:** When you need specific sizing control.

### Method 3: HTML with Alignment
```markdown
<img src="/images/blog/example.jpg" alt="Description" style="max-width: 500px; margin: 0 auto; display: block;" />
```

**When to use:** Centered or smaller images.

## Real Example in a Blog Post

Here's a complete example:

```markdown
---
title: "Keyword Research Tutorial"
excerpt: "Learn how to find profitable keywords"
category:
  title: "Tutorial"
publishedAt: "2024-12-29"
readingTime: 10
---

# Keyword Research Tutorial

Start by opening Amazon's search bar:

![Amazon Search Bar](/images/blog/amazon-search-bar.png)

Notice how suggestions appear as you type. Here's a close-up:

<img src="/images/blog/search-suggestions-closeup.png" alt="Search Suggestions" width="500" />

## Analysis Results

After analyzing 100 keywords, we found this pattern:

![Keyword Analysis Chart](/images/blog/keyword-analysis-chart.jpg)

The chart shows that long-tail keywords perform better.
```

## Pro Tips

### Optimize Your Images First
Before adding to your blog:
1. **Resize**: 800-1200px width is ideal
2. **Compress**: Use tools like TinyPNG or ImageOptim
3. **Format**:
   - JPG for photos (smaller file size)
   - PNG for screenshots with text (better clarity)
   - WebP for best compression (modern browsers)

### File Naming Best Practices
✅ Good:
- `keyword-research-tool.png`
- `merch-dashboard-2024.jpg`
- `amazon-search-example.png`

❌ Avoid:
- `Screenshot 2024-12-29 at 3.45.12 PM.png`
- `IMG_1234.jpg`
- `Untitled.png`

### Alt Text Guidelines
Write descriptive alt text that explains the image:

✅ Good:
```markdown
![Amazon Merch dashboard showing sales analytics with upward trending graph](/images/blog/merch-dashboard.png)
```

❌ Too simple:
```markdown
![dashboard](/images/blog/merch-dashboard.png)
```

## Organizing Multiple Images

For posts with many images, create subdirectories:

```
public/images/blog/
├── keyword-research/
│   ├── step-1-amazon-search.png
│   ├── step-2-tool-screenshot.png
│   └── step-3-results.png
├── design-tutorial/
│   ├── photoshop-setup.jpg
│   └── final-design.jpg
└── trend-analysis/
    └── 2024-trends-chart.png
```

Reference with full path:
```markdown
![Step 1](/images/blog/keyword-research/step-1-amazon-search.png)
```

## Testing Your Images

After adding images:
1. Run `npm run dev`
2. Navigate to your blog post: `http://localhost:3000/blog/your-post-slug`
3. Check that images load correctly
4. Verify they look good on mobile (resize browser)

## Common Issues

### Image Not Showing?
- ✅ Check file path starts with `/images/blog/`
- ✅ Verify file exists in `public/images/blog/`
- ✅ Check filename spelling (case-sensitive on Linux servers)
- ✅ Make sure image extension matches (`.jpg` vs `.jpeg`)

### Image Too Large?
- Compress before uploading (target: under 500KB per image)
- Use HTML `width` attribute to resize display

### Image Looks Blurry?
- Use at least 2x the display size for retina screens
- Example: For 600px display width, use 1200px image width

## Your Images Are Now Styled!

The blog CSS automatically applies:
- ✅ Responsive sizing (100% width on mobile)
- ✅ Border matching your monochrome theme
- ✅ Proper spacing (2rem margin)
- ✅ Dark mode support

No additional styling needed!
