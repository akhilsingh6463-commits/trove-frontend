import React from 'react';

const GroupsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=2000" 
          alt="Shared Experience" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
           <span className="block text-[10px] font-black uppercase tracking-[0.8em] text-[#e3ae3f] mb-6 animate-pulse">
             MASTERING TOGETHERNESS
           </span>
           <h1 className="text-4xl md:text-7xl font-display font-medium text-white tracking-tight leading-[1.1]">
             Collective Alchemy:<br/>
             <span className="italic font-light opacity-90">Curated Departures For Your Tribe</span>
           </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center md:text-left">
        <div className="space-y-10 text-zinc-600 text-sm md:text-base leading-relaxed font-light">
          <p>
            New experiences have the power to transform us, to inspire us, or at the very least to enrich our lives with fun stories to narrate to our loved ones. Even better when you can enjoy meaningful experiences with your group or cohort.
          </p>
          <p>
            At Trove, we've had the privilege of hosting experiences for various private, corporate and social groups.
          </p>
          <p>
            Looking for new things to do with friends, family or colleagues? Get customisation options on your group bookings with Trove Experiences.
          </p>
          
          <div className="pt-4 flex justify-center md:justify-start">
            <button className="bg-[#e3ae3f] hover:bg-[#bfa260] text-white px-10 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-[#e3ae3f]/20">
              Enquire Now
            </button>
          </div>
        </div>

        {/* Clientele Section */}
        <div className="mt-32">
          <div className="flex flex-col items-center md:items-start mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-950 tracking-tight uppercase">
              OUR CLIENTELE
            </h2>
            <div className="w-16 h-1 bg-[#e3ae3f] mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-10 border border-zinc-100">
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <div className="flex flex-col items-center gap-1">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_logo%2C_2010.svg" alt="Mercedes" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all" />
                 <span className="text-[8px] font-bold text-zinc-400">Mercedes-Benz</span>
               </div>
               <img src="https://companieslogo.com/img/orig/JAWA.BO_BIG-c2ec441c.png?t=1635832777" alt="Jawa" className="h-8 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>

            {/* Box 2 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-8 border border-zinc-100">
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/McKinsey_%26_Company_logo.svg" alt="McKinsey" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Boston_Consulting_Group_logo.svg" alt="BCG" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" alt="Deloitte" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Bain_%26_Company_logo.svg" alt="Bain" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>

            {/* Box 3 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-8 border border-zinc-100">
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" alt="Adobe" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>

            {/* Box 4 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-8 border border-zinc-100">
               <div className="bg-black p-2 px-4 rounded">
                 <span className="text-white text-[10px] font-bold uppercase tracking-widest">SHOPPERS STOP</span>
               </div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg" alt="P&G" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Morphy_Richards_logo.svg" alt="Morphy Richards" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>

            {/* Box 5 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-8 border border-zinc-100">
               <div className="flex items-center gap-2 bg-[#901e1e] p-2 rounded">
                  <div className="bg-white p-0.5 rounded-sm"><div className="w-4 h-4 bg-[#901e1e] border border-white"></div></div>
                  <span className="text-white text-[8px] font-bold leading-tight">IDFC FIRST<br/>Bank</span>
               </div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Liberty_Mutual_logo.svg" alt="Liberty" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Addepar_logo.svg" alt="Addepar" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Kotak_Mahindra_Bank_logo.svg" alt="Kotak" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>

            {/* Box 6 */}
            <div className="bg-zinc-50 rounded-2xl p-10 flex flex-wrap justify-center items-center gap-8 border border-zinc-100">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Cipla_logo.svg" alt="Cipla" className="h-6 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/DFE_Pharma_logo.svg" alt="DFE" className="h-8 opacity-70 grayscale hover:grayscale-0 transition-all" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/CNBC_TV18_logo.svg" alt="CNBC" className="h-8 opacity-70 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* What's a Trove Experience Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center md:items-start mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-[#0f172a] tracking-tight uppercase">
              WHAT'S A TROVE 'EXPERIENCE'
            </h2>
            <div className="w-20 h-1 bg-[#e3ae3f] mt-3"></div>
          </div>
          
          <div className="space-y-8 text-zinc-600 text-[14px] md:text-[16px] leading-relaxed font-light">
            <p>
              As our cities swell, we tend to do fewer and repetitive things for recreation. With Trove, you get to break the monotony and explore fresh activities in your city, meet like-minded souls, and develop a deeper appreciation for the finer things.
            </p>
            <p>
              Most of us likely resonate with terms like 'workshops' or 'events.' What makes these an 'experience' is the energies we put into scouring the right artists, creators and storytellers to ensure that each Trove Experience leaves you enriched with meaningful moments to collect for your very own treasure trove.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section - Golden Background */}
      <section className="bg-gradient-to-r from-[#e3ae3f] to-[#bfa260] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-zinc-950 mb-2">200+</span>
              <span className="text-[10px] md:text-[12px] font-bold text-zinc-950/70 uppercase tracking-widest">Experiences</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-zinc-950 mb-2">4000+</span>
              <span className="text-[10px] md:text-[12px] font-bold text-zinc-950/70 uppercase tracking-widest">Participants</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-zinc-950 mb-2">20+</span>
              <span className="text-[10px] md:text-[12px] font-bold text-zinc-950/70 uppercase tracking-widest">States</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-zinc-950 mb-2">10+</span>
              <span className="text-[10px] md:text-[12px] font-bold text-zinc-950/70 uppercase tracking-widest">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Private Group Customisation Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" 
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

      {/* Get In Touch Section (Contact Details) */}
      <section className="bg-zinc-50 py-32 md:py-48">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-8 block">
            THE NEXT STEP
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-zinc-950 mb-12 tracking-tight">
            Ready to craft your <br className="hidden md:block" /> tribe's next masterpiece?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mt-16">
            <div className="group cursor-pointer">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Email Us</p>
              <a href="mailto:hello@troveexperiences.com" className="text-xl md:text-2xl font-medium text-zinc-950 hover:text-[#e3ae3f] transition-colors border-b border-zinc-200 pb-2 inline-block">
                hello@troveexperiences.com
              </a>
            </div>
            <div className="group cursor-pointer">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Talk to a Concierge</p>
              <a href="tel:+918262916889" className="text-xl md:text-2xl font-medium text-zinc-950 hover:text-[#e3ae3f] transition-colors border-b border-zinc-200 pb-2 inline-block">
                +91 82629 16889
              </a>
            </div>
          </div>
          <p className="mt-20 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] italic opacity-60">
            Available Mon-Fri, 10 AM to 7 PM
          </p>
        </div>
      </section>
    </div>
  );
};

export default GroupsPage;