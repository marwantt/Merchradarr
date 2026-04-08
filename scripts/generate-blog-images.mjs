import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const OUTPUT_DIR = path.join(process.cwd(), "public", "blog");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const posts = [
  {
    slug: "amazon-merch-trends-2024",
    prompt: "Flat lay of colorful graphic t-shirts arranged on white background, retro gaming and minimalist typography designs visible, professional product photography, clean aesthetic",
  },
  {
    slug: "keyword-research-guide",
    prompt: "Top-down view of a modern desk with a laptop showing search analytics, a notebook with keyword ideas, coffee cup, minimal workspace, muted tones, professional lifestyle photography",
  },
  {
    slug: "amazon_restricted_keywords_compliance1",
    prompt: "Clean minimal graphic of a legal compliance document with a red warning stamp, Amazon seller policy concept, flat design illustration style, white and red tones",
  },
  {
    slug: "amazon-ftc-settlement-2025",
    prompt: "Professional graphic showing a gavel and legal scales next to an online marketplace icon, news article illustration style, muted blue and gray tones, modern flat design",
  },
  {
    slug: "best-ways-learn-merch-amazon-design",
    prompt: "Creative workspace with drawing tablet, colorful design sketches, t-shirt mockups pinned to a board, bright natural light, top-down flat lay photography, inspiring and creative mood",
  },
  {
    slug: "best-merch-niches-summer-2026",
    prompt: "Bright summer vibes flat lay with colorful printed t-shirts, sunglasses, tropical leaves, and flowers on white background, vibrant colors, product photography style",
  },
  {
    slug: "amazon-merch-comfort-colors-guide",
    prompt: "Stack of soft pastel-colored t-shirts in earth tones — sage green, dusty rose, butter yellow, faded blue — folded neatly on white marble surface, fabric texture close-up, cozy aesthetic",
  },
  {
    slug: "amazon-merch-hat-niche-ideas",
    prompt: "Collection of stylish printed baseball caps and dad hats arranged on a white surface, variety of designs and colors, lifestyle product photography, clean and modern",
  },
];

async function generateImage(prompt) {
  const body = JSON.stringify({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1792x1024",
    quality: "standard",
    response_format: "url",
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.openai.com",
        path: "/v1/images/generations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const json = JSON.parse(data);
          if (json.data?.[0]?.url) {
            resolve(json.data[0].url);
          } else {
            reject(new Error(JSON.stringify(json)));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function updateFrontmatter(slug, localPath) {
  // Try both filename patterns
  const patterns = [
    path.join(process.cwd(), "src", "content", "blog", `${slug}.md`),
    // underscore variant
    path.join(process.cwd(), "src", "content", "blog", `${slug.replace(/-/g, "_")}.md`),
  ];

  let filePath = null;
  for (const p of patterns) {
    if (fs.existsSync(p)) { filePath = p; break; }
  }

  // Also search directory for slug match
  if (!filePath) {
    const files = fs.readdirSync(path.join(process.cwd(), "src", "content", "blog"));
    const match = files.find(f => f.replace(".md", "") === slug || f.replace(".md", "").replace(/_/g, "-") === slug);
    if (match) filePath = path.join(process.cwd(), "src", "content", "blog", match);
  }

  if (!filePath) {
    console.log(`  ⚠️  Could not find markdown file for slug: ${slug}`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const webPath = `/blog/${slug}.jpg`;

  if (content.includes("coverImage:")) {
    content = content.replace(/coverImage:.*/, `coverImage: "${webPath}"`);
  } else {
    // Insert after first ---
    content = content.replace(/^---\n/, `---\ncoverImage: "${webPath}"\n`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  ✓ Updated frontmatter → ${webPath}`);
}

async function main() {
  for (const post of posts) {
    console.log(`\n🎨 Generating image for: ${post.slug}`);
    const destPath = path.join(OUTPUT_DIR, `${post.slug}.jpg`);

    if (fs.existsSync(destPath)) {
      console.log(`  ⏭  Already exists, skipping`);
      continue;
    }

    try {
      console.log(`  → Calling DALL-E 3...`);
      const imageUrl = await generateImage(post.prompt);
      console.log(`  → Downloading...`);
      await downloadFile(imageUrl, destPath);
      console.log(`  ✓ Saved to public/blog/${post.slug}.jpg`);
      updateFrontmatter(post.slug, destPath);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }

    // Small delay between API calls to avoid rate limiting
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\n✅ Done!");
}

main();
