import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { calendlyLink, contactEmail } from "../lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="FlowForge AI home">
      <img
        src="/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-xl object-cover"
      />
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          FlowForge AI
        </span>
        <span className={`block text-[11px] ${light ? "text-slate-400" : "text-muted"}`}>
          Systems for trade &amp; service businesses
        </span>
      </span>
    </Link>
  );
}

const navLinks = [
  { href: "/#solutions", label: "What we fix" },
  { href: "/#simulator", label: "Growth calculator" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-2 sm:inline-flex"
          >
            Book a free review
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 font-semibold text-white"
          >
            Book a free review <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-6">
            Software and automation for UK trade and service businesses. More
            jobs won, less time on admin.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2">
            <li><a href="/#solutions" className="hover:text-white">What we fix</a></li>
            <li><a href="/#process" className="hover:text-white">How it works</a></li>
            <li><a href="/#simulator" className="hover:text-white">Growth calculator</a></li>
            <li><a href="/#faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Get in touch</p>
          <ul className="mt-4 space-y-2">
            <li><a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a></li>
            <li>
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Book a free systems review
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs md:flex-row md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} FlowForge Systems Ltd. All rights reserved.</p>
          <p>FlowForge AI is a trading name of FlowForge Systems Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
