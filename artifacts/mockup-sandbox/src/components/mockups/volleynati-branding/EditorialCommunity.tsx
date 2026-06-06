import "./_group.css";

export function EditorialCommunity() {
  return (
    <div style={{ fontFamily: "'SouthAkirfas', system-ui, sans-serif", width: 390, minHeight: 844 }}
      className="bg-[#F5F0E8] text-[#1C1A16] overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-[#C8BFA8]">
        <div className="flex items-center gap-2">
          <img src="/__mockup/images/fire-icon.png" alt="logo" className="w-6 h-6" />
          <span className="text-sm tracking-[0.12em] text-[#8C7355]">VOLLEYNATI</span>
        </div>
        <button className="bg-[#4A3728] text-[#F5F0E8] px-4 py-2 text-xs tracking-[0.1em]">
          REGISTER
        </button>
      </nav>

      {/* Hero */}
      <div className="px-5 pt-8 pb-6">
        <div className="text-[#8C7355] text-[10px] tracking-[0.25em] mb-6">
          RALEIGH, NC · AUGUST 8, 2026
        </div>

        <h1 className="text-[72px] leading-[0.9] mb-5">
          VOLLEY<br />
          <span className="text-[#8C7355]">NATI</span><br />
          <span className="text-[48px]">2026</span>
        </h1>

        <div className="w-10 h-px bg-[#C8BFA8] mb-5" />

        <p className="text-[#4A3728] text-base leading-relaxed mb-7">
          A 100% volunteer-powered community movement. Three years of bringing Raleigh together through volleyball, charity, and shared memory.
        </p>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-[#4A3728] text-[#F5F0E8] text-base py-4 tracking-[0.08em]">
            REGISTER YOUR TEAM
          </button>
          <button className="w-full border border-[#C8BFA8] text-[#4A3728] text-base py-4 tracking-[0.08em]">
            GET TICKETS
          </button>
        </div>
      </div>

      {/* Flyer photo */}
      <div className="px-5 pb-6">
        <img src="/__mockup/images/flyer.png" alt="2026 flyer"
          className="w-full rounded-lg"
          style={{ filter: "sepia(8%) saturate(90%)" }} />
      </div>

      {/* Key dates */}
      <div className="bg-[#EDE5D4] px-5 py-6">
        <div className="text-[#8C7355] text-[10px] tracking-[0.2em] mb-4">KEY DATES</div>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          {[
            { label: "REG OPENS", value: "JUNE 10" },
            { label: "EARLY BIRD", value: "JULY 3" },
            { label: "GEN REG CLOSES", value: "JULY 17" },
            { label: "TOURNAMENT", value: "AUG 8" },
          ].map((d) => (
            <div key={d.label}>
              <div className="text-[#8C7355] text-[9px] tracking-[0.15em] mb-1">{d.label}</div>
              <div className="text-[#1C1A16] text-lg">{d.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drone photo */}
      <div className="px-5 py-6">
        <img src="/__mockup/images/droneshot.jpg" alt="aerial"
          className="w-full h-48 object-cover rounded-lg"
          style={{ filter: "sepia(15%) saturate(85%)" }} />
        <p className="text-[#8C7355] text-[10px] tracking-wide text-center mt-2">
          Jaycee Park, Raleigh — Est. 2023
        </p>
      </div>

      {/* Stats */}
      <div className="flex border-t border-[#C8BFA8] mx-5">
        {[
          { value: "3+", label: "YEARS" },
          { value: "100%", label: "VOLUNTEER" },
          { value: "FREE", label: "SPECTATE" },
        ].map((s, i) => (
          <div key={s.label} className={`flex-1 text-center py-5 ${i < 2 ? "border-r border-[#C8BFA8]" : ""}`}>
            <div className="text-2xl text-[#4A3728] mb-1">{s.value}</div>
            <div className="text-[#8C7355] text-[9px] tracking-[0.15em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-6 border-t border-[#C8BFA8] bg-[#EDE5D4] text-center">
        <div className="text-[#8C7355] text-[10px] tracking-[0.15em]">A COMMUNITY TRADITION SINCE 2023</div>
      </div>
    </div>
  );
}
