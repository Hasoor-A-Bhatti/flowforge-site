/* ------------------------------------------------------------------ */
/* Business details: update these in one place.                        */
/* Anything left as an empty string is hidden on the site.             */
/* ------------------------------------------------------------------ */

export const calendlyLink =
  "https://calendly.com/hello-flowforge-ai/free-ai-workflow-audit";

export const formspreeEndpoint = "https://formspree.io/f/xqejjyjl";

export const contactEmail = "hello@flowforge-ai.co.uk";

/** Display format, e.g. "07xxx xxxxxx". Enables Call buttons when set. */
export const phoneDisplay = "";

/** Enables WhatsApp buttons when true (uses the phone number above). */
export const whatsappEnabled = false;

export const legalName = "FlowForge Systems Ltd";
/** Companies House number, e.g. "12345678". Required on the site by UK law. */
export const companyNumber = "";
/** Registered office address, one line. Required on the site by UK law. */
export const registeredOffice = "";

export const founder = {
  name: "Hasoor Bhatti",
  role: "Founder & lead engineer",
  location: "London",
  photo: "/hasoor-bhatti.jpg",
  linkedin: "https://www.linkedin.com/in/hasoor-bhatti",
};

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

/** Converts "07…" to international "447…" for tel: and wa.me links. */
const intl = phoneDisplay.replace(/\D/g, "").replace(/^0/, "44");

export const phoneHref = phoneDisplay ? `tel:+${intl}` : "";

export const whatsappHref =
  phoneDisplay && whatsappEnabled
    ? `https://wa.me/${intl}?text=${encodeURIComponent(
        "Hi Hasoor, I found FlowForge online and I'd like to chat about my business."
      )}`
    : "";

/**
 * Sends a conversion event to whichever analytics script is on the page
 * (Plausible or Google Analytics). Does nothing if neither is installed,
 * so it is safe to call before analytics is set up.
 */
export function track(event: string, props?: Record<string, string | number>) {
  try {
    const w = window as unknown as {
      plausible?: (e: string, o?: { props?: Record<string, string | number> }) => void;
      gtag?: (...args: unknown[]) => void;
    };
    w.plausible?.(event, props ? { props } : undefined);
    w.gtag?.("event", event, props);
  } catch {
    /* analytics must never break the page */
  }
}
