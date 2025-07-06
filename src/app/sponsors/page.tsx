import Link from "next/link";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      {/* Header */}
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/landing">Back</Link>
        </Button>
      </div>

      {/* Sponsorship Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Sponsors
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Support Volleynati 2025 and get exclusive benefits while helping us create an unforgettable tournament experience.
          </p>
          
          {/* Sponsorship tiers temporarily hidden
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-yellow-400">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">Gold</h3>
              <div className="text-lg text-gray-700 mb-6">
                <ul className="text-gray-700 text-left space-y-3">
                  <li className="text-xl font-semibold">• Nike</li>
                  <li className="text-xl font-semibold">• Wilson Sporting Goods</li>
                  <li className="text-xl font-semibold">• Gatorade</li>
                  <li className="text-xl font-semibold">• ESPN</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Silver</h3>
              <div className="text-lg text-gray-700 mb-6">
                <ul className="text-gray-700 text-left space-y-3">
                  <li className="text-xl font-semibold">• Under Armour</li>
                  <li className="text-xl font-semibold">• Powerade</li>
                  <li className="text-xl font-semibold">• Sports Authority</li>
                  <li className="text-xl font-semibold">• Local Sports Clubs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-amber-400">
              <h3 className="text-2xl font-bold text-amber-600 mb-4">Bronze</h3>
              <div className="text-lg text-gray-700 mb-6">
                <ul className="text-gray-700 text-left space-y-3">
                  <li className="text-xl font-semibold">• Local Restaurants</li>
                  <li className="text-xl font-semibold">• Community Banks</li>
                  <li className="text-xl font-semibold">• Fitness Centers</li>
                  <li className="text-xl font-semibold">• Small Businesses</li>
                </ul>
              </div>
            </div>
          </div>
          */}

          <div className="mt-12">
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfzNgEyqg9OYsOiurgfe0m20dNzP0iHym0P7iM_mBT3bHcTRQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Interested in Sponsoring?
              </Link>
            </Button>
          </div>
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