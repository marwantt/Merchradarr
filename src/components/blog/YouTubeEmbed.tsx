export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div
      className="not-prose my-6 w-full overflow-hidden border border-border"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
