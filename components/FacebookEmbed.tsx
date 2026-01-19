export default function FacebookEmbed({ pageUrl }: { pageUrl: string }) {
    if (!pageUrl || !pageUrl.startsWith("http")) {
      return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Facebook</h3>
          <p className="mt-2 text-sm text-slate-300">
            Add your aunt’s Facebook Page link in <code className="text-slate-200">lib/site.ts</code>.
          </p>
        </div>
      );
    }
  
    const src =
      "https://www.facebook.com/plugins/page.php" +
      `?href=${encodeURIComponent(pageUrl)}` +
      "&tabs=timeline" +
      "&width=380" +
      "&height=720" +
      "&small_header=false" +
      "&adapt_container_width=true" +
      "&hide_cover=false" +
      "&show_facepile=true";
  
    return (
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight">Facebook</h3>
        <p className="mt-1 text-sm text-slate-300">
          Follow along on the Facebook page.
        </p>
  
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <iframe
            title="Facebook Page"
            src={src}
            width="100%"
            height="720"
            style={{ border: "none" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </aside>
    );
  }
  