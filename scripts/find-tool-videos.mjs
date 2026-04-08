/**
 * Finds relevant YouTube tutorial videos from the 5 channels for each tool.
 * Outputs JSON so we can hardcode them into the tools page.
 */

import https from "https";

const YT_KEY = process.env.YOUTUBE_API_KEY;

const CHANNELS = [
  "RyanHoguePassiveIncome",
  "PhilipAnders",
  "brenondopp",
  "wtfamievendoing",
  "jayswayworks",
];

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => { try { resolve(JSON.parse(data)); } catch(e) { reject(new Error(data.slice(0,300))); } });
    }).on("error", reject);
  });
}

async function getChannelId(handle) {
  const data = await getJson(`https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${handle}&key=${YT_KEY}`);
  return data.items?.[0]?.id ?? null;
}

async function getUploadsPlaylist(channelId) {
  const data = await getJson(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YT_KEY}`);
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

async function getVideos(playlistId, limit = 20) {
  const data = await getJson(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${limit}&key=${YT_KEY}`);
  return (data.items ?? []).map(item => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    thumbnail: `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/mqdefault.jpg`,
  }));
}

async function main() {
  const allVideos = [];

  for (const handle of CHANNELS) {
    try {
      const channelId = await getChannelId(handle);
      if (!channelId) continue;
      const playlistId = await getUploadsPlaylist(channelId);
      if (!playlistId) continue;
      const videos = await getVideos(playlistId, 20);
      allVideos.push(...videos);
      console.error(`✓ @${handle}: ${videos.length} videos`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ @${handle}: ${err.message.slice(0, 100)}`);
    }
  }

  // Print all video titles + IDs so we can manually select
  console.log(JSON.stringify(allVideos, null, 2));
}

main();
