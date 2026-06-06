import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";
import SupabaseExample from "@/components/SupabaseExample";

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
      <section className="py-12 px-2">
        <div className="max-w-4xl mx-auto">
          {/* Icon and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/landing/VolleyNatiAssetsfireVolley-icon.png"
                alt="Volleynati Fire Volley Icon"
                width={120}
                height={120}
                className="w-20 h-20 md:w-20 md:h-20 object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight">
              Volleynati 2025
            </h1>
          </div>
          
          <div className="text-center">
                        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Volleynati is a 100% volunteer-powered community movement focused on bringing people together through the power of volleyball and creating lasting connections.
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
        </div>
      </section>

      {/* T-shirt Graphic Section */}
      <section className="py-4 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-full max-w-2xl mx-auto">
            <Image
              src="/landing/VolleyNatiAssetsT-shirtGraphic.png"
              alt="Volleynati T-shirt Graphic"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Today, Volleynati has become a staple in Raleigh&apos;s culture. A tradition that unites people every summer around community, generosity, and unforgettable memories.
          </p>
        </div>
      </section>

      {/* Droneshot Section */}
      <section className="py-4 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/landing/droneshot.jpg"
                alt="Volleynati Droneshot"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local to Global Impact Section */}
      <section className="py-8 px-4 bg-white">
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
            🗓️ Registration Deadline: July 18th, 2025
          </p>
        </div>
      </section>

      {/* Supabase Test Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SupabaseExample />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">© Volleynati 2025</p>
          <div className="flex justify-center">
            <a 
              href="https://www.instagram.com/volleynati" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
} 