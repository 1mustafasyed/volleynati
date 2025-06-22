import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black relative">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/b-roll-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero Section */}
      <section className="relative h-full flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Volleynati 2025
          </h1>
          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-3 hover:bg-gray-200" asChild>
              <Link href="/main-menu">
                Enter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
