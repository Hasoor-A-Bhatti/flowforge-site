import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  Mail,
  MousePointerClick,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    type: "intro",
    eyebrow: "Demo workflow",
    title: "AI Lead Qualification Workflow",
    subtitle:
      "A practical automation demo showing how FlowForge AI turns incoming enquiries into prioritised, actionable leads.",
    points: [
      "Captures incoming enquiries",
      "Scores lead quality automatically",
      "Identifies key customer pain points",
      "Updates a CRM-style system",
      "Prepares recommended follow-up actions",
    ],
  },
  {
    type: "image",
    eyebrow: "Step 1",
    title: "A lead submits an enquiry",
    subtitle:
      "The lead enters their name, email, company, industry, and enquiry through a clean lead capture form.",
    image: "/leadsDemo1.png",
    tag: "Lead captured",
  },
  {
    type: "image",
    eyebrow: "Step 2",
    title: "AI qualifies and organises the lead",
    subtitle:
      "The enquiry is automatically analysed, scored, summarised, and stored in a CRM-style system.",
    image: "/leadsDemo2.png",
    tag: "CRM updated",
  },
  {
    type: "image",
    eyebrow: "Step 3",
    title: "The team receives an instant summary",
    subtitle:
      "A clear email notification is generated with the lead score, pain points, automation opportunity, and recommended next action.",
    image: "/leadsDemo3.png",
    tag: "Email notification",
  },
  {
    type: "value",
    eyebrow: "Business outcome",
    title: "Less manual admin. Faster lead response.",
    subtitle:
      "Instead of manually checking enquiries, judging importance, updating spreadsheets, and drafting follow-ups, the workflow handles the first layer automatically.",
    points: [
      "Faster response to high-value leads",
      "Clearer lead prioritisation",
      "Reduced manual copy-pasting",
      "Fewer missed opportunities",
      "A more scalable enquiry process",
    ],
  },
  {
    type: "cta",
    eyebrow: "Want this for your business?",
    title: "Book a free AI workflow audit",
    subtitle:
      "FlowForge AI helps businesses identify repetitive processes, map automation opportunities, and build practical AI-powered workflows that save time.",
    points: [
      "Lead handling automation",
      "CRM workflow automation",
      "Email follow-up systems",
      "Internal admin automation",
      "Custom AI workflow design",
    ],
  },
];

export default function LeadQualificationDemoPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }

  function previousSlide() {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a] text-white">
      <section className="relative px-6 py-8 md:px-12 lg:px-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.28),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.16),transparent_40%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-fuchsia-500/5 backdrop-blur-2xl md:px-5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/icon.png"
                alt="FlowForge AI logo"
                className="h-11 w-11 rounded-2xl object-cover shadow-lg shadow-fuchsia-500/25"
              />
              <div>
                <p className="text-lg font-semibold tracking-tight">
                  FlowForge AI
                </p>
                <p className="text-xs text-slate-400">
                  AI Workflow Automation
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <Link to="/#services" className="transition hover:text-white">
                Services
              </Link>
              <Link to="/#process" className="transition hover:text-white">
                Process
              </Link>
              <Link to="/#contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>

            <a
              href="https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:brightness-110"
            >
              Book free audit
            </a>
          </nav>

          <div className="grid items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:border-fuchsia-300/40 hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to main site
              </Link>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-xl">
                <Sparkles size={16} />
                Live automation showcase
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                AI-powered lead qualification demo.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                See how FlowForge AI can capture incoming enquiries, analyse
                lead quality, identify customer pain points, update a CRM-style
                system, and prepare follow-up actions automatically.
              </p>

              <div className="mt-9 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                {["Capture", "Qualify", "Follow up"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="text-fuchsia-300" size={18} />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: MousePointerClick,
                    title: "Lead captured",
                    text: "A business enquiry is submitted through a clean form.",
                  },
                  {
                    icon: Target,
                    title: "AI scoring",
                    text: "The lead is analysed, scored, and prioritised.",
                  },
                  {
                    icon: Database,
                    title: "CRM updated",
                    text: "Lead details are stored in a structured system.",
                  },
                  {
                    icon: Mail,
                    title: "Summary sent",
                    text: "The team receives a clear lead summary by email.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                      <Icon size={20} />
                    </div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-2xl"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-fuchsia-300">
                      {currentSlide.eyebrow}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                      {currentSlide.title}
                    </h2>
                  </div>

                  <div className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 md:block">
                    {activeSlide + 1} / {slides.length}
                  </div>
                </div>

                <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                  {currentSlide.subtitle}
                </p>

                <div className="mt-8">
                  {currentSlide.type === "image" && "image" in currentSlide && (
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/40">
                      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-400" />
                          <div className="h-3 w-3 rounded-full bg-yellow-400" />
                          <div className="h-3 w-3 rounded-full bg-emerald-400" />
                        </div>
                        <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-200">
                          {currentSlide.tag}
                        </span>
                      </div>

                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        className="h-[420px] w-full object-cover object-top md:h-[500px]"
                      />
                    </div>
                  )}

                  {(currentSlide.type === "intro" ||
                    currentSlide.type === "value" ||
                    currentSlide.type === "cta") &&
                    "points" in currentSlide && (
                      <div className="grid gap-4 md:grid-cols-2">
                        {currentSlide.points.map((point, index) => (
                          <div
                            key={point}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                          >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                              {currentSlide.type === "intro" && (
                                <Zap size={19} />
                              )}
                              {currentSlide.type === "value" && (
                                <Clock size={19} />
                              )}
                              {currentSlide.type === "cta" && (
                                <Sparkles size={19} />
                              )}
                            </div>
                            <p className="text-sm font-semibold text-white">
                              {index + 1}. {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                  {currentSlide.type === "cta" && (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
                      >
                        Book a free audit <ArrowRight size={18} />
                      </a>

                      <Link
                        to="/#contact"
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-7 py-4 font-semibold text-white transition hover:border-fuchsia-300/40 hover:bg-white/[0.1]"
                      >
                        Send an enquiry
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={previousSlide}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-fuchsia-300/40 hover:bg-white/[0.1]"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 rounded-full transition ${
                          activeSlide === index
                            ? "w-8 bg-fuchsia-300"
                            : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-fuchsia-300/40 hover:bg-white/[0.1]"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-fuchsia-300">
                Why this matters
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Most businesses do not need more admin. They need smarter
                workflows.
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                This demo represents the kind of practical automation that can
                remove repetitive work from daily operations. The exact workflow
                can be adapted to CRMs, inboxes, spreadsheets, internal tools,
                and existing business processes.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Lead capture and routing",
                "AI-powered enquiry scoring",
                "CRM and spreadsheet updates",
                "Internal email notifications",
                "Follow-up email preparation",
                "Sales and admin workflow optimisation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <CheckCircle className="mt-0.5 text-fuchsia-300" size={19} />
                  <p className="text-sm font-medium leading-6 text-slate-200">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}