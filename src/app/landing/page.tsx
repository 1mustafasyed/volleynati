import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/">Back</Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Volleynati 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Volleynati is a 100% volunteer community initiative focused on bringing people together through the power of volleyball and creating lasting connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="https://lu.ma/nd0vhiqi" target="_blank" rel="noopener noreferrer">
                Get Tournament Tickets
              </Link>
            </Button>
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700">
              Team Registration
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

      {/* Sponsorship Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Sponsorship Levels
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Support Volleynati 2025 and get exclusive benefits while helping us create an unforgettable tournament experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Tier */}
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

            {/* Silver Tier */}
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

            {/* Bronze Tier */}
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

          <div className="mt-12">
            <Button size="lg" className="text-lg px-8 py-3 bg-gray-600 hover:bg-blue-700">
              Interested in Sponsoring?
            </Button>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            Our History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">The Beginning</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Volleynati was born in 2020 from a simple idea: bring people together through the universal language of volleyball. What started as a small group of friends playing pickup games at local parks has grown into one of the most anticipated volleyball events in the region.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our first tournament featured just 8 teams and was held at a community center. Despite the humble beginnings, the energy and passion were electric, and we knew we had something special.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Growth & Impact</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By 2023, Volleynati had expanded to 16 teams and moved to Jaycee Park, where we've found our permanent home. The tournament has become more than just a sporting event—it's a celebration of community, friendship, and the spirit of competition.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We've raised over $150,000 for local charities and community programs, proving that sports can be a powerful force for good in our community.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Tournament Champions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-2">2024 Champions</h4>
                <p className="text-lg text-gray-600">Team Thunder</p>
                <p className="text-sm text-gray-500">Undefeated Season</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-2">2023 Champions</h4>
                <p className="text-lg text-gray-600">Spike Force</p>
                <p className="text-sm text-gray-500">First-time Winners</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-2">2022 Champions</h4>
                <p className="text-lg text-gray-600">Volley Legends</p>
                <p className="text-sm text-gray-500">Back-to-back Title</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              As we approach Volleynati 2025, we're excited to welcome 20 teams for our biggest tournament yet. The legacy continues to grow, and we can't wait to see what new memories and champions this year will bring.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">volleynati@example.com</p>
        </div>
      </footer>
    </div>
  );
} 