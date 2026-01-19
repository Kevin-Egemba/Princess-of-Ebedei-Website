import SiteShell from "@/components/SiteShell";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function StoriesPage() {
  const posts = getAllPosts({ includeDrafts: false });

  return (
    <SiteShell
      title="Insights"
      subtitle="All published stories and reflections—organized in a clean, editorial layout."
    >
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-900">No posts yet</h2>
          <p className="mt-2 text-slate-600">
            Add markdown files in <code>content/posts</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </SiteShell>
  );
}
