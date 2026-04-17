'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="not-prose my-8 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${url}?utm_source=ig_embed`}
        data-instgrm-version="14"
        style={{ maxWidth: 540, width: "100%", border: 0 }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  );
}
