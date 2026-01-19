import SiteShell from "@/components/SiteShell";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <SiteShell
      title="Contact"
      subtitle="How readers can reach out or stay connected."
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
        <p className="text-slate-300 leading-8">
          Add an email address, or just direct people to Facebook.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-slate-300">Facebook</p>
          <a
            className="mt-2 inline-block text-sm text-blue-300 hover:text-blue-200"
            href={SITE.facebookPageUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit Facebook Page →
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
