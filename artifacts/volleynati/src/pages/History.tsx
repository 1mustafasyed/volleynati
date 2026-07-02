import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1A16]">
      <HamburgerMenu />

      {/* Page title */}
      <div className="px-5 pt-7 pb-5 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.2em] mb-3" style={{ color: "#8C7355" }}>ABOUT</p>
        <h1 className="text-[56px] leading-[0.9] mb-4" style={{ color: "#1C1A16" }}>
          OUR<br />
          <span style={{ color: "#8C7355" }}>HISTORY</span>
        </h1>
        <div className="w-8 h-px mb-5" style={{ backgroundColor: "#C8BFA8" }} />
        <p className="text-base leading-relaxed" style={{ color: "#4A3728" }}>
          Volleynati began in August 2023 as a simple idea born in a bedroom in Raleigh:
          bring people together through volleyball to provide humanitarian aid, food, and
          water to those who need it most. What started as a small charity tournament has
          grown into one of Raleigh&apos;s most anticipated annual events.
        </p>
      </div>

      {/* Photo 1 */}
      <div className="px-5 pb-6 max-w-2xl mx-auto">
        <img
          src="/history/thumbnail-4.png"
          alt="Volleynati community photo"
          className="w-full rounded-lg"
          style={{ filter: "sepia(6%) saturate(90%)" }}
        />
      </div>

      {/* Section 2 */}
      <div className="px-5 py-6 max-w-2xl mx-auto" style={{ borderTop: "1px solid #C8BFA8" }}>
        <p className="text-base leading-relaxed" style={{ color: "#4A3728" }}>
          Every summer, hundreds of players, supporters, and local businesses gather to
          transform Volleynati into a vibrant festival celebrating community and compassion.
          From competitive volleyball matches to live music, food trucks, artisan shopping,
          hands-on activities, and unforgettable giveaways, Volleynati offers something for everyone.
        </p>
      </div>

      {/* Photo 2 */}
      <div className="px-5 pb-6 max-w-2xl mx-auto">
        <img
          src="/history/thumbnail-5.png"
          alt="Volleynati festival photo"
          className="w-full rounded-lg"
          style={{ filter: "sepia(6%) saturate(90%)" }}
        />
      </div>

      {/* Section 3 */}
      <div className="px-5 py-6 max-w-2xl mx-auto" style={{ borderTop: "1px solid #C8BFA8" }}>
        <p className="text-base leading-relaxed" style={{ color: "#4A3728" }}>
          More than volleyball, Volleynati is a movement. It&apos;s a chance to reunite, give back,
          and make a real impact while closing out the summer in the best way possible.
          Every serve, set, and spike helps change lives.
        </p>
      </div>

      {/* Photo 3 */}
      <div className="px-5 pb-8 max-w-2xl mx-auto">
        <img
          src="/history/thumbnail-3.png"
          alt="Volleynati action photo"
          className="w-full rounded-lg"
          style={{ filter: "sepia(6%) saturate(90%)" }}
        />
      </div>

      {/* Champions section */}
      <div className="px-5 py-6 max-w-2xl mx-auto" style={{ backgroundColor: "#EDE5D4" }}>
        <p className="text-[10px] tracking-[0.2em] mb-5" style={{ color: "#8C7355" }}>TOURNAMENT CHAMPIONS</p>

        {/* 2025 */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-3 pb-3" style={{ borderBottom: "1px solid #C8BFA8" }}>
            <span className="text-sm" style={{ color: "#4A3728" }}>2025 Champions</span>
            <span className="text-base" style={{ color: "#1C1A16" }}>The Underdogs</span>
          </div>
          <img
            src="/history/2025-champions.jpg"
            alt="2025 Champions — The Underdogs"
            className="w-full rounded-lg"
            style={{ filter: "sepia(6%) saturate(90%)" }}
          />
        </div>

        {/* 2024 */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-3 pb-3" style={{ borderBottom: "1px solid #C8BFA8" }}>
            <span className="text-sm" style={{ color: "#4A3728" }}>2024 Champions</span>
            <span className="text-base" style={{ color: "#1C1A16" }}>Hugo&apos;s Little Munchkins</span>
          </div>
          <img
            src="/history/2024-champions.png"
            alt="2024 Champions — Hugo's Little Munchkins"
            className="w-full rounded-lg"
            style={{ filter: "sepia(6%) saturate(90%)" }}
          />
        </div>

        {/* 2023 */}
        <div>
          <div className="flex justify-between items-baseline mb-3 pb-3" style={{ borderBottom: "1px solid #C8BFA8" }}>
            <span className="text-sm" style={{ color: "#4A3728" }}>2023 Champions</span>
            <span className="text-base" style={{ color: "#1C1A16" }}>Notorious D.I.G</span>
          </div>
          <img
            src="/history/2023-champions.png"
            alt="2023 Champions — Notorious D.I.G"
            className="w-full rounded-lg"
            style={{ filter: "sepia(6%) saturate(90%)" }}
          />
        </div>
      </div>

      {/* Closing note */}
      <div className="px-5 py-8 max-w-2xl mx-auto" style={{ borderTop: "1px solid #C8BFA8" }}>
        <p className="text-base leading-relaxed" style={{ color: "#4A3728" }}>
          As we head into Volleynati 2026, we&apos;re excited to welcome more teams than ever.
          The legacy continues to grow, and we can&apos;t wait to see what new memories and
          champions this year will bring.
        </p>
      </div>

      {/* Bottom nav links */}
      <BottomNav />

      {/* Footer */}
      <footer className="py-6 px-5 text-center" style={{ borderTop: "1px solid #C8BFA8", backgroundColor: "#EDE5D4" }}>
        <p className="text-xs tracking-[0.12em]" style={{ color: "#8C7355" }}>© VOLLEYNATI 2026</p>
      </footer>
    </div>
  );
}
