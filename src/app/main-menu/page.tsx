"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MainMenu() {
  const [visibleButtons, setVisibleButtons] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const options = [
    { 
      title: "Details", 
      isExternal: false,
      content: {
        title: "Details",
        details: [
          "When",
          "",
          "📅 Saturday, August 23rd, 2025",
          "4:00 PM - 11:00 PM",
          "Where",
          "Jaycee Park",
          "2405 Wade Avenue",
          "Raleigh, NC",
          "",
          "Team Registration Deadline ",
          "July 15th, 2025",
          "",
          ""
        ]
      }
    },
    { 
      title: "Our Cause", 
      isExternal: false,
      content: {
        title: "Why Volleynati?",
        details: [
          "🎯 **Our Mission**",
          "Bringing communities together through the love of volleyball",
          "",
          "**What Makes Us Special:**",
          "🏆 **Competitive Spirit**: Top-tier competition with fair play",
          "🤝 **Community Building**: Connect with fellow volleyball enthusiasts",
          "💪 **Skill Development**: Improve your game in a supportive environment",
          "🎉 **Fun Atmosphere**: Music, food, and great vibes",
          "",
          "**Benefits for Participants:**",
          "• Professional tournament experience",
          "• Networking with other players",
          "• Prizes for winners",
          "• Free tournament t-shirt",
          "• Professional photos included",
          "",
          "**Charity Component:**",
          "A portion of proceeds goes to local youth sports programs"
        ]
      }
    },
    { 
      title: "Sponsors", 
      isExternal: false,
      content: {
        title: "Our Sponsors",
        details: [
          "🤝 **Platinum Sponsors**",
          "🏢 **Sports Gear Pro** - Official equipment supplier",
          "🏥 **City Medical Center** - Medical support",
          "",
          "**Gold Sponsors**",
          "🥤 **RefreshCo** - Beverage sponsor",
          "🍕 **Pizza Palace** - Food sponsor",
          "🚗 **City Auto Group** - Transportation sponsor",
          "",
          "**Silver Sponsors**",
          "🏦 **Local Bank** - Financial services",
          "📱 **Tech Solutions** - Technology support",
          "🎵 **Sound Systems** - Audio equipment",
          "",
          "**Community Partners**",
          "🏛️ **City Parks & Recreation**",
          "📚 **Local University Athletics**",
          "🏪 **Downtown Business Association**",
          "",
          "**Interested in Sponsoring?**",
          "Contact us at sponsors@volleynati.com"
        ]
      }
    },
    { 
      title: "History", 
      isExternal: false,
      content: {
        title: "Volleynati History",
        details: [
          "Insert copy on volleynati history",
          
        ]
      }
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
    setIsClosing(true);
    setTimeout(() => {
      setOpenModal(null);
      setIsClosing(false);
    }, 300); // Match the duration of the fade-out animation
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
                onClick={() => setOpenModal(index)}
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

      {/* Modal */}
      {openModal !== null && options[openModal].content && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in duration-300'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-black border border-gray-700 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-all duration-300 ${
              isClosing 
                ? 'opacity-0 scale-95 translate-y-4' 
                : 'opacity-100 scale-100 translate-y-0 animate-in fade-in slide-in-from-bottom-4 duration-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-white">
                  {options[openModal].content?.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-3 text-gray-300">
                {options[openModal].content?.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-lg leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 