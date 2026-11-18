import { useEffect, useId, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Info } from "lucide-react";
import {
  applyTrade,
  compute,
  gbp,
  maxExtra,
  tradePresets,
  type SimState,
  type TradeKey,
} from "../lib/growthModel";

/* ------------------------------------------------------------------ */
/* Formatting & small pieces                                           */
/* ------------------------------------------------------------------ */

const gbpCompact = (n: number) =>
  n === 0
    ? "£0"
    : "£" +
      new Intl.NumberFormat("en-GB", {
        notation: "compact",
        maximumFractionDigits: n >= 1_000_000 ? 1 : 0,
      }).format(n);

/** Smoothly tweens a number when it changes (instant for reduced-motion users). */
export function AnimatedNumber({
  value,
  format = gbp,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(value);
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    last.current = value;
    return () => controls.stop();
  }, [value, format, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

function Range({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
  emphasis = false,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  display: string;
  emphasis?: boolean;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className={`text-sm font-medium ${emphasis ? "text-ink" : "text-ink"}`}>
          {label}
        </label>
        <span
          className={`font-display font-bold tabular-nums ${
            emphasis ? "text-2xl text-accent" : "text-lg"
          }`}
        >
          {display}
        </span>
      </div>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`ff-range mt-3 ${emphasis ? "ff-range-lg" : ""}`}
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}

function TradePicker({
  value,
  onChange,
  compact = false,
}: {
  value: TradeKey;
  onChange: (t: TradeKey) => void;
  compact?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label="Your trade" className="flex flex-wrap gap-2">
      {(Object.keys(tradePresets) as TradeKey[]).map((k) => {
        const active = k === value;
        return (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(k)}
            className={`rounded-full border font-medium transition ${
              compact ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
            } ${
              active
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink hover:border-ink/40"
            }`}
          >
            {tradePresets[k].label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero quick estimate                                                 */
/* ------------------------------------------------------------------ */

export function QuickEstimate({
  sim,
  setSim,
}: {
  sim: SimState;
  setSim: React.Dispatch<React.SetStateAction<SimState>>;
}) {
  const r = compute(sim);
  const max = maxExtra(sim.jobs);

  return (
    <div className="rounded-2xl border border-line bg-card p-6 shadow-[0_30px_70px_-30px_rgba(14,26,36,0.35)] md:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Quick estimate
        </p>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
          Try it
        </span>
      </div>

      <p className="mt-4 text-sm font-medium">What's your trade?</p>
      <div className="mt-2">
        <TradePicker compact value={sim.trade} onChange={(t) => setSim((p) => applyTrade(t, p))} />
      </div>

      <div className="mt-6">
        <Range
          emphasis
          label="Extra jobs won per month"
          hint={`From ${sim.jobs} to ${sim.jobs + r.extraJobs} jobs a month (+${Math.round(r.growthPct)}%)`}
          value={r.extraJobs}
          min={0}
          max={max}
          onChange={(v) => setSim((p) => ({ ...p, extraJobs: v }))}
          display={`+${r.extraJobs}`}
        />
      </div>

      <div className="mt-6 rounded-xl bg-ink p-5 text-white">
        <p className="text-sm text-slate-300">Extra revenue in your first year</p>
        <AnimatedNumber
          value={r.yearOneExtra}
          className="mt-1 block font-display text-4xl font-extrabold tracking-tight tabular-nums md:text-5xl"
        />
        <p className="mt-2 text-sm text-slate-300">
          then <span className="font-semibold text-white">{gbp(r.extraMonthly)}</span> every
          month after that
        </p>
      </div>

      <a
        href="#simulator"
        className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
      >
        See the full breakdown <ArrowDown size={16} />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Extra revenue banked: a single cumulative area                      */
/* ------------------------------------------------------------------ */

const C_EXTRA = "#5b3fd8";

/** Round axis steps (1, 2, 2.5 or 5 × 10ⁿ) so labels read cleanly. */
function niceScale(max: number, count = 4) {
  if (max <= 0) return { top: 1, step: 0.25 };
  const rough = max / count;
  const exp = Math.pow(10, Math.floor(Math.log10(rough)));
  const f = rough / exp;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp;
  return { top: Math.ceil(max / step) * step, step };
}

type Series = ReturnType<typeof compute>["series"];

function ExtraRevenueChart({ series }: { series: Series }) {
  const [hover, setHover] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pts = series.map((d, i) => ({
    m: d.m,
    total: d.withFf - d.base,
    month: i === 0 ? 0 : d.withFf - d.base - (series[i - 1].withFf - series[i - 1].base),
  }));
  const H = W < 480 ? 220 : 260;
  const pad = { l: 46, r: 12, t: 24, b: 32 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const last = pts[pts.length - 1];
  const { top: yMax, step } = niceScale(last.total);
  const x = (m: number) => pad.l + (m / 12) * iw;
  const y = (v: number) => pad.t + ih - (v / yMax) * ih;

  const line = pts.map((d) => `${x(d.m)},${y(d.total)}`).join(" ");
  const area = `${x(0)},${y(0)} ${line} ${x(12)},${y(0)}`;
  const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => i * step);
  const xTicks = W < 480 ? [0, 6, 12] : [0, 3, 6, 9, 12];
  const h = hover !== null && hover > 0 ? pts[hover] : null;

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const f = (e.clientX - rect.left) / rect.width;
    setHover(Math.max(0, Math.min(12, Math.round(f * 12))));
  }

  return (
    <div ref={boxRef} className="relative">
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-pan-y"
        role="img"
        aria-label={`Extra revenue building up over 12 months, reaching ${gbp(last.total)}`}
      >
        <defs>
          <linearGradient id="ff-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={C_EXTRA} stopOpacity={0.22} />
            <stop offset="100%" stopColor={C_EXTRA} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={pad.l + iw} y1={y(t)} y2={y(t)} stroke="#e8e5dd" strokeWidth={1} />
            <text x={pad.l - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular-nums">
              {gbpCompact(t)}
            </text>
          </g>
        ))}
        {xTicks.map((m) => (
          <text key={m} x={x(m)} y={H - 10} textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"} className="fill-muted text-[11px]">
            {m === 0 ? "Today" : `Month ${m}`}
          </text>
        ))}

        <polygon points={area} fill="url(#ff-area)" />
        <polyline points={line} fill="none" stroke={C_EXTRA} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* end label */}
        <circle cx={x(12)} cy={y(last.total)} r={5} fill={C_EXTRA} stroke="#fff" strokeWidth={2} />
        <text x={x(12) - 10} y={y(last.total) - 12} textAnchor="end" className="fill-ink text-[12px] font-semibold tabular-nums">
          {gbp(last.total)}
        </text>

        {h && (
          <g pointerEvents="none">
            <line x1={x(h.m)} x2={x(h.m)} y1={pad.t} y2={pad.t + ih} stroke="#0e1a24" strokeOpacity={0.25} strokeWidth={1} />
            <circle cx={x(h.m)} cy={y(h.total)} r={5} fill={C_EXTRA} stroke="#fff" strokeWidth={2} />
          </g>
        )}

        <rect
          x={pad.l}
          y={pad.t}
          width={iw}
          height={ih}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>

      {h && (
        <div
          className="pointer-events-none absolute top-0 z-10 w-52 rounded-lg border border-line bg-white p-3 text-xs shadow-lg"
          style={{
            left: `${(x(h.m) / W) * 100}%`,
            transform: h.m > 6 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
          }}
        >
          <p className="font-semibold">Month {h.m}</p>
          <p className="mt-2 flex justify-between gap-2">
            <span className="text-muted">Extra that month</span>
            <span className="font-semibold tabular-nums">+{gbp(h.month)}</span>
          </p>
          <p className="mt-1.5 flex justify-between gap-2 border-t border-line pt-1.5">
            <span className="text-muted">Running total</span>
            <span className="font-semibold text-accent tabular-nums">+{gbp(h.total)}</span>
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full simulator                                                      */
/* ------------------------------------------------------------------ */

const sources = [
  { label: "Faster replies to new enquiries", share: 0.45 },
  { label: "Every quote followed up", share: 0.35 },
  { label: "More reviews & repeat customers", share: 0.2 },
];

export function GrowthSimulator({
  sim,
  setSim,
}: {
  sim: SimState;
  setSim: React.Dispatch<React.SetStateAction<SimState>>;
}) {
  const r = compute(sim);
  const set = (k: keyof SimState) => (v: number) => setSim((p) => ({ ...p, [k]: v }));

  // Split extra jobs into whole numbers that always add up.
  const split = sources.map((s) => Math.floor(r.extraJobs * s.share));
  split[0] += r.extraJobs - split.reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_70px_-40px_rgba(14,26,36,0.35)]">
      <div className="grid lg:grid-cols-[380px_1fr]">
        {/* Inputs */}
        <div className="space-y-7 border-b border-line p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-sm font-medium">Your trade</p>
            <p className="mt-0.5 text-xs text-muted">Sets typical starting figures. Adjust them to match you.</p>
            <div className="mt-3">
              <TradePicker value={sim.trade} onChange={(t) => setSim((p) => applyTrade(t, p))} />
            </div>
          </div>

          <div className="space-y-6 border-t border-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Your business today</p>
            <Range label="Jobs per month" value={sim.jobs} min={2} max={300} onChange={set("jobs")} display={String(sim.jobs)} />
            <Range label="Average job value" value={sim.value} min={50} max={15000} step={50} onChange={set("value")} display={gbp(sim.value)} />
            <Range label="Profit margin" value={sim.margin} min={5} max={70} onChange={set("margin")} display={`${sim.margin}%`} />
            <Range label="Hours a week on admin" value={sim.adminHours} min={0} max={50} onChange={set("adminHours")} display={`${sim.adminHours} hrs`} />
          </div>

          <div className="rounded-xl border border-accent/25 bg-accent-soft/60 p-5">
            <Range
              emphasis
              label="Extra jobs won per month"
              hint={`+${Math.round(r.growthPct)}% on today: ${sim.jobs} → ${sim.jobs + r.extraJobs} jobs`}
              value={r.extraJobs}
              min={0}
              max={maxExtra(sim.jobs)}
              onChange={set("extraJobs")}
              display={`+${r.extraJobs}`}
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-sm text-muted">Extra revenue, first 12 months</p>
              <AnimatedNumber
                value={r.yearOneExtra}
                className="mt-1 block font-display text-5xl font-extrabold tracking-tight tabular-nums md:text-6xl"
              />
              <p className="mt-2 text-sm text-muted">
                Rising to <span className="font-semibold text-ink">{gbp(r.extraMonthly * 12)}</span> a year once fully up and running
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-line bg-line text-sm">
              {[
                { k: "Extra profit", v: <AnimatedNumber value={r.yearOneProfit} /> },
                { k: "Extra jobs", v: <AnimatedNumber value={r.extraJobsYear} format={(n) => Math.round(n).toString()} /> },
                { k: "Admin hours back", v: <AnimatedNumber value={r.hoursBack} format={(n) => `${Math.round(n)} hrs`} /> },
                { k: "Working days back", v: <AnimatedNumber value={r.daysBack} format={(n) => `${Math.round(n)} days`} /> },
              ].map((s) => (
                <div key={s.k} className="bg-white p-3.5">
                  <dt className="text-xs text-muted">{s.k}</dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold">Extra revenue banked over 12 months</p>
              <p className="text-xs text-muted">Hover or tap the chart for each month</p>
            </div>
            <div className="mt-3">
              <ExtraRevenueChart series={r.series} />
            </div>
            <details className="mt-1 text-xs text-muted">
              <summary className="cursor-pointer select-none font-medium hover:text-ink">Show the numbers as a table</summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left tabular-nums">
                  <thead>
                    <tr className="border-b border-line text-ink">
                      <th className="py-1.5 font-semibold">Month</th>
                      <th className="py-1.5 font-semibold">Revenue as things are</th>
                      <th className="py-1.5 font-semibold">With FlowForge</th>
                      <th className="py-1.5 font-semibold">Extra, running total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.series.slice(1).map((d, i) => (
                      <tr key={d.m} className="border-b border-line/70">
                        <td className="py-1.5">{d.m}</td>
                        <td className="py-1.5">{gbp(d.base - r.series[i].base)}</td>
                        <td className="py-1.5">{gbp(d.withFf - r.series[i].withFf)}</td>
                        <td className="py-1.5">+{gbp(d.withFf - d.base)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm font-semibold">Where the extra jobs typically come from</p>
            <ul className="mt-4 space-y-3">
              {sources.map((s, i) => (
                <li key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[220px_1fr_auto]">
                  <span className="text-sm text-ink">{s.label}</span>
                  <span className="order-3 col-span-2 h-2 overflow-hidden rounded-full bg-paper sm:order-none sm:col-span-1">
                    <span
                      className="block h-full rounded-full bg-accent transition-[width] duration-500"
                      style={{ width: `${s.share * 100}%` }}
                    />
                  </span>
                  <span className="text-right text-sm font-semibold tabular-nums">+{split[i]} / mo</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-2 text-xs leading-5 text-muted">
              <Info size={14} className="mt-0.5 shrink-0" />
              An illustration, not a promise. It assumes results build over the
              first three months and admin time drops by 40%. Your free review
              gives you figures based on your real numbers.
            </p>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-2"
            >
              Get your real figures <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
