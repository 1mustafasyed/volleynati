import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "BRACKET",    href: "/bracket"      },
  { label: "HISTORY",    href: "/history"      },
  { label: "SPONSORS",   href: "/sponsors"     },
  { label: "STAFF LOGIN", href: "/staff/login" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <div
      className="px-5 py-5 flex justify-between border-t w-full max-w-2xl mx-auto"
      style={{ borderColor: "#C8BFA8" }}
    >
      {NAV_LINKS.map(({ label, href }) => {
        const active = location === href;
        return (
          <Link
            key={href}
            href={href}
            className="text-xs tracking-[0.12em] no-underline transition-colors"
            style={{ color: active ? "#1C1A16" : "#8C7355", fontWeight: active ? 600 : 400 }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
