"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ModalContent | null;
}

export default function InfoModal({ isOpen, onClose, content }: InfoModalProps) {
  if (!content) return null;

  const renderSection = (section: Section, index: number) => {
    const isLast = index === content.sections.length - 1;
    const shouldShowDivider = section.showDivider && !isLast;
    
    return (
      <div key={section.title} className="space-y-3">
        <h3 className="text-xl font-semibold text-white pb-2">
          {section.title}
        </h3>
        
        <div className="space-y-2">
          {section.content.map((item, itemIndex) => (
            <p key={itemIndex} className="text-gray-300 leading-relaxed">
              {item}
            </p>
          ))}
        </div>
        
        {shouldShowDivider && (
          <div className="border-t border-gray-600 mt-4 pt-2"></div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-700 max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white flex justify-between items-center">
            {content.title}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              ✕
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {content.sections.map((section, index) => renderSection(section, index))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 