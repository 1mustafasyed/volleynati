"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${
              isOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 pt-20">
              <nav className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg p-4 hover:bg-gray-100"
                  asChild
                  onClick={toggleMenu}
                >
                  <Link href="/landing">Home</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg p-4 hover:bg-gray-100"
                  asChild
                  onClick={toggleMenu}
                >
                  <Link href="/sponsors">Sponsors</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg p-4 hover:bg-gray-100"
                  asChild
                  onClick={toggleMenu}
                >
                  <Link href="/history">History</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg p-4 hover:bg-gray-100"
                  asChild
                  onClick={toggleMenu}
                >
                  <Link href="/bracket">Bracket</Link>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 