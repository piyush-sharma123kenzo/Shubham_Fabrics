import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ isOpen, images = [], currentIndex = 0, onClose, onPrev, onNext, title = '' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-4 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 text-brand-ivory/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Left */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 z-50 p-3 text-brand-ivory/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Image Display */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={title || `View ${currentIndex + 1}`}
          className="max-h-[75vh] w-auto object-contain rounded-sm shadow-2xl transition-all duration-300"
        />

        {/* Caption */}
        <div className="mt-4 text-center">
          {title && (
            <p className="text-sm font-serif text-brand-ivory tracking-wide">
              {title}
            </p>
          )}
          {images.length > 1 && (
            <p className="text-xs text-brand-ivory/60 tracking-widest uppercase mt-1">
              {currentIndex + 1} of {images.length}
            </p>
          )}
        </div>
      </div>

      {/* Navigation Right */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 z-50 p-3 text-brand-ivory/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
