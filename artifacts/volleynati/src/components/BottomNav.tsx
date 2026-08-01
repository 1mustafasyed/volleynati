import { Link } from "wouter";

export default function BottomNav() {
  return (
    <div
      className="w-full max-w-2xl mx-auto px-5 pt-6 pb-8 text-center border-t"
      style={{ borderColor: "#C8BFA8" }}
    >
      <Link
        href="/staff/login"
        className="text-xs tracking-[0.15em] no-underline transition-colors block mb-3 hover:text-[#4A3728]"
        style={{ color: "#8C7355" }}
      >
        STAFF LOGIN
      </Link>
      <p className="text-xs tracking-[0.12em]" style={{ color: "#C8BFA8" }}>
        Volleynati 2026
      </p>
    </div>
  );
}
