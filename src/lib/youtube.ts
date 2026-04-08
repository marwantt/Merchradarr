export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  channelName: string;
  publishedAt: string;
  thumbnail: string;
}

function decodeXml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function resolveChannelId(handle: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/${handle}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    const html = await res.text();
    const match = html.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function fetchVideos(channelId: string, limit = 4): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );
    const xml = await res.text();
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];

    return entries.slice(0, limit).map((entry) => {
      const videoId = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || "";
      const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1] || "";
      const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || "";
      const channelName = (entry.match(/<name>([^<]+)<\/name>/) || [])[1] || "";

      return {
        id: videoId,
        title: decodeXml(title),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelName: decodeXml(channelName),
        publishedAt: published.split("T")[0],
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      };
    });
  } catch {
    return [];
  }
}

export async function getChannelVideos(handle: string, limit = 4): Promise<YouTubeVideo[]> {
  const channelId = await resolveChannelId(handle);
  if (!channelId) return [];
  return fetchVideos(channelId, limit);
}
