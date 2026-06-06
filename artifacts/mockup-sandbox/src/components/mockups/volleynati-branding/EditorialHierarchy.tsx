import "./_group.css";

/**
 * Usability focus: INFORMATION HIERARCHY
 * Tradeoff: Ruthlessly prioritizes what to read first. Date + location are pinned above
 * the fold as the single most important fact. CTAs are secondary — content leads.
 * Sacrifices visual richness for scan speed.
 */
export function EditorialHierarchy() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#F5F0E8] text-[#1C1A16] overflow-hidden">

      {/* Sticky event fact bar — above everything */}
      <div className="bg-[#4A3728] text-[#F5F0E8] text-center py-3 text-sm tracking-[0.1em]">
        AUG 8, 2026 · JAYCEE PARK · RALEIGH NC
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-[#C8BFA8]">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-6 h-6" />
          <span className="text-sm tracking-[0.12em] text-[#8C7355]">VOLLEYNATI</span>
        </div>
        {/* Hamburger placeholder */}
        <div className="flex flex-col gap-1.5 cursor-pointer">
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
        </div>
      </nav>

      {/* Hero — hierarchy: title → who we are → CTAs */}
      <div className="px-5 pt-7 pb-6">
        {/* H1 — biggest, first */}
        <h1 className="text-[72px] leading-[0.9] mb-4">
          VOLLEY<br />
          <span className="text-[#8C7355]">NATI</span><br />
          <span className="text-[48px]">2026</span>
        </h1>

        {/* What it is — second */}
        <p className="text-[#4A3728] text-base leading-relaxed mb-2">
          Raleigh's annual community volleyball tournament.
        </p>
        {/* Why it matters — third, lighter */}
        <p className="text-[#8C7355] text-sm leading-relaxed mb-6">
          100% volunteer-powered · Free to spectate · Est. 2023
        </p>

        <div className="w-8 h-px bg-[#C8BFA8] mb-6" />

        {/* CTAs — after context is established */}
        <div className="flex flex-col gap-3">
          <button className="w-full bg-[#4A3728] text-[#F5F0E8] text-base py-4 tracking-[0.08em]">
            REGISTER YOUR TEAM
          </button>
          <button className="w-full border border-[#C8BFA8] text-[#4A3728] text-base py-4 tracking-[0.08em]">
            GET TICKETS
          </button>
        </div>
      </div>

      {/* Flyer — visual proof after CTAs */}
      <div className="px-5 pb-5">
        <img src="/__mockup/images/flyer.png" alt="2026 flyer"
          className="w-full rounded-lg"
          style={{ filter: "sepia(8%) saturate(90%)" }} />
      </div>

      {/* Key dates — scannable grid, labeled clearly */}
      <div className="bg-[#EDE5D4] px-5 py-5">
        <p className="text-[#8C7355] text-[10px] tracking-[0.2em] mb-4">KEY DATES</p>
        <div className="space-y-3">
          {[
            { label: "Registration Opens", value: "June 10" },
            { label: "Early Bird Closes",  value: "July 3"  },
            { label: "General Reg Closes", value: "July 17" },
            { label: "Tournament Day",     value: "Aug 8"   },
          ].map((d) => (
            <div key={d.label} className="flex justify-between items-baseline border-b border-[#C8BFA8] pb-3 last:border-0 last:pb-0">
              <span className="text-[#4A3728] text-sm">{d.label}</span>
              <span className="text-[#1C1A16] text-base">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav hint */}
      <div className="px-5 py-5 flex justify-between text-[#8C7355] text-xs tracking-[0.12em]">
        <span>ABOUT</span>
        <span>BRACKET</span>
        <span>HISTORY</span>
        <span>SPONSORS</span>
      </div>
    </div>
  );
}
