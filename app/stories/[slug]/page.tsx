import SiteShell from "@/components/SiteShell";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await Promise.resolve(getAllPosts({ includeDrafts: false }));
  return posts.map((post) => ({ slug: post.slug }));
}

type ParamsShape = { slug?: string };

export default async function StoryPage({
  params,
}: {
  params: ParamsShape | Promise<ParamsShape>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  if (typeof slug !== "string" || slug.trim().length === 0) {
    notFound();
  }

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const paragraphs = post.content
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
          {post.date ? (
            <p className="text-xs uppercase tracking-wider text-slate-400">
              {post.date}
            </p>
          ) : null}

          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-4 text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>
          ) : null}

          <div className="my-8 h-px bg-white/10" />

          <div className="space-y-5 text-[15px] sm:text-base leading-8 text-slate-200">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-slate-300">
              Want to share this story?
            </p>
            <a
              className="mt-2 inline-block text-sm text-blue-300 hover:text-blue-200"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/stories/${post.slug}`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on Facebook →
            </a>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
