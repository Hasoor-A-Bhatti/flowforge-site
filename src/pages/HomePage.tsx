import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  Check,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Inbox,
  MessageSquareReply,
  PhoneMissed,
  PoundSterling,
  Receipt,
  Repeat,
  Star,
  Timer,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { SiteFooter, SiteNav } from "../components/SiteChrome";
import { GrowthSimulator, QuickEstimate } from "../components/GrowthSimulator";
import { initialSim, type SimState } from "../lib/growthModel";
import { calendlyLink, contactEmail, formspreeEndpoint } from "../lib/site";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const trades = [
  "Plumbing & heating",
  "Electrical",
  "Building & roofing",
  "HVAC & renewables",
  "Cleaning services",
  "Landscaping",
  "Pest control",
  "Removals",
  "Property maintenance",
];

const leaks = [
  {
    icon: PhoneMissed,
    title: "Missed calls while on the tools",
    text: "The customer rings the next firm on Google. By the time you call back at 6pm, the job's gone.",
  },
  {
    icon: FileText,
    title: "Quotes that never get chased",
    text: "Most quotes go quiet because nobody follows up. That isn't a lost customer, it's an unchased one.",
  },
  {
    icon: ClipboardList,
    title: "Evenings spent on paperwork",
    text: "Job sheets, certificates and invoices typed up at the kitchen table after a full day on site.",
  },
  {
    icon: Repeat,
    title: "The same details typed in three places",
    text: "Customer info copied from WhatsApp to the diary to a spreadsheet to the accounts. Every copy is a chance to get it wrong.",
  },
  {
    icon: PoundSterling,
    title: "Chasing late payments",
    text: "Awkward reminder calls and unpaid invoices that sit for weeks because nobody had time to follow up.",
  },
  {
    icon: CalendarClock,
    title: "No-shows and diary clashes",
    text: "Wasted trips when customers forget, and double bookings when the diary lives in someone's head.",
  },
];

const winMore = [
  {
    icon: MessageSquareReply,
    title: "Instant enquiry response",
    text: "Every call, form and message gets a reply within a minute, even when you're up a ladder.",
  },
  {
    icon: BellRing,
    title: "Automatic quote follow-up",
    text: "Polite, well-timed chasers go out after every quote until the customer says yes or no.",
  },
  {
    icon: Inbox,
    title: "Lead sorting & priority",
    text: "Enquiries are sorted by job type, location and value, so the best work gets called first.",
  },
  {
    icon: Star,
    title: "Review requests",
    text: "Happy customers are asked for a Google review at the right moment, which brings in more enquiries.",
  },
];

const runLean = [
  {
    icon: Receipt,
    title: "Job sheet to invoice",
    text: "Finished jobs become invoices in your accounts software without anyone retyping them.",
  },
  {
    icon: PoundSterling,
    title: "Payment chasing",
    text: "Reminders go out on schedule and stop as soon as the invoice is paid.",
  },
  {
    icon: CalendarClock,
    title: "Booking & reminders",
    text: "Customers confirm slots, get reminders the day before and can reschedule without ringing you.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reporting you'll actually read",
    text: "A simple weekly view of enquiries, quotes, jobs won and money owed. No spreadsheet wrangling.",
  },
];

const tools = [
  "Xero",
  "QuickBooks",
  "Google Workspace",
  "Microsoft 365",
  "WhatsApp Business",
  "ServiceM8",
  "Tradify",
  "Jobber",
];

const steps = [
  {
    n: "01",
    title: "Free systems review",
    time: "30 minutes",
    text: "We walk through how a job moves through your business, from first call to final payment, and find where time and money are leaking.",
  },
  {
    n: "02",
    title: "Clear plan & fixed quote",
    time: "Within a few days",
    text: "You get a written plan in plain English: what we'll build, what it'll save you and a fixed price. No surprises.",
  },
  {
    n: "03",
    title: "Build around your tools",
    time: "Weeks, not months",
    text: "We set it up on top of the software you already use and test it on real jobs before anything goes live.",
  },
  {
    n: "04",
    title: "Handover & ongoing support",
    time: "Ongoing",
    text: "We train you and your team, keep an eye on it and adjust it as your business grows.",
  },
];

