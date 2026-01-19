import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({
  post,
  variant = "standard",
}: {
  post: Post;
  variant?: "standard" | "featured";
}) {
  const label = "INSIGHT";

  if (variant === "featured") {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>

        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          <Link className="hover:underline" href={`/stories/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? (
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-500">{post.date || ""}</p>
          <Link
            className="text-sm font-semibold text-slate-900 hover:underline"
            href={`/stories/${post.slug}`}
          >
            Read more →
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50 transition">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        {post.date ? <p className="text-xs text-slate-500">{post.date}</p> : null}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
        <Link className="hover:underline" href={`/stories/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      {post.excerpt ? (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {post.excerpt}
        </p>
      ) : null}

      <div className="mt-4">
        <Link
          className="text-sm font-semibold text-slate-900 hover:underline"
          href={`/stories/${post.slug}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
