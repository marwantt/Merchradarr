/**
 * Enriches blog posts with relevant YouTube videos from the 5 creator channels.
 * Fetches recent uploads, uses GPT-4o to match videos to blog topics,
 * then appends a "Watch & Learn" section to each matched post.
 *
 * Usage: YOUTUBE_API_KEY=... OPENAI_API_KEY=... node scripts/enrich-posts-youtube.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";

const YT_KEY = process.env.YOUTUBE_API_KEY;
const OAI_KEY = process.env.OPENAI_API_KEY;

if (!YT_KEY || !OAI_KEY) {
  console.error("Set YOUTUBE_API_KEY and OPENAI_API_KEY environment variables.");
  process.exit(1);
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

const CHANNELS = [
  { handle: "RyanHoguePassiveIncome", name: "Ryan Hogue" },
  { handle: "PhilipAnders", name: "Philip Anders" },
  { handle: "brenondopp", name: "Brenon Dopp" },
  { handle: "wtfamievendoing", name: "wtfamievendoing" },
  { handle: "jayswayworks", name: "Jay's Way" },
];

// ── HTTP helpers ──────────────────────────────────────────────────────────────

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(data.slice(0, 300))); }
      });
    }).on("error", reject);
  });
}

function openaiChat(messages, model = "gpt-4o-mini") {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 1000 });
    const req = https.request({
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAI_KEY}`,
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          const j = JSON.parse(data);
          resolve(j.choices?.[0]?.message?.content ?? "");
        } catch (e) { reject(new Error(data.slice(0, 300))); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── YouTube helpers ───────────────────────────────────────────────────────────

async function getChannelId(handle) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${YT_KEY}`;
  const data = await getJson(url);
  return data.items?.[0]?.id ?? null;
}

async function getUploadsPlaylist(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YT_KEY}`;
  const data = await getJson(url);
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

async function getRecentVideos(playlistId, limit = 10) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${limit}&key=${YT_KEY}`;
  const data = await getJson(url);
  return (data.items ?? []).map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    description: item.snippet.description?.slice(0, 200) ?? "",
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    channelName: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt?.slice(0, 10) ?? "",
  }));
}

// ── Blog helpers ──────────────────────────────────────────────────────────────

function readBlogPost(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const frontmatter = match[1];
  const body = match[2];
  const titleMatch = frontmatter.match(/^title:\s*"?([^"\n]+)"?/m);
  const title = titleMatch?.[1] ?? path.basename(filePath, ".md");
  return { filePath, frontmatter, body, title };
}

function alreadyEnriched(body) {
  return body.includes("## Watch & Learn");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Fetch all videos from all 5 channels
  console.log("📺 Fetching YouTube videos...");
  const allVideos = [];

  for (const ch of CHANNELS) {
    try {
      const channelId = await getChannelId(ch.handle);
      if (!channelId) { console.log(`  ⚠️  Channel not found: @${ch.handle}`); continue; }
      const playlistId = await getUploadsPlaylist(channelId);
      if (!playlistId) { console.log(`  ⚠️  No uploads playlist for @${ch.handle}`); continue; }
      const videos = await getRecentVideos(playlistId, 15);
      allVideos.push(...videos);
      console.log(`  ✓ @${ch.handle}: ${videos.length} videos`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`  ✗ Error for @${ch.handle}: ${err.message.slice(0, 150)}`);
    }
  }

  if (allVideos.length === 0) {
    console.error("No videos fetched. Check YOUTUBE_API_KEY.");
    process.exit(1);
  }

  console.log(`\n📚 Total videos fetched: ${allVideos.length}`);

  // 2. Build a compact video list for GPT
  const videoList = allVideos.map((v, i) =>
    `[${i}] "${v.title}" by ${v.channelName} — ${v.url}`
  ).join("\n");

  // 3. Read all blog posts
  const mdFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
  const posts = mdFiles.map(f => readBlogPost(path.join(BLOG_DIR, f))).filter(Boolean);

  console.log(`\n🔗 Matching videos to ${posts.length} blog posts...`);

  for (const post of posts) {
    if (alreadyEnriched(post.body)) {
      console.log(`  ⏭  Already enriched: ${post.title}`);
      continue;
    }

    // Ask GPT to find the 1-2 most relevant videos for this post
    const matchPrompt = `You are helping match YouTube videos to a blog post.

Blog post title: "${post.title}"
Blog post excerpt (first 300 chars): "${post.body.slice(0, 300).replace(/[#\n]/g, " ").trim()}"

Available videos (index: title + URL):
${videoList}

Return a JSON array of the 1-2 most relevant video indexes for this blog post (e.g. [3, 17]).
If no video is clearly relevant, return [].
Only return the JSON array, nothing else.`;

    let matchedIndexes = [];
    try {
      const response = await openaiChat([{ role: "user", content: matchPrompt }], "gpt-4o-mini");
      const cleaned = response.trim().replace(/```json|```/g, "").trim();
      matchedIndexes = JSON.parse(cleaned);
    } catch (err) {
      console.log(`  ⚠️  Match parse error for "${post.title}": ${err.message.slice(0, 100)}`);
      continue;
    }

    if (!Array.isArray(matchedIndexes) || matchedIndexes.length === 0) {
      console.log(`  — No match for: ${post.title}`);
      continue;
    }

    const matched = matchedIndexes
      .map(i => allVideos[i])
      .filter(Boolean);

    if (matched.length === 0) continue;

    // Build the Watch & Learn section
    const videoMarkdown = matched.map(v =>
      `- **[${v.title}](${v.url})** — *${v.channelName}*`
    ).join("\n");

    const watchSection = `\n\n---\n\n## Watch & Learn\n\nWant to go deeper? These videos from top Amazon Merch creators cover exactly what we discussed:\n\n${videoMarkdown}\n`;

    // Append to the post file
    const newContent = `---\n${post.frontmatter}\n---\n${post.body}${watchSection}`;
    fs.writeFileSync(post.filePath, newContent, "utf8");
    console.log(`  ✓ Enriched "${post.title}" with ${matched.length} video(s)`);

    await new Promise(r => setTimeout(r, 500));
  }

  console.log("\n✅ YouTube enrichment complete!");
}

main();
