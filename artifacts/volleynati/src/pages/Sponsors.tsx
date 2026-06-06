import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A16] flex flex-col">
      <HamburgerMenu />

      {/* Page title */}
      <div className="px-5 pt-7 pb-5 max-w-2xl mx-auto w-full">
        <p
          className="text-[10px] tracking-[0.2em] mb-3"
          style={{ color: "#8C7355" }}
        >
          SUPPORT
        </p>
        <h1
          className="text-[56px] leading-[0.9] mb-4"
          style={{ color: "#1C1A16" }}
        >
          OUR
          <br />
          <span style={{ color: "#8C7355" }}>SPONSORS</span>
        </h1>
        <div className="w-8 h-px mb-5" style={{ backgroundColor: "#C8BFA8" }} />
        <p className="text-base leading-relaxed" style={{ color: "#4A3728" }}>
          Support Volleynati 2026 and get exclusive benefits while helping us
          create an unforgettable tournament experience for Raleigh&apos;s
          community.
        </p>
      </div>

      {/* Why sponsor */}
      <div
        className="px-5 py-6 max-w-2xl mx-auto w-full"
        style={{ backgroundColor: "#EDE5D4" }}
      >
        <p
          className="text-[10px] tracking-[0.2em] mb-4"
          style={{ color: "#8C7355" }}
        >
          WHY SPONSOR
        </p>
        <div className="space-y-4">
          {[
            {
              heading: "Community reach",
              body: "Hundreds of players, families, and spectators attend each year — your brand in front of Raleigh's most engaged community.",
            },
            {
              heading: "Media coverage",
              body: "Extensive photo, video, and social media coverage capturing every moment of the event.",
            },
            {
              heading: "Meaningful impact",
              body: "100% volunteer-powered. Every dollar raised supports humanitarian aid, food, and water for those who need it most.",
            },
          ].map((item) => (
            <div
              key={item.heading}
              className="pb-4 last:pb-0"
              style={{ borderBottom: "1px solid #C8BFA8" }}
            >
              <p className="text-sm mb-1" style={{ color: "#1C1A16" }}>
                {item.heading}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8C7355" }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-8 max-w-2xl mx-auto w-full">
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "#4A3728" }}
        >
          Interested in partnering with us? Fill out the form and our team will
          be in touch.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfubS9XdoF7oDKY9Ui5IKCn_ogAlLbfCLa-6wPm11VIgllQIw/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-base py-4 tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#4A3728", color: "#F5F0E8" }}
        >
          BECOME A SPONSOR
        </a>
      </div>

      {/* Bottom nav links */}
      <BottomNav />

      {/* Footer */}
      <footer
        className="mt-auto py-6 px-5 text-center"
        style={{ borderTop: "1px solid #C8BFA8", backgroundColor: "#EDE5D4" }}
      >
        <p className="text-xs tracking-[0.12em]" style={{ color: "#8C7355" }}>
          © VOLLEYNATI 2026
        </p>
      </footer>
    </div>
  );
}
