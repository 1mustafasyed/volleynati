import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HamburgerMenu />
      <div className="p-4 flex justify-end items-center">
        <Button variant="outline" asChild>
          <Link href="/landing">Back</Link>
        </Button>
      </div>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Sponsors
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Support Volleynati 2025 and get exclusive benefits while helping us create an unforgettable tournament experience.
          </p>

          <div className="mt-12">
            <Button size="lg" className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700" asChild>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzNgEyqg9OYsOiurgfe0m20dNzP0iHym0P7iM_mBT3bHcTRQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Interested in Sponsoring?
              </a>
            </Button>
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
