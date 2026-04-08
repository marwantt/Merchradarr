import fs from "fs";
import path from "path";
import https from "https";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const IMAGE_DIR = path.join(process.cwd(), "public", "blog");
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

const posts = [
  // ── STRATEGY ────────────────────────────────────────────────────────
  {
    slug: "how-to-find-profitable-merch-niches-2026",
    category: "Strategy",
    publishedAt: "2026-03-01",
    readingTime: 9,
    imagePrompt:
      "Minimalist flat lay of a notebook with hand-drawn niche map, magnifying glass, Amazon search results on a laptop, warm neutral tones, professional workspace photography",
    contentPrompt: `Write a comprehensive, expert-level blog post titled "How to Find Profitable Merch Niches in 2026".
This is for Amazon Merch by Amazon (Print on Demand) sellers.
Cover: what makes a niche profitable (demand vs competition), how to use Amazon search to validate ideas, BSR interpretation, using Google Trends, cross-niche strategy, seasonal vs evergreen niches, 5 proven profitable niche examples for 2026.
Format with H2/H3 headers, bullet points, bold key terms. Be specific and actionable. ~900 words. No fluff.`,
  },
  {
    slug: "scaling-amazon-merch-tier-10-to-tier-4000",
    category: "Strategy",
    publishedAt: "2026-03-08",
    readingTime: 10,
    imagePrompt:
      "Upward trending graph made of folded t-shirts stacked in ascending order, clean white background, business growth concept, flat lay product photography",
    contentPrompt: `Write a detailed blog post titled "Scaling Your Amazon Merch Business: From Tier 10 to Tier 4000".
Explain the Amazon Merch tier system (Tier 10, 25, 100, 500, 1000, 2000, 4000+), how to get tier bumps (sales velocity, quality designs, low rejection rate), what to focus on at each tier, common mistakes that stall growth, and a 90-day action plan for new sellers.
Format with clear H2/H3 headers, numbered lists where appropriate. ~900 words. Practical and no-nonsense.`,
  },
  {
    slug: "seasonal-merch-upload-calendar-strategy",
    category: "Strategy",
    publishedAt: "2026-03-15",
    readingTime: 7,
    imagePrompt:
      "Wall calendar with highlighted seasonal events — Valentine's Day, Halloween, Christmas — surrounded by colorful t-shirt mockups, bright studio photography, flat lay style",
    contentPrompt: `Write a blog post titled "Seasonal Merch Strategy: Planning Your Upload Calendar for Maximum Sales".
Cover: why timing is critical for Merch sellers, Amazon indexing lag (why you need to upload 6-8 weeks early), a month-by-month upload calendar for 2026, top seasonal events to target (Valentine's, St. Patrick's, Easter, 4th of July, Halloween, Thanksgiving, Christmas), evergreen designs to fill slow months, and how to repurpose seasonal designs.
Format with H2/H3, a clear calendar table, and tips. ~800 words.`,
  },

  // ── TUTORIAL ────────────────────────────────────────────────────────
  {
    slug: "how-to-read-amazon-bsr-for-merch",
    category: "Tutorial",
    publishedAt: "2026-03-05",
    readingTime: 8,
    imagePrompt:
      "Close-up of Amazon product page on laptop showing Best Sellers Rank number, highlighted with a marker, clean desk setup, tutorial style photography",
    contentPrompt: `Write a practical tutorial titled "How to Use Amazon BSR to Validate Your Merch Niche".
Explain what BSR (Best Sellers Rank) is, how to find it on a product page, what BSR numbers mean for sales volume (include a BSR-to-sales-per-month reference table for the Clothing category), how to use BSR to gauge competition, what BSR range to target as a new seller, and a step-by-step process to validate any niche using BSR research in under 15 minutes.
Format with H2/H3, a clear table, step-by-step instructions. ~850 words. Very actionable.`,
  },
  {
    slug: "designing-first-amazon-merch-tshirt-guide",
    category: "Tutorial",
    publishedAt: "2026-03-20",
    readingTime: 11,
    imagePrompt:
      "Designer working on a tablet with a t-shirt design on screen, color swatches and mockups around the desk, bright creative workspace, lifestyle photography",
    contentPrompt: `Write a step-by-step tutorial titled "Designing Your First Amazon Merch T-Shirt: Complete Beginner's Guide".
Cover: Amazon's design specifications (4500x5400px, 300dpi, PNG with transparent background), free tools (Canva, Adobe Express, GIMP) vs paid (Adobe Illustrator, Affinity Designer), design principles for Merch (contrast, readability, safe zones), choosing fonts and colors that print well, how to create a simple but sellable design from scratch, uploading to Merch dashboard (title, bullets, description tips), and common beginner mistakes.
Use H2/H3, step-by-step numbered sections, tips boxes. ~1000 words.`,
  },
  {
    slug: "amazon-merch-keyword-optimization-listings",
    category: "Tutorial",
    publishedAt: "2026-03-25",
    readingTime: 8,
    imagePrompt:
      "Keyword research concept: sticky notes with search terms on a wall, laptop with Amazon open, notebook with bullet points, modern workspace, editorial photography",
    contentPrompt: `Write a practical tutorial titled "Keyword Optimization for Amazon Merch Listings: Title, Bullets & Description".
Cover: how Amazon's A9 algorithm indexes Merch listings, the anatomy of a perfect Merch title (brand + main keyword + style + niche), how to write 2 bullet points that convert (feature + benefit format), description strategy, keyword research tools (Merch Informer, Helium 10, Amazon autocomplete, MerchRadar), backend keyword field tips, what NOT to include (prohibited keywords, keyword stuffing), and a before/after listing example.
Format with H2/H3, clear examples, a listing template. ~900 words.`,
  },

  // ── TRENDS ──────────────────────────────────────────────────────────
  {
    slug: "pet-lover-merch-niche-guide",
    category: "Trends",
    publishedAt: "2026-02-20",
    readingTime: 7,
    imagePrompt:
      "Cute flat lay of dog and cat themed graphic t-shirts, paw print accessories, warm pastel tones, lifestyle product photography",
    contentPrompt: `Write an engaging blog post titled "Niche Spotlight: Pet Lover Merch — Why It Never Goes Out of Style".
Explain why the pet niche is one of the most reliable on Amazon Merch (passionate buyers, gift market), the sub-niches within pets (by breed: Golden Retriever, French Bulldog, Dachshund etc., by type: dog mom, cat dad, etc.), top search keywords, design styles that sell (funny quotes, breed silhouettes, watercolor), seasonal opportunities (National Dog Day, Cat Day, pet gift seasons), and 10 specific niche ideas with sample keyword phrases.
H2/H3, engaging tone, specific and useful. ~800 words.`,
  },
  {
    slug: "profession-specific-merch-nurses-teachers",
    category: "Trends",
    publishedAt: "2026-02-28",
    readingTime: 7,
    imagePrompt:
      "Flat lay of profession-themed t-shirts — nurse, teacher, firefighter designs — on neutral background, gift wrapping elements, warm tones, lifestyle photography",
    contentPrompt: `Write a blog post titled "The Rise of Profession-Specific Merch: Nurses, Teachers, and More".
Explain why occupation niches work so well on Amazon Merch (identity, pride, gift-giving), top performing professions (nursing, teaching, engineering, firefighting, trucking, military), design approaches that work (funny, pride, appreciation), occasions that drive sales (Teacher Appreciation Week, Nurses Week, etc.), how to find untapped micro-niches within professions, and 15 specific niche ideas with search volume context.
Engaging, specific, data-informed tone. H2/H3, lists. ~800 words.`,
  },

  // ── COMPLIANCE ──────────────────────────────────────────────────────
  {
    slug: "amazon-merch-trademark-brand-infringement",
    category: "Compliance",
    publishedAt: "2026-02-10",
    readingTime: 9,
    imagePrompt:
      "Legal concept: red STOP stamp on a t-shirt design printout, gavel on the side, warning document, muted red and white tones, professional editorial photography",
    contentPrompt: `Write an authoritative and practical blog post titled "Amazon Merch Brand Infringement: What Every Seller Must Know".
Cover: the difference between trademark infringement and copyright infringement on Merch, what kinds of words/phrases are trademarked (sports teams, TV shows, brand names, celebrities), how Amazon detects violations (AI + manual review), consequences of violations (design removal, account suspension), how to check if a term is trademarked (USPTO TESS database walkthrough), safe design practices, common mistakes sellers make (thinking "parody" protects them, using band names), and how to build a compliant portfolio.
H2/H3, serious but approachable tone, very practical. ~950 words.`,
  },
  {
    slug: "amazon-merch-bullet-points-guidelines",
    category: "Compliance",
    publishedAt: "2026-02-18",
    readingTime: 6,
    imagePrompt:
      "Clean screenshot mockup of an Amazon product listing with highlighted bullet points, red and green checkmarks showing dos and don'ts, editorial infographic style",
    contentPrompt: `Write a practical guide titled "How to Write Amazon Merch Bullet Points Without Violating Amazon's Guidelines".
Cover: Amazon's content policy for Merch listings (no health claims, no offensive content, no external URLs, no pricing info, no competitor mentions), what Amazon's algorithm looks for in bullets, the 2-bullet format Amazon gives you and how to use each effectively, prohibited words and phrases, examples of rejected bullet points vs approved ones, how to naturally include keywords without stuffing, and a template for writing compliant, high-converting bullets.
Very practical, include clear examples, do/don't format. H2/H3. ~750 words.`,
  },
];

