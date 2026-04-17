export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  channelName: string;
  publishedAt: string;
  thumbnail: string;
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE = "https://www.googleapis.com/youtube/v3";

async function getChannelId(handle: string): Promise<string | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE}/channels?part=id&forHandle=${handle}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

async function getUploadsPlaylistId(channelId: string): Promise<string | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
  } catch {
    return null;
  }
}

async function getPlaylistVideos(playlistId: string, limit: number): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];
  try {
    const res = await fetch(
      `${BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${limit}&key=${API_KEY}`
    );
    const data = await res.json();
    if (!data.items) return [];

    return data.items.map((item: {
      snippet: {
        resourceId: { videoId: string };
        title: string;
        channelTitle: string;
        publishedAt: string;
        thumbnails: { medium?: { url: string }; default?: { url: string } };
      };
    }) => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        id: videoId,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelName: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt.split("T")[0],
        thumbnail: item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url ?? "",
      };
    });
  } catch {
    return [];
  }
}

export async function fetchChannelAvatars(
  handles: string[]
): Promise<Record<string, string>> {
  if (!API_KEY) return {};
  const results: Record<string, string> = {};
  await Promise.all(
    handles.map(async (handle) => {
      try {
        const bare = handle.replace("@", "");
        const res = await fetch(
          `${BASE}/channels?part=snippet&forHandle=${bare}&key=${API_KEY}`,
          { cache: "force-cache" }
        );
        if (!res.ok) return;
        const data = await res.json();
        const thumb = data.items?.[0]?.snippet?.thumbnails;
        const url = thumb?.high?.url ?? thumb?.medium?.url ?? thumb?.default?.url;
        if (url) results[handle] = url;
      } catch {
        // skip silently
      }
    })
  );
  return results;
}

export async function getChannelVideos(handle: string, limit = 4): Promise<YouTubeVideo[]> {
  if (!API_KEY) {
    console.warn("YOUTUBE_API_KEY not set — skipping YouTube fetch");
    return [];
  }
  const channelId = await getChannelId(handle);
  if (!channelId) return [];
  const playlistId = await getUploadsPlaylistId(channelId);
  if (!playlistId) return [];
  return getPlaylistVideos(playlistId, limit);
}
