import Link from "next/link";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      {/* Header */}
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/">Back</Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black leading-tight">
            Volleynati 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Volleynati is a 100% volunteer community initiative focused on bringing people together through the power of volleyball and creating lasting connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="https://lu.ma/z6823md3" target="_blank" rel="noopener noreferrer">
                Get Tournament Tickets
              </Link>
            </Button>
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="https://lu.ma/nd0vhiqi" target="_blank" rel="noopener noreferrer">
                Team Registration
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Local to Global Impact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            Details
          </h2>

          <p className="text-xl text-black leading-relaxed mb-2">
            <strong>When</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-2">
            🗓️ Saturday, August 23rd, 2025
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            4:00PM - 11:00PM
          </p>
          <p className="text-xl text-black leading-relaxed mb-2">
            <strong>Where</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-2">
            📍 Jaycee Park
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            2405 Wade Avenue, Raleigh, NC 27607
          </p>
          <p className="text-xl text-black leading-relaxed mb-2">
            <strong>Key Dates</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-2">
            🗓️ Registration Deadline: July 29th, 2025
          </p>
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