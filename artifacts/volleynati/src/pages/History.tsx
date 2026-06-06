import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/landing">Back</Link>
        </Button>
      </div>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            Our History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Volleynati began in August 2023 as a simple idea born in a bedroom in Raleigh: bring people together through volleyball to provide humanitarian aid, food, and water to those who need it most. What started as a small charity tournament has grown into one of Raleigh&apos;s most anticipated annual events.
              </p>

              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-2xl mx-auto">
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src="/history/thumbnail-4.png"
                      alt="Volleynati thumbnail 4"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Every summer, hundreds of players, supporters, and local businesses gather to transform Volleynati into a vibrant festival celebrating community and compassion. From competitive volleyball matches to live music, food trucks, artisan shopping, hands-on activities, and unforgettable giveaways, Volleynati offers something for everyone.
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/history/thumbnail-5.png"
                    alt="Volleynati thumbnail 5"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                More than volleyball, Volleynati is a movement, a chance to reunite, give back, and make a real impact while closing out the summer in the best way possible. With extensive photo, video, and media coverage capturing every moment, the memories and stories from Volleynati reach far beyond the court.
                Join us and be part of a historical event where sport meets purpose, and where every serve, set, and spike helps change lives.
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/history/thumbnail-3.png"
                    alt="Volleynati thumbnail 3"
                    width={200}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-black mb-6">Tournament Champions</h3>

            <div className="mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block mb-4">
                <h4 className="text-xl font-bold text-gray-800">2024 Champions</h4>
                <p className="text-lg text-gray-600">Hugo&apos;s Little Munchkins</p>
              </div>
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/history/2024-champions.png"
                    alt="2024 Champions - Hugo's Little Munchkins"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block mb-4">
                <h4 className="text-xl font-bold text-gray-800">2023 Champions</h4>
                <p className="text-lg text-gray-600">Notorious D.I.G</p>
              </div>
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/history/2023-champions.png"
                    alt="2023 Champions - Notorious D.I.G"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              As we approach Volleynati 2025, we&apos;re excited to welcome 20 teams for our biggest tournament yet. The legacy continues to grow, and we can&apos;t wait to see what new memories and champions this year will bring.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">© Volleynati 2025</p>
        </div>
      </footer>
    </div>
  );
}
