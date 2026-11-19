import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MobileActionBar, SiteFooter, SiteNav } from "../components/SiteChrome";
import { companyNumber, contactEmail, legalName, registeredOffice } from "../lib/site";

const updated = "19 November 2026";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-xl font-bold text-ink">{children}</h2>;
}

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy notice | FlowForge AI";
    window.scrollTo(0, 0);
    return () => {
      document.title = "FlowForge AI | Systems that win jobs and cut admin for trade businesses";
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <main className="px-4 py-14 md:px-6 md:py-20">
        <article className="mx-auto max-w-2xl leading-7 text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm !no-underline hover:text-ink">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink">
            Privacy notice
          </h1>
          <p className="text-sm">Last updated {updated}</p>

          <p>
            This notice explains what personal information FlowForge AI
            collects when you use this website or get in touch, why we collect
            it and what your rights are. We keep it short and only collect what
            we need.
          </p>

          <H>Who we are</H>
          <p>
            FlowForge AI is a trading name of {legalName}
            {companyNumber && <>, a company registered in England &amp; Wales (company no. {companyNumber})</>}
            {registeredOffice && <>, registered office {registeredOffice}</>}. We are the data
            controller for the information described here. You can contact us
            about anything in this notice at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>

          <H>What we collect</H>
          <ul>
            <li>
              <strong className="text-ink">Enquiry form:</strong> your name,
              email, business name, phone number (optional), trade, team size
              and the message you write.
            </li>
            <li>
              <strong className="text-ink">Booking a call:</strong> the details
              you enter on our booking page (name, email and any answers you
              give), which is provided by Calendly.
            </li>
            <li>
              <strong className="text-ink">Emails, calls and messages:</strong>{" "}
              whatever you choose to send us.
            </li>
            <li>
              <strong className="text-ink">Website usage:</strong> basic,
              anonymous information such as which pages are visited, if we use
              privacy-friendly analytics. We do not use advertising trackers.
            </li>
          </ul>
          <p>
            The growth calculator runs entirely in your browser. The figures
            you enter are not sent to us or stored.
          </p>

          <H>Why we use it</H>
          <p>
            We use your details to reply to your enquiry, arrange and hold your
            free systems review, prepare a proposal if you ask for one, and
            deliver and support any work we agree. Our lawful bases are taking
            steps at your request before entering into a contract, and our
            legitimate interest in responding to business enquiries. We will
            not add you to a mailing list or send marketing without your
            permission, and we never sell your data.
          </p>

          <H>Who we share it with</H>
          <p>
            We use a small number of trusted providers to run the website and
            our business, who process data on our behalf:
          </p>
          <ul>
            <li>Formspree, to receive enquiry form submissions</li>
            <li>Calendly, to book calls</li>
            <li>Vercel, to host this website</li>
            <li>Our email and productivity provider, to correspond with you</li>
          </ul>
          <p>
            Some of these providers may process data outside the UK. Where they
            do, they rely on recognised safeguards such as the UK International
            Data Transfer Agreement or adequacy regulations.
          </p>

          <H>How long we keep it</H>
          <p>
            If we don't go on to work together, we delete enquiry details
            within 12 months. If you become a client, we keep records for as
            long as we work together and then for up to six years, as required
            for tax and legal purposes.
          </p>

          <H>Your rights</H>
          <p>
            You can ask to see the personal information we hold about you, have
            it corrected or deleted, object to or restrict how we use it, or
            receive a copy to take elsewhere. Just email{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we'll
            respond within one month.
          </p>
          <p>
            If you're unhappy with how we've handled your data, please tell us
            first so we can put it right. You also have the right to complain
            to the Information Commissioner's Office at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>

          <H>Cookies</H>
          <p>
            This website does not set advertising or tracking cookies. Our
            booking page is hosted by Calendly, which may set its own cookies
            when you visit it.
          </p>
        </article>
      </main>
      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}
