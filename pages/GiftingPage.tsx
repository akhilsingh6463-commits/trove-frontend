import React from 'react';

const OCCASIONS = [
  {
    title: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200',
    tag: 'e-Gift Card'
  },
  {
    title: 'Anniversaries',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    tag: 'e-Gift Card'
  },
  {
    title: 'Little Celebrations',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200',
    tag: 'e-Gift Card'
  }
];

const GiftingPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
           src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=2000" 
            alt="The Essence of Gifting" 
            className="w-full h-full object-cover opacity-60 brightness-[0.7] saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
           <span className="block text-[10px] font-black uppercase tracking-[1em] text-[#e3ae3f] mb-8 animate-pulse">
             THE ETERNAL TREASURE
           </span>
           <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-display font-medium text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
             Beyond the Wrap:<br/>
             <span className="italic font-light opacity-90 block mt-4 text-white/95">
               Gifting a Fragment of Time
             </span>
           </h1>
           <div className="mt-16 w-24 h-px bg-gradient-to-r from-transparent via-[#e3ae3f] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="max-w-4xl mx-auto px-6 py-32 md:py-48 text-center">
        <div className="space-y-16">
           <div className="flex flex-col items-center gap-4">
             <div className="w-px h-16 bg-gradient-to-b from-[#e3ae3f] to-transparent"></div>
             <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.6em]">A NEW TRADITION</h2>
           </div>
           
           <div className="space-y-12 text-zinc-900">
             <p className="text-2xl md:text-3xl font-display italic leading-relaxed max-w-3xl mx-auto">
               "Possessions fade, but discovery is permanent. We believe the ultimate luxury is the feeling of wonder."
             </p>
             <div className="space-y-10 text-zinc-500 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
               <p>
                 At Trove, we don't gift things. We gift departures. We gift the silent anticipation of a new skill, the laughter shared over a crafted cocktail, and the profound stillness of a forest at dawn.
               </p>
               <p>
                 Give those you love a piece of the world they haven't seen yet. An invitation to wander, to learn, and to enrich their personal treasure trove of memories.
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* Occasions Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24">
             <h2 className="text-[11px] font-black text-[#e3ae3f] uppercase tracking-[1em] mb-6">
               BY OCCASION
             </h2>
             <div className="w-12 h-px bg-[#e3ae3f]/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {OCCASIONS.map((occasion, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-xl transition-all duration-1000 group-hover:shadow-2xl">
                  <img 
                    src={occasion.image} 
                    alt={occasion.title} 
                    className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Purchase Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/95 backdrop-blur-md px-8 py-3 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-700">
                      <span className="text-[10px] font-black text-zinc-950 tracking-widest uppercase">Select Gift Card</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-zinc-950 mb-1 group-hover:text-[#e3ae3f] transition-colors">{occasion.title}</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{occasion.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Private Group Section - Requested placement */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden bg-black mt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2400" 
            alt="Private group dining"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-8 md:px-24 w-full">
          <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#e3ae3f]"></div>
                <div className="w-6 h-6 rounded-full border border-white/20"></div>
             </div>
            <h2 className="text-3xl md:text-6xl font-normal text-white mb-10 tracking-tight leading-tight">
              Customise an experience for a private group
            </h2>
            <button className="px-10 py-3 border border-white/60 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-white hover:text-black">
              GET IN TOUCH
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftingPage;