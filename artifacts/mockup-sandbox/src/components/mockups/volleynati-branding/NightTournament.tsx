import "./_group.css";

export function NightTournament() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif" }} className="min-h-screen bg-[#08090D] text-white overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-8 h-8" />
          <span className="text-lg tracking-widest text-white/80">VOLLEYNATI</span>
        </div>
        <div className="flex gap-8 text-sm text-white/40 tracking-widest">
          <a href="#" className="hover:text-[#00E5FF] transition-colors">ABOUT</a>
          <a href="#" className="hover:text-[#00E5FF] transition-colors">BRACKET</a>
          <a href="#" className="hover:text-[#00E5FF] transition-colors">HISTORY</a>
          <a href="#" className="hover:text-[#00E5FF] transition-colors">SPONSORS</a>
        </div>
        <button className="border border-[#00E5FF] text-[#00E5FF] px-5 py-2 rounded text-sm hover:bg-[#00E5FF]/10 transition-colors tracking-widest">
          GET TICKETS
        </button>
      </nav>

      {/* Hero */}
      <div className="relative px-8 pt-16 pb-12">

        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #00E5FF 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-20 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #7B2FFF 0%, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-8 text-[#00E5FF] text-xs tracking-[0.3em] border border-[#00E5FF]/30 px-4 py-2 rounded-full bg-[#00E5FF]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            AUG 8 · JAYCEE PARK · RALEIGH NC
          </div>

          <h1 className="text-[110px] leading-[0.88] mb-8 relative">
            <span className="block text-white">VOLLEY</span>
            <span className="block" style={{
              color: "transparent",
              WebkitTextStroke: "2px #00E5FF",
              textShadow: "0 0 40px rgba(0,229,255,0.5), 0 0 80px rgba(0,229,255,0.2)"
            }}>NATI</span>
            <span className="block text-[60px] text-white/40">2026</span>
          </h1>

          <p className="text-white/50 text-xl max-w-lg mx-auto mb-12 leading-relaxed tracking-wide">
            Raleigh's most anticipated summer tournament. Three years of tradition. One weekend that hits different.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="bg-[#00E5FF] text-[#08090D] text-lg px-10 py-4 rounded hover:opacity-90 transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] tracking-widest">
              REGISTER
            </button>
            <button className="border border-white/20 text-white/60 text-lg px-10 py-4 rounded hover:border-white/40 hover:text-white transition-colors tracking-widest">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-4 gap-8 border-t border-white/10 mt-8">
        {[
          { value: "3+", label: "YEARS" },
          { value: "100%", label: "VOLUNTEER" },
          { value: "AUG 8", label: "TOURNAMENT DATE" },
          { value: "FREE", label: "TO SPECTATE" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl text-[#00E5FF] mb-1" style={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}>{s.value}</div>
            <div className="text-white/30 text-xs tracking-[0.2em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom section — flyer */}
      <div className="max-w-5xl mx-auto px-8 py-12 flex gap-12 items-center">
        <div className="flex-1">
          <div className="text-[#00E5FF] text-xs tracking-[0.3em] mb-4">THIS YEAR'S EVENT</div>
          <h2 className="text-[56px] leading-tight mb-6 text-white">THE FLYER<br />IS LIVE</h2>
          <p className="text-white/40 leading-relaxed max-w-sm">
            Registration opens June 10. Early bird closes July 3. Don't sleep on it.
          </p>
          <button className="mt-8 text-[#00E5FF] text-sm tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
            VIEW ALL DETAILS →
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "0 0 60px rgba(0,229,255,0.2)" }} />
          <img src="/__mockup/images/flyer.png" alt="2026 flyer" className="w-72 rounded-2xl relative z-10 opacity-90" />
        </div>
      </div>
    </div>
  );
}
