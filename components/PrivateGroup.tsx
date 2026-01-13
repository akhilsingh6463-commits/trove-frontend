import React from 'react';

const PrivateGroup: React.FC = () => {
  return (
    <section id="groups" className="relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden bg-black">
      {/* Background Image - Cinematic Forest Setting */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=2000" 
          alt="Private group experience in nature"
          className="w-full h-full object-cover"
        />
        {/* Deep Black Gradient Overlays for perfect legibility as requested */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-8 md:px-24 w-full">
        <div className="max-w-2xl">
          {/* Main Heading - Matching Reference Image Style */}
          <h2 className="text-3xl md:text-5xl font-normal text-white mb-10 tracking-tight leading-tight">
            Customise an experience for a private group
          </h2>
          
          {/* Minimalist "Get in touch" Ghost Button */}
          <button className="group relative px-8 py-3 border border-white/80 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-white hover:text-black">
            <span className="relative z-10">
              Get in touch
            </span>
          </button>
        </div>
      </div>

      {/* Subtle border for section separation */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
    </section>
  );
};

export default PrivateGroup;