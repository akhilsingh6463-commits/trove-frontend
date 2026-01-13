import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Group Picture Hero Section - The Collective Spirit */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-end justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2400" 
            alt="The Trove Collective" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.3] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6 pb-24 md:pb-32">
           <span className="block text-[10px] font-black uppercase tracking-[1.2em] text-[#e3ae3f] mb-8 animate-[fade-in_1s_ease-out]">
             THE ARCHITECTS OF WONDER
           </span>
           <h1 className="text-5xl md:text-9xl font-display font-medium text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
             The Collective<br/>
             <span className="italic font-light opacity-90 block mt-2 text-white/90">
               Behind the Magic
             </span>
           </h1>
        </div>
      </section>

      {/* 2. Welcome Section - The Mission */}
      <section className="max-w-5xl mx-auto px-6 py-32 md:py-48 text-center">
        <div className="space-y-16">
           <div className="flex flex-col items-center gap-6">
             <div className="w-16 h-px bg-zinc-200"></div>
             <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.8em]">WELCOME TO TROVE</h2>
             <div className="w-16 h-px bg-zinc-200"></div>
           </div>
           
           <div className="space-y-12">
             <p className="text-3xl md:text-5xl lg:text-6xl font-display italic text-zinc-950 leading-[1.1] tracking-tight max-w-4xl mx-auto">
               "We imagine new age lifestyle experiences <br className="hidden md:block"/> for the urban curious."
             </p>
             <div className="space-y-10 text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-16">
               <p>
                 Trove was born from a simple realization: our cities are overflowing with noise, but starving for wonder. We decided to bridge that gap by curating departures from the everyday.
               </p>
               <p>
                 We are a collective of architects, storytellers, and dreamers dedicated to the idea that a life well-lived is a collection of fragments—moments of mastery, silent discoveries, and shared joy.
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* 3. Our Philosophy - The Alchemy of Wonder */}
      <section className="bg-zinc-50 py-32 md:py-56 border-y border-zinc-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e3ae3f]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative group">
                <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-1000 group-hover:shadow-[0_80px_150px_-30px_rgba(227,174,63,0.2)]">
                  <img 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200" 
                    alt="Alchemy of Wonder" 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#e3ae3f]/10 mix-blend-multiply opacity-40"></div>
                </div>
                {/* Decorative float element */}
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block">
                   <p className="text-[10px] font-black text-[#e3ae3f] uppercase tracking-widest mb-1">CURIOSITY</p>
                   <p className="text-zinc-950 font-bold">is our compass.</p>
                </div>
             </div>
             
             <div className="space-y-14">
                <div className="inline-block">
                  <h2 className="text-[11px] font-black text-[#e3ae3f] uppercase tracking-[1em] mb-4">OUR PHILOSOPHY</h2>
                  <div className="w-12 h-1 bg-[#e3ae3f]/30"></div>
                </div>
                <h3 className="text-5xl md:text-8xl font-display font-medium text-zinc-950 leading-[1] tracking-tighter">
                  The Alchemy <br/><span className="italic font-light opacity-70">of Wonder.</span>
                </h3>
                <div className="space-y-8 text-zinc-600 font-light leading-relaxed text-lg md:text-xl max-w-lg">
                  <p>
                    We believe the most profound luxuries aren't objects, but state of minds. Our philosophy is rooted in <strong>Alchemy</strong>—the transformation of an ordinary weekend into a lifetime memory.
                  </p>
                  <p>
                    Every experience is curated with a lens of urban curiosity. We seek the niche, the artisanal, and the authentic, ensuring that every Trove departure is as meaningful as it is exclusive.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. What We Do - Architecting the Extraordinary */}
      <section className="py-32 md:py-56 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-24 text-center">
             <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[1em] mb-8">THE CRAFT</span>
             <h3 className="text-5xl md:text-7xl font-display font-medium text-zinc-950 tracking-tighter leading-tight">
               Architecting the<br/>Extraordinary
             </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
             <div className="space-y-8 p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-[#e3ae3f] flex items-center justify-center shadow-lg">
                   <span className="text-white font-black text-lg">01</span>
                </div>
                <h4 className="text-2xl font-bold text-zinc-950 tracking-tight">Curated<br/>Collaborations</h4>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">
                  We partner with master artisans, world-class mixologists, and silent experts of craft to design experiences that are otherwise inaccessible.
                </p>
             </div>
             
             <div className="space-y-8 p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-[#e3ae3f] flex items-center justify-center shadow-lg">
                   <span className="text-white font-black text-lg">02</span>
                </div>
                <h4 className="text-2xl font-bold text-zinc-950 tracking-tight">Urban<br/>Exploration</h4>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">
                  We scour the hidden corners of our cities—from forgotten rooftops to secret forest groves—to find the perfect stage for our departures.
                </p>
             </div>

             <div className="space-y-8 p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-[#e3ae3f] flex items-center justify-center shadow-lg">
                   <span className="text-white font-black text-lg">03</span>
                </div>
                <h4 className="text-2xl font-bold text-zinc-950 tracking-tight">Memory<br/>Weaving</h4>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">
                  Our experiences aren't just workshops. They are carefully paced narratives designed to foster connection, mastery, and a deep sense of presence.
                </p>
             </div>

             <div className="space-y-8 p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
                <div className="w-14 h-14 rounded-2xl bg-[#e3ae3f] flex items-center justify-center shadow-lg">
                   <span className="text-white font-black text-lg">04</span>
                </div>
                <h4 className="text-2xl font-bold text-zinc-950 tracking-tight">Private<br/>Concierge</h4>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">
                  For those who seek something truly bespoke, we offer high-end customization for private groups, corporate retreats, and celebrations.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Customise an experience for a private group - GET IN TOUCH Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2400" 
            alt="Private group experience"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-8 md:px-24 w-full">
          <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-2 rounded-full bg-[#e3ae3f] shadow-[0_0_15px_#e3ae3f]"></div>
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">PRIVATE COMMISSIONS</span>
             </div>
            <h2 className="text-4xl md:text-7xl font-normal text-white mb-12 tracking-tight leading-[1.05]">
              Customise an experience for a private group
            </h2>
            <button className="px-12 py-4 border border-white/40 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-2xl">
              GET IN TOUCH
            </button>
          </div>
        </div>
        
        {/* Subtle decorative elements for that "Architect" feel */}
        <div className="absolute bottom-12 right-12 text-white/10 hidden md:block">
           <p className="text-[80px] font-display leading-none select-none">Trove®</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;