"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import InfoModal from "@/components/InfoModal";
import { modalData } from "@/lib/modalData";

export default function MainMenu() {
  const [visibleButtons, setVisibleButtons] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const options = [
    { 
      title: "Details", 
      modalKey: "details"
    },
    { 
      title: "Our Cause", 
      modalKey: "ourCause"
    },
    { 
      title: "Sponsors", 
      modalKey: "sponsors"
    },
    { 
      title: "History", 
      modalKey: "history"
    }
  ];

  useEffect(() => {
    // Animate buttons appearing sequentially
    options.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons(prev => [...prev, index]);
      }, index * 200); // 200ms delay between each button
    });
    
    // Show register button after all other buttons
    setTimeout(() => {
      setShowRegisterButton(true);
    }, options.length * 200 + 200); // Wait for all buttons + 200ms
  }, []);

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Back Button */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" className="text-white hover:bg-white hover:text-black" asChild>
          <Link href="/">
            ← Back
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-6">
          {options.map((option, index) => (
            <div
              key={option.title}
              className={`transition-all duration-500 ease-out transform ${
                visibleButtons.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Button 
                size="lg" 
                variant="ghost"
                className="w-40 text-2xl px-8 py-6 text-white hover:bg-white hover:text-black font-bold" 
                onClick={() => setOpenModal(option.modalKey)}
              >
                {option.title}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Register Now Button - Fixed at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <div
          className={`transition-all duration-500 ease-out transform ${
            showRegisterButton
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <Button 
            size="lg" 
            variant="ghost"
            className="w-60 text-2xl px-10 py-6 bg-white text-black font-bold" 
            asChild
          >
            <a href="https://lu.ma" target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white text-xs opacity-70">
          © 2025 Volleynati. All rights reserved.
        </p>
      </div>

      {/* Info Modal */}
      <InfoModal 
        isOpen={openModal !== null}
        onClose={handleCloseModal}
        content={openModal ? modalData[openModal] : null}
      />
    </div>
  );
} 