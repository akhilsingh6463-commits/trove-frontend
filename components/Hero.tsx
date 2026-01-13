import React, { useEffect, useState } from 'react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000', // Horology/Watchmaking
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=2000', // Mixology
  'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000', // Forest/Nature
  'https://images.unsplash.com/photo-1565193998248-d500a721c7d8?auto=format&fit=crop&q=80&w=2000', // Pottery/Craft
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=2000'  // Urban/Architecture
];

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Image rotation timer
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5 seconds per image

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageTimer);
    };
  }, []);

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Image Carousel Background */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{ transform: `translateY(${offset * 0.1}px)` }}
      >
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Trove Experience ${index + 1}`}
              className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] saturate-[0.9]"
            />
          </div>
        ))}
        
        {/* Black Gradient Overlays for High-End Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-30 max-w-[90vw] md:max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8 overflow-hidden">
          <span className="block text-[10px] font-black uppercase tracking-[0.9em] text-[#bfa260] animate-[reveal-up_1s_ease-out_forwards]">
            THE ARCHITECTURE OF DELIGHT
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-[8.5rem] font-display font-medium text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
          <div className="overflow-hidden mb-1">
            <span 
              className="block animate-[reveal-up_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{ transform: `translateY(${offset * -0.15}px)` }}
            >
              Find Fresh
            </span>
          </div>
          <div className="overflow-hidden">
            <span 
              className="block italic font-light animate-[reveal-up_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 [animation-fill-mode:forwards] text-white/90"
              style={{ transform: `translateY(${offset * -0.05}px)` }}
            >
              Sources of Joy
            </span>
          </div>
        </h1>
      </div>

      {/* Decorative Line Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 opacity-60">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-white">Explore</span>
      </div>
    </section>
  );
};

export default Hero;