import SiteShell from "@/components/SiteShell";
import PostCard from "@/components/PostCard";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts({ includeDrafts: false });
  const featured = posts[0];
  const latest = posts.slice(1, 7);

  return (
    <SiteShell title={SITE.name} subtitle={SITE.description}>
      {/* ============================= */}
      {/* TAILWIND TEST — REMOVE LATER */}
      {/* ============================= */}
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Stories Worth Keeping
      </h1>

      {/* ============================= */}
      {/* Top module: featured + sidebar */}
      {/* ============================= */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {featured ? (
            <PostCard post={featured} variant="featured" />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900">
                No posts yet
              </h2>
              <p className="mt-2 text-slate-600">
                Add a markdown file in <code>content/posts</code> to publish.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Example URL format:{" "}
                <code>content/posts/my-first-story.md</code>
              </p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Follow
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              Facebook
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              For updates and community discussion, follow along on Facebook.
            </p>

            <div className="mt-4">
              <a
                href={SITE.facebookPageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Visit Facebook →
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              About
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              A curated home for writing
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Clean design, structured stories, and easy publishing. Next step:
              add a CMS so your aunt can publish without touching files.
            </p>

            <div className="mt-4">
              <Link
                href="/about"
                className="text-sm font-semibold text-slate-900 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* ============================= */}
      {/* Middle module: Latest grid */}
      {/* ============================= */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Latest insights
          </h2>
          <Link
            href="/stories"
            className="text-sm font-semibold text-slate-900 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* ============================= */}
      {/* Bottom module: CTA */}
      {/* ============================= */}
      <section className="mt-12">
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-200">
            Stay connected
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            New stories, published regularly.
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 leading-relaxed">
            This site is designed to make publishing simple and reading enjoyable.
            Follow on Facebook for announcements and updates.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/stories"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Browse insights
            </Link>

            <a
              href={SITE.facebookPageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Facebook →
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
