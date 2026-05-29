import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Workflow,
  FileText,
  MessageSquare,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  Building2,
  CalendarCheck,
  Mail,
  Phone,
  Target,
  BarChart3,
  Lock,
  Users,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    text: "Automate repetitive admin across emails, forms, CRMs, calendars, spreadsheets, and internal tools.",
  },
  {
    icon: Bot,
    title: "AI Business Assistants",
    text: "Deploy AI assistants that help teams answer questions, summarise documents, and complete routine tasks.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    text: "Extract, classify, summarise, and process information from PDFs, invoices, forms, and reports.",
  },
  {
    icon: MessageSquare,
    title: "Customer Support AI",
    text: "Build AI chat and response systems that handle common queries and route high-value enquiries.",
  },
];

const industries = [
  "Recruitment firms",
  "Clinics & healthcare admin",
  "Accountants",
  "Estate agencies",
  "Legal firms",
  "Service-based SMEs",
];

const outcomes = [
  {
    icon: Clock,
    title: "Save admin hours",
    text: "Reduce manual work across enquiries, documents, scheduling, follow-ups, and reporting.",
  },
  {
    icon: Target,
    title: "Capture more leads",
    text: "Respond faster, qualify enquiries automatically, and reduce missed opportunities.",
  },
  {
    icon: BarChart3,
    title: "Improve operations",
    text: "Create smoother processes that are easier to track, manage, and improve over time.",
  },
];

const process = [
  {
    step: "01",
    title: "Workflow Audit",
    text: "We review your current processes, admin bottlenecks, tools, and repetitive manual tasks.",
  },
  {
    step: "02",
    title: "Automation Strategy",
    text: "We design a clear AI automation plan focused on saving time, improving reliability, and reducing friction.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    text: "We build and connect the systems around your existing tools, workflows, and team needs.",
  },
  {
    step: "04",
    title: "Support & Optimise",
    text: "We refine, monitor, and improve your automation systems so they stay useful as your business grows.",
  },
];

const demos = [
  {
    label: "Demo coming soon",
    title: "AI Lead Qualification System",
    text: "Captures enquiries, scores urgency, updates CRM records, and sends instant follow-ups.",
  },
  {
    label: "Demo coming soon",
    title: "Document Processing Workflow",
    text: "Extracts key data from PDFs, invoices, and forms before routing information to the right place.",
  },
  {
    label: "Demo coming soon",
    title: "Internal Knowledge Assistant",
    text: "Lets teams search policies, SOPs, and company documents through a simple AI interface.",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Practical, not gimmicky",
    text: "AI is only used where it creates clear operational value.",
  },
  {
    icon: Lock,
    title: "Built with care",
    text: "Systems are designed with reliability, maintainability, and sensible data handling in mind.",
  },
  {
    icon: Users,
    title: "SME-friendly",
    text: "Clear communication, lean implementation, and solutions that do not overwhelm your team.",
  },
];

