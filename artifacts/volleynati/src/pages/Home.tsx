import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/b-roll-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <section className="relative h-full flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Volleynati 2026
          </h1>
          <div className="flex flex-col gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 hover:bg-gray-200" asChild>
              <Link href="/landing">
                Enter
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors" asChild>
              <Link href="/staff/login">
                Staff Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
