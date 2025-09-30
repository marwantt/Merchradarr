# Blog Images Directory

Store all blog post images in this directory.

## Usage in Blog Posts

### Basic Markdown Image Syntax
```markdown
![Alt text description](/images/blog/your-image.jpg)
```

### HTML Image with Custom Sizing
```markdown
<img src="/images/blog/your-image.jpg" alt="Description" width="800" />
```

### Example in Blog Post
```markdown
---
title: "My Blog Post"
excerpt: "Description"
---

# My Blog Post

Here's a screenshot of the Amazon Merch dashboard:

![Amazon Merch Dashboard](/images/blog/merch-dashboard.png)

You can also use HTML for more control:

<img src="/images/blog/keyword-tool.png" alt="Keyword Research Tool" width="600" />
```

## Image Best Practices

- **File naming**: lowercase-with-hyphens.jpg
- **Optimize size**: Keep under 500KB
- **Dimensions**: 800-1200px width recommended
- **Formats**: JPG (photos), PNG (screenshots/graphics)
- **Alt text**: Always include descriptive alt text for SEO and accessibility

## Organized Structure (Optional)

You can create subdirectories for better organization:

```
public/images/blog/
├── keyword-research/
│   ├── tool-screenshot.png
│   └── example-results.jpg
├── merch-trends/
│   └── trend-chart.png
└── design-tips/
    └── example-design.jpg
```

Then reference: `/images/blog/keyword-research/tool-screenshot.png`
