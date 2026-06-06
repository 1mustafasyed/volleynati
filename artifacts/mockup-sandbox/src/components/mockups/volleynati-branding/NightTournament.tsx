import "./_group.css";

export function NightTournament() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#08090D] text-white overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-7 h-7" />
          <span className="text-sm tracking-widest text-white/70">VOLLEYNATI</span>
        </div>
        <button className="border border-[#00E5FF] text-[#00E5FF] px-4 py-2 rounded text-xs tracking-widest">
          TICKETS
        </button>
      </nav>

      {/* Hero */}
      <div className="relative px-5 pt-10 pb-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #00E5FF 0%, transparent 70%)" }} />

        <div className="inline-flex items-center gap-2 text-[#00E5FF] text-[10px] tracking-[0.25em] border border-[#00E5FF]/30 px-3 py-1.5 rounded-full bg-[#00E5FF]/5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          AUG 8 · JAYCEE PARK · RALEIGH
        </div>

        <h1 className="text-[80px] leading-[0.88] mb-6 relative">
          <span className="block text-white">VOLLEY</span>
          <span className="block" style={{
            color: "transparent",
            WebkitTextStroke: "1.5px #00E5FF",
            textShadow: "0 0 30px rgba(0,229,255,0.5)"
          }}>NATI</span>
          <span className="block text-[52px] text-white/30">2026</span>
        </h1>

        <p className="text-white/40 text-base leading-relaxed mb-8 max-w-[280px]">
          Raleigh's most anticipated summer tournament. Three years of tradition. One weekend that hits different.
        </p>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-[#00E5FF] text-[#08090D] text-base py-4 rounded tracking-widest"
            style={{ boxShadow: "0 0 24px rgba(0,229,255,0.3)" }}>
            REGISTER
          </button>
          <button className="w-full border border-white/20 text-white/50 text-base py-4 rounded tracking-widest">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-b border-white/10 mx-5 py-6 gap-2">
        {[
          { value: "3+", label: "YEARS" },
          { value: "AUG 8", label: "DATE" },
          { value: "FREE", label: "SPECTATE" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl text-[#00E5FF] mb-1"
              style={{ textShadow: "0 0 16px rgba(0,229,255,0.4)" }}>{s.value}</div>
            <div className="text-white/25 text-[9px] tracking-[0.2em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Flyer */}
      <div className="px-5 py-8">
        <div className="text-[#00E5FF] text-[10px] tracking-[0.3em] mb-3">THIS YEAR'S EVENT</div>
        <div className="relative">
          <div className="absolute inset-0 rounded-xl opacity-20"
            style={{ boxShadow: "0 0 40px #00E5FF" }} />
          <img src="/__mockup/images/flyer.png" alt="2026 flyer"
            className="w-full rounded-xl relative z-10 opacity-90" />
        </div>
        <h2 className="text-[40px] leading-tight mt-6 mb-2">THE FLYER<br />IS LIVE</h2>
        <p className="text-white/35 text-sm leading-relaxed">
          Registration opens June 10. Early bird closes July 3. Don't sleep on it.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-10">
        <button className="w-full border border-[#00E5FF]/40 text-[#00E5FF] text-base py-4 rounded tracking-widest hover:bg-[#00E5FF]/5">
          VIEW ALL DETAILS →
        </button>
      </div>
    </div>
  );
}