export default function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/xqejjyjl", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setFormStatus("success");
      form.reset();

      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    } else {
      setFormStatus("error");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a] text-white">
      <section className="relative px-6 py-8 md:px-12 lg:px-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.28),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.16),transparent_40%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-fuchsia-500/5 backdrop-blur-2xl md:px-5">
            <div className="flex items-center gap-3">
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
                  by FlowForge Systems Ltd
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
              <a
                href="#services"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Services
              </a>
              <a
                href="#demos"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Demos
              </a>
              <a
                href="https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:brightness-110"
              >
                Book a Free Automation Audit
              </a>
            </div>
          </nav>

          <div className="grid items-center gap-16 py-20 lg:grid-cols-2 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-xl">
                <Sparkles size={16} /> Premium AI workflow automation for UK
                SMEs
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Automating the work that slows businesses down.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                FlowForge AI helps ambitious UK businesses streamline
                operations, eliminate repetitive admin, and implement premium
                AI-powered systems without adding complexity.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:brightness-110"
                >
                  Get a free automation audit <ArrowRight size={18} />
                </a>
                <a
                  href="#demos"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-fuchsia-300/40 hover:bg-white/10"
                >
                  View demo concepts
                </a>
              </div>

              <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                {["Save admin hours", "Improve workflows", "Respond faster"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="text-fuchsia-300" size={18} />{" "}
                      {item}
                    </div>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-2xl"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Example automation
                    </p>
                    <p className="text-xl font-semibold">
                      Lead handling workflow
                    </p>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                    Live preview
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    [
                      "New enquiry received",
                      "Website form, email, or chatbot captures the lead.",
                    ],
                    [
                      "AI qualifies the request",
                      "Urgency, budget, and service need are identified automatically.",
                    ],
                    [
                      "CRM is updated",
                      "The lead is added to the right pipeline with notes and priority.",
                    ],
                    [
                      "Follow-up is sent",
                      "A personalised response is sent instantly to reduce lost opportunities.",
                    ],
                  ].map(([title, body], index) => (
                    <div
                      key={title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/15 text-sm font-bold text-fuchsia-200">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <Icon className="text-fuchsia-200" size={24} />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold text-fuchsia-300">What we do</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Premium AI systems designed for modern business operations.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We help SMEs operate with the speed, structure, and efficiency of
              much larger companies through practical AI-powered automation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-fuchsia-500/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-semibold text-fuchsia-300">Who we help</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Built for SMEs with busy teams and manual admin pressure.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                We work best with service-based businesses where time, speed,
                organisation, and customer response matter.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl"
                >
                  <Building2 className="text-fuchsia-200" size={20} />
                  <span className="font-medium text-slate-200">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:p-12 lg:grid-cols-3">
          <div>
            <p className="font-semibold text-fuchsia-300">Business outcomes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Modern businesses do not need more software. They need smarter
              systems.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:col-span-2">
            {outcomes.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-black/40 p-6">
                <Icon className="text-fuchsia-200" size={26} />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demos" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-semibold text-fuchsia-300">Demo concepts</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Real systems you will soon be able to see in action.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Use these as placeholder portfolio items until your first demos
                are ready. Replace them later with real videos, screenshots, or
                case studies.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {demos.map((demo) => (
              <div
                key={demo.title}
                className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/10"
              >
                <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">
                  {demo.label}
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{demo.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{demo.text}</p>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-200">
                  Add demo later{" "}
                  <ChevronRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-semibold text-fuchsia-300">How it works</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              A simple path from messy workflow to automated system.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, text }) => (
              <div
                key={step}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl"
              >
                <p className="text-sm font-bold text-fuchsia-200">{step}</p>
                <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-blue-600 p-8 shadow-2xl shadow-fuchsia-500/20 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_35%)]" />
            <div className="relative">
              <p className="font-semibold text-fuchsia-50">
                Free workflow audit
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Find out what your business could automate.
              </h2>
              <p className="mt-5 text-lg leading-8 text-fuchsia-50/90">
                Tell us about your current admin bottlenecks and we’ll identify
                practical AI automation opportunities.
              </p>
              <div className="mt-8 space-y-4 text-sm text-fuchsia-50/90">
                <div className="flex items-center gap-3">
                  <CalendarCheck size={18} /> No-pressure discovery
                  conversation
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} /> Clear recommendations, not
                  technical jargon
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} /> Suitable for SMEs exploring
                  automation
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl md:p-8"
          >
            <div className="mb-6">
              <p className="text-sm font-semibold text-fuchsia-300">
                Prefer to message first?
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Tell us what you’d like to automate.
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Not ready to book a call yet? Send a quick enquiry and we’ll get
                back to you with practical next steps.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Name</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                  placeholder="Your name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Company
                </span>
                <input
                  name="company"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                  placeholder="Company name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Phone
                </span>
                <input
                  name="phone"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                  placeholder="Optional"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-slate-300">
                What would you like help with?
              </span>
              <textarea
                name="message"
                required
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                placeholder="Example: we spend too much time chasing leads, processing invoices, replying to emails, updating spreadsheets..."
              />
            </label>

            <input
              type="hidden"
              name="_subject"
              value="New FlowForge AI website enquiry"
            />

            {formStatus === "success" && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                Enquiry sent successfully. We’ll get back to you soon.
              </div>
            )}

            {formStatus === "error" && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
                Something went wrong. Please try again or email
                hello@flowforge-ai.co.uk.
              </div>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
            >
              Send enquiry <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Prefer a call? Use the free audit booking link above.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-slate-500 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-300">FlowForge AI</p>
            <p className="mt-2">
              FlowForge Systems Ltd trading as FlowForge AI.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-300">Contact</p>
            <div className="mt-2 space-y-2">
              <p className="flex items-center gap-2">
                <Mail size={14} /> hello@flowforge-ai.co.uk
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> Add business phone later
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-300">Company</p>
            <p className="mt-2">AI workflow automation for UK SMEs.</p>
            <p className="mt-2">Company number: add once approved.</p>
            <p className="mt-2">Privacy Policy: coming soon.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}