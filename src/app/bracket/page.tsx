import Link from "next/link";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function BracketPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      {/* Header */}
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/landing">Back</Link>
        </Button>
      </div>

      {/* Tournament Bracket Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-bold text-black">
            Coming Soon
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">© Volleynati 2025</p>
        </div>
      </footer>
    </div>
  );
} 