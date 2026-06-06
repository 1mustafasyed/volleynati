import "./_group.css";

/**
 * Usability focus: INTERACTION & AFFORDANCES
 * Tradeoff: Every interactive element is unmistakably tappable. CTAs appear
 * above the fold immediately, touch targets are oversized (56px+), and a
 * persistent bottom nav keeps pages always one tap away.
 * Sacrifices editorial elegance for interaction clarity.
 */
export function EditorialAffordance() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#F5F0E8] text-[#1C1A16] overflow-hidden flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-[#C8BFA8]">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-6 h-6" />
          <span className="text-sm tracking-[0.12em] text-[#8C7355]">VOLLEYNATI</span>
        </div>
        {/* Hamburger — explicit label so affordance is crystal clear */}
        <button className="flex items-center gap-2 text-[#4A3728] text-xs tracking-widest border border-[#C8BFA8] px-3 py-2 rounded">
          <div className="flex flex-col gap-1">
            <span className="block w-4 h-0.5 bg-[#4A3728]" />
            <span className="block w-4 h-0.5 bg-[#4A3728]" />
            <span className="block w-4 h-0.5 bg-[#4A3728]" />
          </div>
          MENU
        </button>
      </nav>

      {/* Hero */}
      <div className="px-5 pt-6 pb-4">
        <div className="text-[#8C7355] text-[10px] tracking-[0.25em] mb-4">RALEIGH, NC · AUGUST 8, 2026</div>
        <h1 className="text-[68px] leading-[0.9] mb-5">
          VOLLEY<br />
          <span className="text-[#8C7355]">NATI</span><br />
          <span className="text-[44px]">2026</span>
        </h1>
        <p className="text-[#4A3728] text-sm leading-relaxed mb-6">
          100% volunteer-powered community tournament. Free to spectate.
        </p>

        {/* CTAs: above fold, prominent, labeled with outcome not action */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="w-full bg-[#4A3728] text-[#F5F0E8] py-5 text-base tracking-[0.08em] rounded-sm"
            style={{ minHeight: 56 }}>
            REGISTER YOUR TEAM →
          </button>
          <button className="w-full bg-[#EDE5D4] text-[#4A3728] border border-[#C8BFA8] py-5 text-base tracking-[0.08em] rounded-sm"
            style={{ minHeight: 56 }}>
            GET TICKETS →
          </button>
        </div>

        {/* Secondary action — clearly differentiated */}
        <button className="w-full text-[#8C7355] text-sm tracking-[0.1em] py-3 border-b border-[#C8BFA8] flex justify-between">
          <span>VIEW BRACKET &amp; STANDINGS</span>
          <span>→</span>
        </button>
        <button className="w-full text-[#8C7355] text-sm tracking-[0.1em] py-3 border-b border-[#C8BFA8] flex justify-between">
          <span>TOURNAMENT HISTORY</span>
          <span>→</span>
        </button>
        <button className="w-full text-[#8C7355] text-sm tracking-[0.1em] py-3 flex justify-between">
          <span>OUR SPONSORS</span>
          <span>→</span>
        </button>
      </div>

      {/* Flyer */}
      <div className="px-5 pb-6">
        <div className="text-[#8C7355] text-[10px] tracking-[0.2em] mb-3">2026 EVENT FLYER</div>
        <img src="/__mockup/images/flyer.png" alt="2026 flyer"
          className="w-full rounded-lg"
          style={{ filter: "sepia(8%) saturate(90%)" }} />
      </div>

      {/* Persistent bottom nav — always one tap away */}
      <div className="mt-auto border-t border-[#C8BFA8] bg-[#EDE5D4] grid grid-cols-4"
        style={{ minHeight: 60 }}>
        {[
          { icon: "🏠", label: "HOME" },
          { icon: "🏆", label: "BRACKET" },
          { icon: "📖", label: "HISTORY" },
          { icon: "💛", label: "SPONSORS" },
        ].map((n) => (
          <button key={n.label} className="flex flex-col items-center justify-center gap-1 py-3">
            <span className="text-lg">{n.icon}</span>
            <span className="text-[8px] text-[#8C7355] tracking-widest">{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
