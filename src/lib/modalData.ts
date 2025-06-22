interface Section {
  title: string;
  content: string[];
  type?: 'text' | 'list' | 'highlight';
  showDivider?: boolean;
}

interface ModalContent {
  title: string;
  sections: Section[];
}

export const modalData: Record<string, ModalContent> = {
  details: {
    title: "Tournament Details",
    sections: [
      {
        title: "When",
        content: [
          "📅 Saturday, August 23rd, 2025",
          "4:00 PM - 11:00 PM",
          "",        ],
        showDivider: true
      },
      {
        title: "Where",
        content: [
          "📍 Jaycee Park",
          "2405 Wade Avenue",
          "Raleigh, NC"
        ],
        showDivider: true
      },
      {
        title: "Key Dates",
        content: [
          "Team Registration Deadline: July 15th, 2025",
          "Media Day: August 16th, 2025",
          "Charity 5k: August 22nd, 2025",
        ]
      }
    ]
  },
  
  ourCause: {
    title: "Why Volleynati?",
    sections: [
      {
        title: "Our Mission",
        content: [
          "*insert copy here*"
        ],
        showDivider: true
      },
      {
        title: "Charity Component",
        content: [
          "*insert copy here*"
        ]
      }
    ]
  },
  
  sponsors: {
    title: "Our Sponsors",
    sections: [
      {
        title: "Platinum Sponsors",
        content: [
          "🏢 **Sports Gear Pro** - Official equipment supplier",
          "🏥 **City Medical Center** - Medical support"
        ],
        showDivider: true
      },
      {
        title: "Gold Sponsors",
        content: [
          "🥤 **RefreshCo** - Beverage sponsor",
          "🍕 **Pizza Palace** - Food sponsor",
          "🚗 **City Auto Group** - Transportation sponsor"
        ],
        showDivider: true
      },
      {
        title: "Silver Sponsors",
        content: [
          "🏦 **Local Bank** - Financial services",
          "📱 **Tech Solutions** - Technology support",
          "🎵 **Sound Systems** - Audio equipment"
        ],
        showDivider: true
      },
      {
        title: "Community Partners",
        content: [
          "🏛️ **City Parks & Recreation**",
          "📚 **Local University Athletics**",
          "🏪 **Downtown Business Association**"
        ],
        showDivider: true
      },
      {
        title: "Interested in Sponsoring?",
        content: [
          "Contact us at sponsors@volleynati.com"
        ]
      }
    ]
  },
  
  history: {
    title: "Volleynati History",
    sections: [
      {
        title: "Our Story",
        content: [
          "Insert copy on volleynati history"
        ]
      }
    ]
  }
}; 