const faqs = [
  {
    q: "Do I have to change the software I already use?",
    a: "Usually not. We build around what you've already got, whether that's your accounts package, job management app, calendar or inbox. If something is genuinely holding you back, we'll tell you and explain why.",
  },
  {
    q: "I'm not technical. Will I be able to use it?",
    a: "Yes. Most of what we build runs in the background. Where you do interact with it, it'll be through things you already use, like email, text or your phone's calendar. We train you and your team at handover.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what needs fixing. After the free review you get a fixed quote, and the plan shows what the system should save you so you can judge whether it's worth it before you commit.",
  },
  {
    q: "What happens if something stops working?",
    a: "We monitor the systems we build and fix issues quickly. You'll always have a direct line to the person who built it, not a ticket queue.",
  },
  {
    q: "Is my customer data safe?",
    a: "We only use the data each process actually needs, build on established, reputable platforms and design everything with UK GDPR in mind.",
  },
  {
    q: "Is this just a chatbot?",
    a: "No. We use AI where it earns its keep, such as reading enquiries or drafting replies. Most of the value comes from joining up your tools so jobs, quotes and invoices flow without manual effort.",
  },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
      {children}
    </p>
  );
}

function PrimaryCta({ children = "Book a free systems review" }: { children?: React.ReactNode }) {
  return (
    <a
      href={calendlyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-accent px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-accent-dark"
    >
      {children} <ArrowRight size={18} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Example "today" activity board                                      */
/* ------------------------------------------------------------------ */

const feed = [
  { time: "08:12", tag: "Enquiry", tone: "accent", title: "Boiler not firing, Headingley", note: "Auto-replied in 38s · booked call-out" },
  { time: "09:40", tag: "Quote", tone: "ink", title: "Bathroom refit, £6,450", note: "Day-3 follow-up sent automatically" },
  { time: "11:05", tag: "Booking", tone: "ok", title: "Annual service, Mrs Patel", note: "Reminder sent · customer confirmed" },
  { time: "14:30", tag: "Invoice", tone: "ok", title: "Job #1182 complete", note: "Invoice created in Xero · £385" },
  { time: "16:55", tag: "Payment", tone: "ink", title: "Job #1150 overdue 7 days", note: "Polite reminder sent" },
] as const;

const toneClass: Record<string, string> = {
  accent: "bg-accent-soft text-accent-dark",
  ink: "bg-slate-100 text-ink",
  ok: "bg-ok-soft text-ok",
};

function HeroBoard() {
  return (
    <div className="rounded-xl border border-line bg-card shadow-[0_24px_60px_-20px_rgba(14,26,36,0.25)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="font-display text-base font-bold">Today, handled</p>
          <p className="text-xs text-muted">Example: a plumbing &amp; heating firm</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-xs font-semibold text-ok">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Running
        </span>
      </div>

      <ul className="divide-y divide-line">
        {feed.map((f) => (
          <li key={f.time} className="flex items-start gap-4 px-5 py-3.5">
            <span className="w-11 shrink-0 pt-0.5 font-mono text-xs text-muted">{f.time}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${toneClass[f.tone]}`}>
                  {f.tag}
                </span>
                <p className="truncate text-sm font-semibold">{f.title}</p>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <Check size={13} className="text-ok" /> {f.note}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 border-t border-line text-center">
        {[
          { k: "0", l: "missed enquiries" },
          { k: "3", l: "quotes chased" },
          { k: "0 hrs", l: "spent on admin" },
        ].map((s, i) => (
          <div key={s.l} className={`px-3 py-4 ${i < 2 ? "border-r border-line" : ""}`}>
            <p className="font-display text-xl font-bold">{s.k}</p>
            <p className="mt-0.5 text-[11px] text-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

type ContactForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  trade: string;
  teamSize: string;
  message: string;
};

const emptyForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  trade: "",
  teamSize: "",
  message: "",
};

const inputCls =
  "w-full rounded-md border border-line bg-white px-3.5 py-3 text-ink outline-none transition placeholder:text-slate-400 hover:border-ink/30 focus:border-ink focus:ring-2 focus:ring-ink/10";

/** Native select (keeps mobile pickers and accessibility) styled to match the inputs. */
function Select({
  value,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        value={value}
        {...props}
        className={`${inputCls} cursor-pointer appearance-none pr-10 ${value ? "text-ink" : "text-slate-400"}`}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setStatus("success");
      setFormData(emptyForm);
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Free systems review</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Find out where your business is losing time and money.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            A 30-minute call, no obligation. You'll come away with a clear
            picture of what's costing you, even if you never work with us.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "We map how a job moves from enquiry to payment",
              "We pinpoint the 2–3 biggest time and money leaks",
              "You get a written plan with a fixed quote, if it's worth doing",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok-soft text-ok">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryCta>Pick a time</PrimaryCta>
            <a href={`mailto:${contactEmail}`} className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
              or email {contactEmail}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-card p-6 md:p-8">
          <p className="font-display text-xl font-bold">Prefer to send the details first?</p>
          <p className="mt-1 text-sm text-muted">We reply within one working day.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Name</span>
              <input name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="Your name" autoComplete="name" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Email</span>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="you@business.co.uk" autoComplete="email" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Business name</span>
              <input name="company" value={formData.company} onChange={handleChange} className={inputCls} placeholder="e.g. Smith Plumbing Ltd" autoComplete="organization" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Phone <span className="text-muted">(optional)</span></span>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="07…" autoComplete="tel" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Trade / sector</span>
              <Select name="trade" value={formData.trade} onChange={handleChange} required>
                <option value="" disabled>Choose your trade</option>
                {trades.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
                <option value="Other service business">Other service business</option>
              </Select>
            </label>
            <label className="space-y-1.5">
              <span className="block text-sm font-medium">Team size</span>
              <Select name="teamSize" value={formData.teamSize} onChange={handleChange}>
                <option value="" disabled>How many people?</option>
                <option>Just me</option>
                <option>2–5 people</option>
                <option>6–20 people</option>
                <option>21–50 people</option>
                <option>50+ people</option>
              </Select>
            </label>
          </div>

          <label className="mt-4 block space-y-1.5">
            <span className="block text-sm font-medium">What's taking up the most time right now?</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputCls} min-h-32`}
              placeholder="e.g. We miss calls while on site, quotes don't get followed up, invoices get done on Sunday nights…"
            />
          </label>

          {status === "success" && (
            <div className="mt-5 rounded-md border border-ok/20 bg-ok-soft px-4 py-3 text-sm font-medium text-ok">
              Thanks, that's come through. We'll be in touch within one working day.
            </div>
          )}
          {status === "error" && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Something went wrong. Please try again or email {contactEmail}.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send details"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [sim, setSim] = useState<SimState>(() => initialSim());

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rise">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm font-medium text-muted">
                <Wrench size={15} className="text-accent" />
                For UK trade &amp; service businesses
              </p>

              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                More jobs booked.
                <br />
                <span className="text-accent">Less time on paperwork.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                We build the systems behind busy trade and service firms. Every
                enquiry gets answered, every quote gets chased, and the admin
                between job and invoice runs itself. You win more work and get
                your evenings back.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta />
                <a
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ink/15 bg-card px-6 py-3.5 font-semibold transition hover:border-ink/40"
                >
                  How it works
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {["Fixed quote before any work", "Built around your existing tools", "You own everything we build"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check size={16} className="text-ok" strokeWidth={2.5} /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rise rise-delay">
              <QuickEstimate sim={sim} setSim={setSim} />
            </div>
          </div>
        </section>

        {/* TRADES STRIP */}
        <section className="border-y border-line bg-card px-4 py-6 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Built for</p>
            <ul className="flex flex-wrap gap-2">
              {trades.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                You're good at the work. The admin around it costs you more
                than you think.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Most trade businesses don't lose money on the job. They lose it
                in the gaps: the enquiry nobody answered, the quote nobody
                chased, the invoice that went out a week late.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {leaks.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-card p-7">
                  <Icon size={22} className="text-accent" />
                  <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="simulator" className="scroll-mt-20 border-t border-line bg-card px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <Eyebrow>Growth calculator</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                See what a few more jobs a month is really worth.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Pick your trade, set your numbers and drag the slider. Small
                gains in jobs won add up fast, and you keep the time you save
                on admin.
              </p>
            </div>
            <div className="mt-12">
              <GrowthSimulator sim={sim} setSim={setSim} />
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" className="scroll-mt-20 bg-ink px-4 py-20 text-white md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <Eyebrow>What we fix</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Two things every system we build has to do.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Bring in more revenue, and take cost and hassle out of running
                the business. If it doesn't do one of those, we don't build it.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {[
                { heading: "Win more work", sub: "Turn more enquiries into paid jobs", items: winMore, icon: PoundSterling },
                { heading: "Run a leaner back office", sub: "Cut the hours between job done and money in", items: runLean, icon: Timer },
              ].map(({ heading, sub, items, icon: HeadIcon }) => (
                <div key={heading} className="rounded-xl border border-white/10 bg-ink-2 p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-white">
                      <HeadIcon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold">{heading}</h3>
                      <p className="text-sm text-slate-400">{sub}</p>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-6">
                    {items.map(({ icon: Icon, title, text }) => (
                      <li key={title} className="flex gap-4">
                        <Icon size={20} className="mt-0.5 shrink-0 text-accent" />
                        <div>
                          <p className="font-semibold">{title}</p>
                          <p className="mt-1 leading-7 text-slate-300">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
              <p className="shrink-0 text-sm text-slate-400">Works alongside tools like</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-display text-lg font-semibold text-slate-200">
                {tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* A DAY WITH FLOWFORGE */}
        <section className="px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>What it looks like day to day</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                You do the jobs. The system does everything around them.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Once it's running, the follow-ups, reminders, invoices and
                chasers happen on their own, in your name and your tone of
                voice. You just see what's been done.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { t: "Nothing slips through", d: "Every enquiry, quote and unpaid invoice is tracked until it's closed." },
                  { t: "Works from your phone", d: "Summaries and approvals land where you already are: text, email or WhatsApp." },
                  { t: "You stay in control", d: "Anything unusual is flagged to you rather than guessed at." },
                ].map((s) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok-soft text-ok">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>
                      <span className="font-semibold">{s.t}.</span>{" "}
                      <span className="text-muted">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <HeroBoard />
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="scroll-mt-20 border-t border-line bg-card px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                No jargon, no long contracts. A clear plan and a fixed price.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="border-t-2 border-ink pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-sm font-bold text-accent">{s.n}</span>
                    <span className="text-xs font-medium text-muted">{s.time}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-6 rounded-xl bg-paper p-7 md:grid-cols-3 md:p-9">
              {[
                { t: "You own it", d: "Everything we build runs on your accounts and belongs to you. No lock-in." },
                { t: "Measured, not guessed", d: "We agree what success looks like up front, such as response time, quotes won or hours saved, and report against it." },
                { t: "UK-based & GDPR-minded", d: "We only use the data each process needs, on reputable, established platforms." },
              ].map((c) => (
                <div key={c.t}>
                  <p className="flex items-center gap-2 font-display text-lg font-bold">
                    <Check size={18} className="text-ok" strokeWidth={3} /> {c.t}
                  </p>
                  <p className="mt-2 leading-7 text-muted">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t border-line px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Straight answers.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Anything else? Ask on the free review call, or email{" "}
                <a href={`mailto:${contactEmail}`} className="font-medium text-ink underline underline-offset-4">
                  {contactEmail}
                </a>
                .
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-line" />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
