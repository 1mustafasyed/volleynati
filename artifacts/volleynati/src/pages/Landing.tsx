import { Link } from "wouter";
import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A16]">
      <HamburgerMenu />

      {/* Hero — hierarchy: title → what it is → why it matters → CTAs */}
      <div className="px-5 pt-7 pb-6 max-w-2xl mx-auto">
        {/* H1 — biggest, first */}
        <h1
          className="text-[72px] leading-[0.9] mb-4"
          style={{ fontFamily: "inherit" }}
        >
          VOLLEY
          <br />
          <span style={{ color: "#8C7355" }}>NATI</span>
          <br />
          <span className="text-[48px]">2026</span>
        </h1>

        {/* What it is — second */}
        <p
          className="text-base leading-relaxed mb-2"
          style={{ color: "#4A3728" }}
        >
          Raleigh&apos;s annual community volleyball tournament.
        </p>
        {/* Why it matters — third, lighter */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#8C7355" }}
        >
          100% volunteer-powered · Est. 2023
        </p>

        <div className="w-8 h-px mb-6" style={{ backgroundColor: "#C8BFA8" }} />

        {/* CTAs — after context is established */}
        <div className="flex flex-col gap-3 mb-8">
          <a
            href="https://luma.com/wub3mkrk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-base py-4 tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#4A3728", color: "#F5F0E8" }}
          >
            REGISTER YOUR TEAM
          </a>
          <a
            href="https://luma.com/h8ukw6a4"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-base py-4 tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
            style={{ border: "1px solid #C8BFA8", color: "#4A3728" }}
          >
            GET TICKETS
          </a>
        </div>
      </div>

      {/* Flyer — visual proof after CTAs */}
      <div className="px-5 pb-6 max-w-2xl mx-auto">
        <img
          src="/landing/Volleynati2026flyer.png"
          alt="Volleynati 2026 event flyer"
          className="w-full rounded-lg"
          style={{ filter: "sepia(8%) saturate(90%)" }}
        />
      </div>

      {/* Charity copy + donate */}
      <div className="px-5 py-6 max-w-2xl mx-auto" style={{ borderTop: "1px solid #C8BFA8" }}>
        <p className="text-base leading-relaxed mb-4" style={{ color: "#4A3728" }}>
          Support Volleynati and help us bring the community together for a meaningful cause.
        </p>
        <p className="text-base leading-relaxed mb-6" style={{ color: "#4A3728" }}>
          This year, we are teaming up with Note in the Pocket, a Triangle-based nonprofit
          providing clothing to children and families experiencing financial hardship or
          homelessness. Every donation helps support the event and increase the impact we
          can make for those in need.
        </p>
        <a
          href="https://www.zeffy.com/en-US/donation-form/volleynati-charity-event"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-base py-4 tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#4A3728", color: "#F5F0E8" }}
        >
          DONATE
        </a>
      </div>

      {/* Key dates — scannable rows */}
      <div
        className="px-5 py-5 max-w-2xl mx-auto"
        style={{ backgroundColor: "#EDE5D4" }}
      >
        <p
          className="text-[10px] tracking-[0.2em] mb-4"
          style={{ color: "#8C7355" }}
        >
          KEY DATES
        </p>
        <div className="space-y-3">
          {[
            { label: "Registration Opens", value: "June 10" },
            { label: "Registration Closes", value: "June 24" },
            { label: "Tournament Day", value: "Aug 8" },
          ].map((d) => (
            <div
              key={d.label}
              className="flex justify-between items-baseline pb-3 last:pb-0"
              style={{ borderBottom: "1px solid #C8BFA8" }}
            >
              <span className="text-sm" style={{ color: "#4A3728" }}>
                {d.label}
              </span>
              <span className="text-base" style={{ color: "#1C1A16" }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Body copy */}
      <div className="px-5 pt-8 pb-6 max-w-2xl mx-auto">
        <p
          className="text-base leading-relaxed"
          style={{ color: "#4A3728" }}
        >
          Today, Volleynati has become a staple in Raleigh&apos;s culture. A
          tradition that unites people every summer around community,
          generosity, and unforgettable memories.
        </p>
      </div>

      {/* Action shot */}
      <div className="px-5 pb-8 max-w-2xl mx-auto">
        <img
          src="/landing/action-shot.jpg"
          alt="Volleynati player reaching for the ball at the net"
          className="w-full rounded-lg"
          style={{ filter: "sepia(10%) saturate(85%)" }}
        />
      </div>

      {/* Bottom nav links */}
      <BottomNav />

      {/* Footer */}
      <footer
        className="py-6 px-5 border-t text-center"
        style={{ borderColor: "#C8BFA8", backgroundColor: "#EDE5D4" }}
      >
        <p
          className="text-xs tracking-[0.12em] mb-4"
          style={{ color: "#8C7355" }}
        >
          © VOLLEYNATI 2026
        </p>
        <a
          href="https://www.instagram.com/volleynati"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-2 rounded-full transition-colors"
          style={{ backgroundColor: "#C8BFA8" }}
        >
          <svg
            className="w-4 h-4"
            style={{ color: "#4A3728" }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
