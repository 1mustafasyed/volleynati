import { useState } from "react";
import { Link } from "wouter";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Sticky event fact bar */}
      <div className="w-full bg-[#4A3728] text-[#F5F0E8] text-center py-2.5 text-xs tracking-[0.12em]">
        AUG 8, 2026 · JAYCEE PARK · RALEIGH NC
      </div>

      {/* Inline nav bar */}
      <nav className="flex items-center justify-between px-5 py-4 bg-[#F5F0E8] border-b border-[#C8BFA8]">
        <Link href="/landing" onClick={close} className="flex items-center gap-2 no-underline">
          <img
            src="/landing/VolleyNatiAssetsfireVolley-icon.png"
            alt="Volleynati logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-sm tracking-[0.12em] text-[#8C7355]">VOLLEYNATI</span>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
          <span className="block w-6 h-0.5 bg-[#4A3728]" />
        </button>
      </nav>

      {/* Slide-out menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={close}
          />

          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-72 bg-[#F5F0E8] shadow-xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8BFA8]">
              <span className="text-sm tracking-[0.12em] text-[#8C7355]">MENU</span>
              <button
                onClick={close}
                aria-label="Close menu"
                className="text-[#4A3728] text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-6 gap-1">
              {[
                { label: "Home",     href: "/landing"   },
                { label: "Bracket",  href: "/bracket"   },
                { label: "History",  href: "/history"   },
                { label: "Sponsors", href: "/sponsors"  },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="text-[#1C1A16] text-lg tracking-[0.08em] py-4 border-b border-[#C8BFA8] last:border-0 no-underline hover:text-[#4A3728] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Staff link at bottom */}
            <div className="mt-auto px-6 pb-8">
              <Link
                href="/staff/login"
                onClick={close}
                className="text-[#8C7355] text-xs tracking-[0.15em] no-underline hover:text-[#4A3728] transition-colors"
              >
                STAFF LOGIN
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
