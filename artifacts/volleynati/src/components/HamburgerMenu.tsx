import { useState } from "react";
import { Link } from "wouter";

const NAV_LINKS = [
  { label: "Home",     href: "/landing"  },
  { label: "Bracket",  href: "/bracket"  },
  { label: "History",  href: "/history"  },
  { label: "Sponsors", href: "/sponsors" },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Sticky event fact bar */}
      <div className="w-full bg-[#4A3728] text-[#F5F0E8] text-center py-2.5 text-xs tracking-[0.12em]">
        AUG 8, 2026 · JAYCEE PARK · RALEIGH NC
      </div>

      {/* Nav bar — relative so the dropdown anchors to it; z-50 to sit above the backdrop */}
      <nav className="relative z-50 flex items-center justify-between px-5 py-4 bg-[#F5F0E8] border-b border-[#C8BFA8]">
        <Link href="/" className="flex items-center gap-2 no-underline" onClick={close}>
          <img
            src="/landing/VolleyNatiAssetsfireVolley-icon.png"
            alt="Volleynati logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-sm tracking-[0.12em] text-[#8C7355]">VOLLEYNATI</span>
        </Link>

        {/* Hamburger button — stays on the right, animates to × when open */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="flex flex-col gap-1.5 p-2"
        >
          <span
            className="block w-6 h-0.5 bg-[#4A3728] transition-all duration-300 origin-center"
            style={{ transform: isOpen ? "rotate(45deg) translateY(8px)" : "none" }}
          />
          <span
            className="block w-6 h-0.5 bg-[#4A3728] transition-all duration-300"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-[#4A3728] transition-all duration-300 origin-center"
            style={{ transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
          />
        </button>

        {/* Full-width dropdown — drops down from beneath the nav bar */}
        <div
          className="absolute top-full left-0 w-full bg-[#F5F0E8] border-b border-[#C8BFA8] shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? "320px" : "0px",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="flex flex-col px-6 py-2">
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                tabIndex={isOpen ? 0 : -1}
                aria-hidden={!isOpen}
                className="text-[#1C1A16] text-lg tracking-[0.08em] py-4 border-b border-[#C8BFA8] last:border-0 no-underline hover:text-[#4A3728] transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${i * 60 + 60}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Backdrop — sits behind the dropdown (z-40) and closes the menu on tap */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={close}
      />
    </>
  );
}
