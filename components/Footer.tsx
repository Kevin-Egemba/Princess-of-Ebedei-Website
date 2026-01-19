import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-slate-200 text-sm text-slate-600">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p className="text-slate-500">Thoughtful writing, beautifully presented.</p>
      </div>
    </footer>
  );
}
