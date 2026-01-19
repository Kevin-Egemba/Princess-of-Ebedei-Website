import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SiteShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Nav />

        {(title || subtitle) ? (
          <header className="pt-10 pb-8 border-b border-slate-200">
            {title ? (
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="mt-3 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </header>
        ) : (
          <div className="pt-6" />
        )}

        <main className="py-10">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
