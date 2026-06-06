import "./_group.css";

export function StreetFestival() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif" }} className="min-h-screen bg-[#FFF8EE] text-[#1a1008] overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-8 h-8" />
          <span className="text-lg tracking-wide text-[#C05E00]">VOLLEYNATI</span>
        </div>
        <div className="flex gap-8 text-sm text-[#7a4200]">
          <a href="#" className="hover:text-[#C05E00]">ABOUT</a>
          <a href="#" className="hover:text-[#C05E00]">BRACKET</a>
          <a href="#" className="hover:text-[#C05E00]">HISTORY</a>
          <a href="#" className="hover:text-[#C05E00]">SPONSORS</a>
        </div>
        <button className="bg-[#F07900] text-white px-5 py-2 rounded-full text-sm hover:bg-[#C05E00] transition-colors">
          GET TICKETS
        </button>
      </nav>

      {/* Hero */}
      <div className="relative px-8 pt-8 pb-16">

        {/* Warm gradient background blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #F07900 0%, #FFD166 60%, transparent 100%)" }} />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-start gap-2 mb-4">
            <span className="bg-[#F07900] text-white text-xs px-3 py-1 rounded-full tracking-widest">AUGUST 8 · JAYCEE PARK · RALEIGH NC</span>
          </div>

          <h1 className="text-[96px] leading-[0.9] font-normal mb-6 text-[#1a1008]">
            VOLLEY<br />
            <span className="text-[#F07900]">NATI</span><br />
            <span className="text-[64px]">2026</span>
          </h1>

          <p className="text-[#7a4200] text-xl max-w-md mb-10 leading-relaxed">
            Raleigh's summer tradition returns. A 100% volunteer-powered tournament bringing the community together through volleyball.
          </p>

          <div className="flex gap-4">
            <button className="bg-[#F07900] text-white text-lg px-8 py-4 rounded-full hover:bg-[#C05E00] transition-all hover:scale-105">
              REGISTER YOUR TEAM
            </button>
            <button className="border-2 border-[#F07900] text-[#F07900] text-lg px-8 py-4 rounded-full hover:bg-[#FFF0DC] transition-colors">
              GET TICKETS
            </button>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-[#F07900] text-white">
        <div className="max-w-5xl mx-auto px-8 py-5 flex gap-16 text-sm tracking-wide">
          <div>
            <div className="opacity-70 mb-1">WHEN</div>
            <div className="text-lg">Saturday, Aug 8 · 3PM–11PM</div>
          </div>
          <div>
            <div className="opacity-70 mb-1">WHERE</div>
            <div className="text-lg">Jaycee Park, Raleigh NC</div>
          </div>
          <div>
            <div className="opacity-70 mb-1">REGISTRATION OPENS</div>
            <div className="text-lg">June 10, 2026</div>
          </div>
          <div className="ml-auto self-center">
            <img src="/__mockup/images/fire-icon.png" alt="" className="w-12 h-12 opacity-60" />
          </div>
        </div>
      </div>

      {/* Flyer preview */}
      <div className="max-w-5xl mx-auto px-8 py-12 flex gap-10 items-center">
        <img src="/__mockup/images/flyer.png" alt="2026 flyer" className="w-80 rounded-2xl shadow-2xl" style={{ boxShadow: "0 20px 60px rgba(240,121,0,0.3)" }} />
        <div>
          <h2 className="text-[48px] leading-tight mb-4 text-[#1a1008]">BIGGER<br />THAN EVER</h2>
          <p className="text-[#7a4200] text-lg leading-relaxed max-w-sm">
            Three years of community. Hundreds of players. One summer weekend that Raleigh won't forget.
          </p>
          <div className="mt-8 flex gap-6 text-[#F07900]">
            <div className="text-center">
              <div className="text-4xl font-normal">3+</div>
              <div className="text-sm text-[#7a4200]">YEARS RUNNING</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-normal">100%</div>
              <div className="text-sm text-[#7a4200]">VOLUNTEER-POWERED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