function openaiRequest(path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "api.openai.com",
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Length": Buffer.byteLength(bodyStr),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(data)); }
        });
      }
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

async function generateContent(prompt) {
  const res = await openaiRequest("/v1/chat/completions", {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert Amazon Merch by Amazon seller and content writer. Write detailed, accurate, actionable blog posts in Markdown format (use ## and ### for headers, **bold** for key terms, - for lists). Do not include the H1 title at the top — start directly with an intro paragraph. Use real, specific information. Avoid generic advice.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });
  if (res.choices?.[0]?.message?.content) return res.choices[0].message.content;
  throw new Error(JSON.stringify(res));
}

async function generateImage(prompt) {
  const res = await openaiRequest("/v1/images/generations", {
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1792x1024",
    quality: "standard",
    response_format: "url",
  });
  if (res.data?.[0]?.url) return res.data[0].url;
  throw new Error(JSON.stringify(res));
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

function slugToTitle(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

async function main() {
  for (const post of posts) {
    const mdPath = path.join(BLOG_DIR, `${post.slug}.md`);
    const imgPath = path.join(IMAGE_DIR, `${post.slug}.jpg`);
    const webImgPath = `/blog/${post.slug}.jpg`;

    if (fs.existsSync(mdPath)) {
      console.log(`⏭  Skipping (exists): ${post.slug}`);
      continue;
    }

    console.log(`\n📝 Generating: ${post.slug}`);

    // 1. Generate content
    let content = "";
    try {
      console.log(`  → Writing content with GPT-4o...`);
      content = await generateContent(post.contentPrompt);
      console.log(`  ✓ Content generated (${content.length} chars)`);
    } catch (err) {
      console.error(`  ✗ Content failed: ${err.message.slice(0, 200)}`);
      continue;
    }

    // 2. Generate image
    let hasImage = fs.existsSync(imgPath);
    if (!hasImage) {
      try {
        console.log(`  → Generating image with DALL-E 3...`);
        const imgUrl = await generateImage(post.imagePrompt);
        await downloadFile(imgUrl, imgPath);
        hasImage = true;
        console.log(`  ✓ Image saved`);
      } catch (err) {
        console.error(`  ✗ Image failed: ${err.message.slice(0, 200)}`);
      }
    }

    // 3. Build markdown file
    // Extract excerpt from first paragraph
    const firstPara = content.split("\n\n").find(p => p && !p.startsWith("#") && !p.startsWith("-") && !p.startsWith("*"))?.replace(/\*\*/g, "").slice(0, 160) + "...";

    const frontmatter = [
      "---",
      `title: "${slugToTitle(post.slug).replace(/"/g, "'")}"`,
      `excerpt: "${firstPara.replace(/"/g, "'")}"`,
      `category:`,
      `  title: "${post.category}"`,
      `  color: "${post.category === "Strategy" ? "green" : post.category === "Tutorial" ? "purple" : post.category === "Trends" ? "blue" : "red"}"`,
      `publishedAt: "${post.publishedAt}"`,
      `readingTime: ${post.readingTime}`,
      `featured: false`,
      hasImage ? `coverImage: "${webImgPath}"` : "",
      "---",
      "",
    ].filter(l => l !== undefined && !(l === "" && !hasImage)).join("\n");

    const fullTitle = `# ${slugToTitle(post.slug)}\n\n`;
    fs.writeFileSync(mdPath, frontmatter + fullTitle + content + "\n", "utf8");
    console.log(`  ✓ Saved: src/content/blog/${post.slug}.md`);

    await new Promise(r => setTimeout(r, 1500));
  }

  console.log("\n✅ All posts generated!");
}

main();
