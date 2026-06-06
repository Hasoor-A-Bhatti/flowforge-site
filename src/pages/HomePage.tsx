import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Gauge,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

type ContactForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  message: string;
};

const calendlyLink =
  "https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit";

const formspreeEndpoint = "https://formspree.io/f/xqejjyjl";

export default function HomePage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        message: "",
      });

      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error(error);
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
              <a href="#services" className="transition hover:text-white">
                Services
              </a>
              <a href="#demos" className="transition hover:text-white">
                Demos
              </a>
              <a href="#why-us" className="transition hover:text-white">
                Why us
              </a>
              <a href="#process" className="transition hover:text-white">
                Process
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </div>

            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:brightness-110"
            >
              Book free audit
            </a>
          </nav>

          <div className="grid items-center gap-16 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-xl">
                <Sparkles size={16} />
                AI workflow automation for ambitious UK SMEs
              </div>

              <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Automate the work slowing your business down.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                FlowForge AI designs practical automation systems that remove
                repetitive admin, connect business tools, qualify leads, prepare
                follow-ups, and help teams scale with less manual work.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
                >
                  Book a free audit <ArrowRight size={18} />
                </a>

                <a
                  href="#demos"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-fuchsia-300/40 hover:bg-white/[0.1]"
                >
                  View demos
                </a>
              </div>

              <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                {[
                  "No generic templates",
                  "Built around your workflow",
                  "Designed to save real time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="text-fuchsia-300" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-2xl"
            >
              <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-fuchsia-300">
                      Workflow snapshot
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight">
                      From enquiry to action.
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Live-ready
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: MousePointerClick,
                      title: "Lead captured",
                      text: "A customer enquiry enters your workflow.",
                    },
                    {
                      icon: BrainCircuit,
                      title: "AI qualifies",
                      text: "The lead is analysed, scored, and prioritised.",
                    },
                    {
                      icon: Database,
                      title: "CRM updated",
                      text: "Data is stored in a structured system.",
                    },
                    {
                      icon: Mail,
                      title: "Follow-up prepared",
                      text: "Your team receives a clear next action.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/demo/lead-qualification"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
                >
                  View lead qualification demo <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-fuchsia-300">Services</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Practical AI systems built around real business operations.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              FlowForge AI focuses on automations that make a measurable
              operational difference — not vague AI experiments.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Workflow,
                title: "Workflow Automation",
                text: "Automate repetitive tasks across forms, spreadsheets, CRMs, inboxes, calendars, and internal systems.",
              },
              {
                icon: Bot,
                title: "AI Assistants",
                text: "Build AI-powered assistants for lead handling, customer communication, admin support, and internal knowledge workflows.",
              },
              {
                icon: Database,
                title: "CRM & Data Workflows",
                text: "Capture, clean, organise, and route business data so teams can act faster and make better decisions.",
              },
              {
                icon: MessageSquare,
                title: "Email & Follow-up Systems",
                text: "Generate draft replies, automate follow-ups, notify teams, and reduce manual communication bottlenecks.",
              },
              {
                icon: Gauge,
                title: "Process Optimisation",
                text: "Map existing workflows, identify friction points, and redesign processes around automation opportunities.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Implementation",
                text: "Design automations with privacy, data minimisation, and trusted platforms in mind from the start.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:bg-white/[0.075]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demos" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-fuchsia-300">
                Demo projects
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                See what FlowForge AI can build.
              </h2>
              <p className="mt-5 leading-8 text-slate-400">
                These demos show practical examples of how automation can
                transform common business workflows.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-fuchsia-300/20 bg-black/40 p-7 shadow-2xl shadow-fuchsia-500/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                <Target size={22} />
              </div>

              <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Available now
              </div>

              <h3 className="text-2xl font-bold">AI Lead Qualification</h3>
              <p className="mt-4 leading-7 text-slate-400">
                Captures new enquiries, analyses lead quality, scores priority,
                updates a CRM-style system, and prepares follow-up actions.
              </p>

              <Link
                to="/demo/lead-qualification"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:brightness-110"
              >
                View demo <ArrowRight size={16} />
              </Link>
            </div>

            {[
              {
                icon: FileText,
                title: "Document Processing",
                text: "Extracts information from forms, documents, or emails and organises it into structured systems.",
              },
              {
                icon: CalendarCheck,
                title: "Appointment Workflow",
                text: "Automates booking, reminders, internal notifications, and follow-up communication.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-black/30 p-7 opacity-90"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-slate-300">
                  <Icon size={22} />
                </div>

                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
                  Coming Soon
                </div>

                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{text}</p>

                <button className="mt-7 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-400">
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-fuchsia-300">
                Why choose FlowForge AI
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Built around your business — not forced into a template.
              </h2>
              <p className="mt-5 leading-8 text-slate-400">
                Many automation providers sell generic systems. FlowForge AI is
                different. We focus on understanding how your business actually
                operates, then design tailored AI workflows that support your
                goals, tools, team, and growth stage.
              </p>

              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
              >
                Book a free workflow audit <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: "Tailored to your workflow",
                  text: "Every solution starts with your existing process, not a prebuilt template. We identify where automation will genuinely save time.",
                },
                {
                  icon: Layers,
                  title: "End-to-end implementation",
                  text: "From discovery and workflow mapping to build, testing, launch, and optimisation — we support the full process.",
                },
                {
                  icon: BrainCircuit,
                  title: "Practical AI, not hype",
                  text: "We focus on AI that creates operational value: lead scoring, summaries, follow-ups, data handling, and admin reduction.",
                },
                {
                  icon: Clock,
                  title: "Built to save time",
                  text: "The goal is simple: reduce repetitive work so teams can focus on higher-value conversations, decisions, and growth.",
                },
                {
                  icon: ShieldCheck,
                  title: "Security-minded approach",
                  text: "We design workflows with sensible data handling, privacy, and trusted platforms in mind from the beginning.",
                },
                {
                  icon: Rocket,
                  title: "Scalable systems",
                  text: "Your workflow should not break as you grow. We build systems that can evolve with more leads, more tools, and more complexity.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:bg-white/[0.075]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-fuchsia-300">Process</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              From workflow audit to working automation.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              We keep the process clear, collaborative, and focused on the
              outcome your business needs.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Audit",
                text: "We review your current workflow, repetitive admin, tools, bottlenecks, and business goals.",
              },
              {
                step: "02",
                title: "Design",
                text: "We map the ideal automation flow and decide what should be automated, connected, or AI-assisted.",
              },
              {
                step: "03",
                title: "Build",
                text: "We implement the workflow using the right mix of automation platforms, AI tools, and integrations.",
              },
              {
                step: "04",
                title: "Optimise",
                text: "We test, refine, and improve the system so it becomes reliable, useful, and scalable.",
              },
            ].map(({ step, title, text }) => (
              <div
                key={step}
                className="rounded-[2rem] border border-white/10 bg-black/30 p-6"
              >
                <p className="text-sm font-semibold text-fuchsia-300">
                  {step}
                </p>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-fuchsia-300">Contact</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to explore where AI can save your business time?
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Book a free workflow audit or send an enquiry. We’ll look at your
              current process, identify automation opportunities, and suggest
              practical next steps.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110"
              >
                Book free audit <ArrowRight size={18} />
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={17} className="text-fuchsia-300" />
                hello@flowforge-ai.co.uk
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Privacy-conscious by design
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    We focus on using only the data needed for each workflow and
                    build using trusted tools and sensible data handling
                    principles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Name
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
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
                  value={formData.company}
                  onChange={handleChange}
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                  placeholder="Optional"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-slate-300">
                What best describes what you need?
              </span>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300/50"
              >
                <option value="">Select an option</option>
                <option value="I know exactly what I want automated">
                  I know exactly what I want automated
                </option>
                <option value="I have repetitive admin but need guidance">
                  I have repetitive admin but need guidance
                </option>
                <option value="I want to explore AI for my business">
                  I want to explore AI for my business
                </option>
                <option value="I want a custom workflow audit">
                  I want a custom workflow audit
                </option>
              </select>
            </label>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-slate-300">
                What would you like to automate?
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-300/50"
                placeholder="Example: lead follow-ups, invoice processing, admin emails, appointment reminders, CRM updates..."
              />
            </label>

            {formStatus === "success" && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                Your enquiry has been submitted successfully. We’ll be in touch
                shortly.
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
              disabled={formStatus === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formStatus === "submitting"
                ? "Submitting..."
                : "Request free audit"}
              <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              FlowForge AI is a trading name of FlowForge Systems Ltd.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FlowForge AI. All rights reserved.</p>
          <p>Operated by FlowForge Systems Ltd.</p>
        </div>
      </footer>
    </main>
  );
}