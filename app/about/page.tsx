import SiteShell from "@/components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell
      title="About"
      subtitle="A short introduction — who she is and what she writes about."
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
        <p className="text-slate-300 leading-8">
          Replace this text with your aunt’s bio. Keep it warm, simple, and personal.
          Mention what topics she writes about and why she started sharing her stories.
        </p>
      </div>
    </SiteShell>
  );
}
