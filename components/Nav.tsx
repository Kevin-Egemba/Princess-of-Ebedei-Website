import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      {/* Logo / Site name */}
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-white"
      >
        {SITE.name}
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-6">
        {[
          { href: "/", label: "Home" },
          { href: "/stories", label: "Insights" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-white/80 transition hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
