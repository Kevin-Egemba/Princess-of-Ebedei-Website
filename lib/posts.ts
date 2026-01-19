import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function toStringSafe(v: unknown, fallback = "") {
  if (typeof v === "string") return v;
  return fallback;
}

function toBoolSafe(v: unknown, fallback = false) {
  if (typeof v === "boolean") return v;
  return fallback;
}

function toStringArraySafe(v: unknown) {
  if (Array.isArray(v)) return v.filter((x) => typeof x === "string") as string[];
  return [];
}

function makeExcerpt(content: string, maxLen = 160) {
  const cleaned = content.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen).trimEnd() + "…";
}

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/i, "");
}

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found for slug "${slug}" at: ${fullPath}`);
  }
  return fs.readFileSync(fullPath, "utf8");
}

export function getAllPosts(options?: { includeDrafts?: boolean }) {
  const includeDrafts = options?.includeDrafts ?? false;

  ensurePostsDir();

  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.toLowerCase().endsWith(".md"));

  const posts: Post[] = filenames.map((filename) => {
    const slug = slugFromFilename(filename);

    const fileContents = readPostFile(slug);
    const { data, content } = matter(fileContents);

    const title = toStringSafe((data as any).title, slug);
    const date = toStringSafe((data as any).date, "");
    const excerptFront = toStringSafe((data as any).excerpt, "");
    const tags = toStringArraySafe((data as any).tags).map((t) => t.trim()).filter(Boolean);
    const draft = toBoolSafe((data as any).draft, false);

    const excerpt = excerptFront.trim() ? excerptFront.trim() : makeExcerpt(content);

    return {
      slug,
      title,
      date,
      excerpt,
      tags,
      draft,
      content
    };
  });

  const filtered = includeDrafts ? posts : posts.filter((p) => !p.draft);

  // Sort newest first (string compare works for YYYY-MM-DD; empty dates go last)
  filtered.sort((a, b) => (b.date || "0000-00-00").localeCompare(a.date || "0000-00-00"));

  return filtered;
}

export function getPostBySlug(slug: string) {
  ensurePostsDir();

  if (!slug || typeof slug !== "string") {
    throw new Error("getPostBySlug: slug must be a non-empty string");
  }

  const fileContents = readPostFile(slug);
  const { data, content } = matter(fileContents);

  const title = toStringSafe((data as any).title, slug);
  const date = toStringSafe((data as any).date, "");
  const excerptFront = toStringSafe((data as any).excerpt, "");
  const tags = toStringArraySafe((data as any).tags).map((t) => t.trim()).filter(Boolean);
  const draft = toBoolSafe((data as any).draft, false);

  const excerpt = excerptFront.trim() ? excerptFront.trim() : makeExcerpt(content);

  const post: Post = {
    slug,
    title,
    date,
    excerpt,
    tags,
    draft,
    content
  };

  return post;
}
