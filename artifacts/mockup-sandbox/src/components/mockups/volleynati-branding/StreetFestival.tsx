import "./_group.css";

export function StreetFestival() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#FFF8EE] text-[#1a1008] overflow-hidden">

      {/* Sticky top nav */}
      <nav className="flex items-center justify-between px-5 py-4 bg-[#FFF8EE] border-b border-[#F0D9B5]">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-7 h-7" />
          <span className="text-sm tracking-wide text-[#C05E00]">VOLLEYNATI</span>
        </div>
        <button className="bg-[#F07900] text-white px-4 py-2 rounded-full text-xs">
          TICKETS
        </button>
      </nav>

      {/* Hero */}
      <div className="relative px-5 pt-8 pb-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #F07900 0%, #FFD166 60%, transparent 100%)", transform: "translate(30%, -30%)" }} />

        <span className="inline-block bg-[#F07900] text-white text-[10px] px-3 py-1 rounded-full tracking-widest mb-5">
          AUG 8 · JAYCEE PARK · RALEIGH
        </span>

        <h1 className="text-[76px] leading-[0.88] mb-5 relative">
          VOLLEY<br />
          <span className="text-[#F07900]">NATI</span><br />
          <span className="text-[52px]">2026</span>
        </h1>

        <p className="text-[#7a4200] text-base leading-relaxed mb-7 max-w-[280px]">
          Raleigh's summer tradition. 100% volunteer-powered. Community, volleyball, and unforgettable memories.
        </p>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-[#F07900] text-white text-base py-4 rounded-full">
            REGISTER YOUR TEAM
          </button>
          <button className="w-full border-2 border-[#F07900] text-[#F07900] text-base py-4 rounded-full">
            GET TICKETS
          </button>
        </div>
      </div>

      {/* Orange info bar */}
      <div className="bg-[#F07900] text-white px-5 py-5 grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] opacity-70 tracking-widest mb-1">WHEN</div>
          <div className="text-sm">Sat, Aug 8</div>
          <div className="text-sm">3PM – 11PM</div>
        </div>
        <div>
          <div className="text-[10px] opacity-70 tracking-widest mb-1">WHERE</div>
          <div className="text-sm">Jaycee Park</div>
          <div className="text-sm">Raleigh, NC</div>
        </div>
        <div>
          <div className="text-[10px] opacity-70 tracking-widest mb-1">REG OPENS</div>
          <div className="text-sm">June 10, 2026</div>
        </div>
        <div>
          <div className="text-[10px] opacity-70 tracking-widest mb-1">EARLY BIRD</div>
          <div className="text-sm">July 3, 2026</div>
        </div>
      </div>

      {/* Flyer */}
      <div className="px-5 py-8">
        <img src="/__mockup/images/flyer.png" alt="2026 flyer"
          className="w-full rounded-2xl shadow-xl mb-6"
          style={{ boxShadow: "0 12px 40px rgba(240,121,0,0.25)" }} />
        <h2 className="text-[40px] leading-tight mb-3">BIGGER<br />THAN EVER</h2>
        <p className="text-[#7a4200] text-sm leading-relaxed">
          Three years of community. Hundreds of players. One weekend that Raleigh won't forget.
        </p>

        <div className="flex gap-8 mt-6">
          <div>
            <div className="text-3xl text-[#F07900]">3+</div>
            <div className="text-[10px] text-[#7a4200] tracking-widest">YEARS RUNNING</div>
          </div>
          <div>
            <div className="text-3xl text-[#F07900]">100%</div>
            <div className="text-[10px] text-[#7a4200] tracking-widest">VOLUNTEER</div>
          </div>
          <div>
            <div className="text-3xl text-[#F07900]">FREE</div>
            <div className="text-[10px] text-[#7a4200] tracking-widest">TO SPECTATE</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-10 pt-2">
        <button className="w-full bg-[#1a1008] text-[#FFF8EE] text-base py-4 rounded-full">
          VIEW FULL DETAILS →
        </button>
      </div>
    </div>
  );
}
