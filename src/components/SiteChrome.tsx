import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Menu, MessageCircle, Phone, X } from "lucide-react";
import {
  calendlyLink,
  companyNumber,
  contactEmail,
  founder,
  legalName,
  phoneDisplay,
  phoneHref,
  registeredOffice,
  track,
  whatsappHref,
} from "../lib/site";

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
        <span
          className={`hidden text-[11px] sm:block ${light ? "text-slate-400" : "text-muted"}`}
        >
          Systems for trade &amp; service businesses
        </span>
      </span>
    </Link>
  );
}

/** Opens the booking page in a new tab and records the click. */
export function BookLink({
  where,
  className,
  children,
}: {
  where: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={calendlyLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("Book click", { where })}
      className={className}
    >
      {children}
    </a>
  );
}

const navLinks = [
  { href: "/#solutions", label: "What we fix" },
  { href: "/#simulator", label: "Growth calculator" },
  { href: "/#about", label: "About" },
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
          {phoneHref && (
            <a
              href={phoneHref}
              onClick={() => track("Call click", { where: "header" })}
              className="hidden items-center gap-2 px-2 text-sm font-semibold text-ink lg:inline-flex"
            >
              <Phone size={16} className="text-accent" /> {phoneDisplay}
            </a>
          )}
          <BookLink
            where="header"
            className="inline-flex rounded-md bg-ink px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-2 sm:px-4"
          >
            <span className="sm:hidden">Book a call</span>
            <span className="hidden sm:inline">Book a free review</span>
          </BookLink>
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
            href="/#contact"
            onClick={() => setOpen(false)}
            className="block border-b border-line py-3 font-medium"
          >
            Contact
          </a>
          <BookLink
            where="mobile menu"
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 font-semibold text-white"
          >
            Book a free review <ArrowRight size={16} />
          </BookLink>
        </div>
      )}
    </header>
  );
}

/**
 * Phone-only action bar pinned to the bottom of the screen once the visitor
 * scrolls past the hero, so contacting you is always one tap away.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 520 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secondary = whatsappHref
    ? { href: whatsappHref, label: "WhatsApp", icon: MessageCircle, event: "WhatsApp click", external: true }
    : phoneHref
      ? { href: phoneHref, label: "Call", icon: Phone, event: "Call click", external: false }
      : { href: "#contact", label: "Message", icon: MessageCircle, event: "Message click", external: false };
  const SecondaryIcon = secondary.icon;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <a
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() => track(secondary.event, { where: "mobile bar" })}
          tabIndex={show ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-ink/15 bg-card py-3 text-sm font-semibold"
        >
          <SecondaryIcon size={17} /> {secondary.label}
        </a>
        <BookLink
          where="mobile bar"
          className="flex flex-[1.6] items-center justify-center gap-2 rounded-md bg-accent py-3 text-sm font-semibold text-white"
        >
          <CalendarCheck size={17} /> Book a free review
        </BookLink>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-20 text-slate-400 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-6">
            Software and automation for UK trade and service businesses. More
            jobs won, less time on admin. Based in {founder.location}, working
            UK-wide.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2">
            <li><a href="/#solutions" className="hover:text-white">What we fix</a></li>
            <li><a href="/#simulator" className="hover:text-white">Growth calculator</a></li>
            <li><a href="/#about" className="hover:text-white">About</a></li>
            <li><a href="/#faq" className="hover:text-white">FAQ</a></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy notice</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Get in touch</p>
          <ul className="mt-4 space-y-2">
            {phoneHref && (
              <li>
                <a href={phoneHref} onClick={() => track("Call click", { where: "footer" })} className="hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
            )}
            {whatsappHref && (
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => track("WhatsApp click", { where: "footer" })} className="hover:text-white">
                  Message on WhatsApp
                </a>
              </li>
            )}
            <li><a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a></li>
            <li>
              <BookLink where="footer" className="hover:text-white">
                Book a free systems review
              </BookLink>
            </li>
            <li>
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs leading-5 md:flex-row md:justify-between md:gap-8 md:px-6">
          <p>
            © {new Date().getFullYear()} {legalName}. FlowForge AI is a trading
            name of {legalName}.
          </p>
          {(companyNumber || registeredOffice) && (
            <p className="md:text-right">
              {companyNumber && <>Registered in England &amp; Wales, company no. {companyNumber}. </>}
              {registeredOffice && <>Registered office: {registeredOffice}.</>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
