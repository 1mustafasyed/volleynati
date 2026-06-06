import "./_group.css";

/**
 * Usability focus: ACCESSIBILITY & READABILITY
 * Tradeoff: Maximum legibility — higher contrast ratios, larger body text (18px+),
 * generous line spacing, and buttons that pass WCAG AA at any brightness.
 * Sacrifices visual density and the earthy palette softness for inclusivity.
 */
export function EditorialAccessibility() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#FAF7F2] text-[#1A1210] overflow-hidden">

      {/* Nav — high contrast */}
      <nav className="flex items-center justify-between px-5 py-4 bg-[#1A1210]">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="Volleynati logo" className="w-7 h-7" />
          <span className="text-sm tracking-[0.12em] text-[#FAF7F2]">VOLLEYNATI</span>
        </div>
        <button aria-label="Open navigation menu"
          className="flex flex-col gap-1.5 p-2 bg-white/10 rounded">
          <span className="block w-5 h-0.5 bg-[#FAF7F2]" />
          <span className="block w-5 h-0.5 bg-[#FAF7F2]" />
          <span className="block w-5 h-0.5 bg-[#FAF7F2]" />
        </button>
      </nav>

      {/* Skip nav hint */}
      <div className="bg-[#EDE5D4] text-center py-2.5 text-[11px] tracking-[0.12em] text-[#1A1210] border-b border-[#BDB09A]">
        AUG 8, 2026 · JAYCEE PARK · RALEIGH, NC
      </div>

      {/* Hero */}
      <div className="px-5 pt-7 pb-6">
        <h1 className="text-[72px] leading-[0.9] mb-5 text-[#1A1210]">
          VOLLEY<br />
          {/* Darker brown for accessible contrast (4.5:1+ on FAF7F2) */}
          <span style={{ color: "#5C3D1E" }}>NATI</span><br />
          <span className="text-[48px]">2026</span>
        </h1>

        {/* Body text: 18px, generous leading */}
        <p style={{ fontSize: 18, lineHeight: 1.7 }} className="text-[#2D2218] mb-7">
          Raleigh's annual volleyball tournament. 100% volunteer-powered and free to spectate.
        </p>

        {/* CTAs: solid fills only, no low-contrast outlines */}
        <div className="flex flex-col gap-4">
          <button className="w-full bg-[#1A1210] text-[#FAF7F2] py-5 text-base tracking-[0.08em]"
            style={{ minHeight: 58, fontSize: 16 }}>
            REGISTER YOUR TEAM
          </button>
          {/* Second CTA: dark enough to pass contrast on light bg */}
          <button className="w-full bg-[#5C3D1E] text-[#FAF7F2] py-5 text-base tracking-[0.08em]"
            style={{ minHeight: 58, fontSize: 16 }}>
            GET TICKETS
          </button>
        </div>
      </div>

      {/* Flyer */}
      <div className="px-5 pb-6">
        <img src="/__mockup/images/flyer.png" alt="Volleynati 2026 event flyer showing players at Jaycee Park"
          className="w-full rounded-lg" />
      </div>

      {/* Key dates — high contrast, large text */}
      <div className="bg-[#EDE5D4] border-t border-[#BDB09A]">
        <div className="px-5 pt-5 pb-1">
          <p style={{ fontSize: 11 }} className="text-[#5C3D1E] tracking-[0.2em] mb-3">KEY DATES</p>
        </div>
        <div>
          {[
            { label: "Registration Opens", value: "June 10" },
            { label: "Early Bird Closes",  value: "July 3"  },
            { label: "General Reg Closes", value: "July 17" },
            { label: "Tournament Day",     value: "Aug 8"   },
          ].map((d) => (
            <div key={d.label}
              className="flex justify-between items-center px-5 py-4 border-b border-[#BDB09A] last:border-0">
              {/* Label: 15px, dark enough to pass contrast */}
              <span style={{ fontSize: 15, color: "#2D2218" }}>{d.label}</span>
              {/* Value: 18px, near-black */}
              <span style={{ fontSize: 18, color: "#1A1210" }} className="font-normal">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drone photo with explicit alt text */}
      <div className="px-5 py-6">
        <img src="/__mockup/images/droneshot.jpg"
          alt="Aerial view of volleyball courts at Jaycee Park during the Volleynati tournament"
          className="w-full h-44 object-cover rounded-lg" />
        <p style={{ fontSize: 12, color: "#5C3D1E" }} className="text-center mt-2 tracking-wide">
          Jaycee Park, Raleigh — Est. 2023
        </p>
      </div>
    </div>
  );
}
