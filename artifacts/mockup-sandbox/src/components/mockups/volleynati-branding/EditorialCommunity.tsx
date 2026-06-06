import "./_group.css";

export function EditorialCommunity() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif" }} className="min-h-screen bg-[#F5F0E8] text-[#1C1A16] overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-[#C8BFA8]">
        <div className="flex items-center gap-3">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-7 h-7" />
          <span className="text-base tracking-[0.15em] text-[#8C7355]">VOLLEYNATI</span>
        </div>
        <div className="flex gap-10 text-xs text-[#8C7355] tracking-[0.15em]">
          <a href="#" className="hover:text-[#4A3728] transition-colors">ABOUT</a>
          <a href="#" className="hover:text-[#4A3728] transition-colors">BRACKET</a>
          <a href="#" className="hover:text-[#4A3728] transition-colors">HISTORY</a>
          <a href="#" className="hover:text-[#4A3728] transition-colors">SPONSORS</a>
        </div>
        <button className="bg-[#4A3728] text-[#F5F0E8] px-6 py-2.5 text-xs tracking-[0.15em] hover:bg-[#2d2218] transition-colors">
          REGISTER NOW
        </button>
      </nav>

      {/* Hero — editorial 2-column */}
      <div className="max-w-6xl mx-auto px-10 pt-14 pb-10 flex gap-16 items-start">

        {/* Left: text */}
        <div className="flex-1">
          <div className="text-[#8C7355] text-xs tracking-[0.25em] mb-8">
            RALEIGH, NC · AUGUST 8, 2026
          </div>

          <h1 className="text-[88px] leading-[0.9] mb-8 text-[#1C1A16]">
            VOLLEY<br />
            <span className="text-[#8C7355]">NATI</span><br />
            <span className="text-[56px]">2026</span>
          </h1>

          <div className="w-12 h-px bg-[#C8BFA8] mb-8" />

          <p className="text-[#4A3728] text-lg leading-relaxed max-w-sm mb-10">
            A 100% volunteer-powered community movement. Three years of bringing Raleigh together through volleyball, charity, and shared memory.
          </p>

          <div className="flex gap-4">
            <button className="bg-[#4A3728] text-[#F5F0E8] px-7 py-3.5 text-sm tracking-[0.1em] hover:bg-[#2d2218] transition-colors">
              REGISTER YOUR TEAM
            </button>
            <button className="border border-[#C8BFA8] text-[#4A3728] px-7 py-3.5 text-sm tracking-[0.1em] hover:bg-[#EDE5D4] transition-colors">
              GET TICKETS
            </button>
          </div>

          {/* Key dates */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { label: "REG OPENS", value: "JUNE 10" },
              { label: "EARLY BIRD CLOSES", value: "JULY 3" },
              { label: "GEN REG CLOSES", value: "JULY 17" },
              { label: "TOURNAMENT", value: "AUG 8" },
            ].map((d) => (
              <div key={d.label}>
                <div className="text-[#8C7355] text-[10px] tracking-[0.2em] mb-1">{d.label}</div>
                <div className="text-[#1C1A16] text-lg">{d.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: flyer + drone photo */}
        <div className="w-[380px] flex flex-col gap-5 pt-4">
          <img
            src="/__mockup/images/flyer.png"
            alt="2026 flyer"
            className="w-full rounded-lg"
            style={{ filter: "sepia(8%) saturate(90%)" }}
          />
          <img
            src="/__mockup/images/droneshot.jpg"
            alt="Tournament aerial"
            className="w-full rounded-lg h-48 object-cover"
            style={{ filter: "sepia(15%) saturate(85%)" }}
          />
          <p className="text-[#8C7355] text-xs tracking-wide text-center">
            Jaycee Park, Raleigh — Est. 2023
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-[#C8BFA8] bg-[#EDE5D4]">
        <div className="max-w-6xl mx-auto px-10 py-5 flex items-center justify-between">
          <p className="text-[#8C7355] text-xs tracking-[0.15em]">A COMMUNITY TRADITION SINCE 2023</p>
          <div className="flex gap-8 text-xs text-[#8C7355] tracking-[0.1em]">
            <span>VOLLEYBALL</span>
            <span>·</span>
            <span>COMMUNITY</span>
            <span>·</span>
            <span>CHARITY</span>
          </div>
          <p className="text-[#8C7355] text-xs tracking-[0.15em]">100% VOLUNTEER-POWERED</p>
        </div>
      </div>
    </div>
  );
}
