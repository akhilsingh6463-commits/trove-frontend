import React, { useRef, useState, useEffect } from 'react';
import { Experience } from '../types';
import PrivateGroup from '../components/PrivateGroup';

interface ExperienceDetailPageProps {
  experience: Experience;
  onAddToCart: (experience: Experience) => void;
  onNavigate: (page: any, param?: string) => void;
  onViewDetail: (experience: Experience) => void;
}

const LOCATIONS = [
  { name: 'Mumbai', code: 'MUM' },
  { name: 'Pune', code: 'PNQ' },
  { name: 'Delhi', code: 'DEL' },
  { name: 'Bangalore', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' },
  { name: 'Ahmedabad', code: 'AMD' }
];

const DEFAULT_EVENT_DATA = {
  time: "4:00 PM - 6:30 PM",
  address: "Greenr Cafe, Breach Candy, Mumbai",
  gallery: [
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=1200"
  ],
  deliverables: [
    "Introduction to premium spirits & equipment",
    "Step-by-step guidance on 3 classic cocktails",
    "Artisanal garnishing and presentation tips",
    "Personalized recipe card for home brewing",
    "Selection of gourmet appetizers"
  ],
  host: {
    name: "Vikram Sethi",
    role: "Master Mixologist & Spirits Alchemist",
    bio: "With over a decade of experience in high-end hospitality across the globe, Vikram deconstructs the science of flavor. His sessions are as much about history and storytelling as they are about the perfect pour.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  faqs: [
    { question: "Is this suitable for beginners?", answer: "Absolutely. We start from the basics and ensure everyone leaves with a solid understanding of the craft." },
    { question: "Are materials included?", answer: "Yes, all premium spirits, mixers, bar tools, and appetizers are included in the price." },
    { question: "What is the age requirement?", answer: "Participants must be at least 21 years old. Please carry a valid ID." },
    { question: "Can I cancel my booking?", answer: "We offer full refunds for cancellations made up to 48 hours before the event." },
    { question: "Do you offer private sessions?", answer: "Yes, we can curate bespoke experiences for private groups and corporate teams." },
    { question: "Where is the exact location?", answer: "The event is held at Greenr Cafe in Breach Candy. Detailed directions will be sent upon booking." }
  ],
  reviews: [
    { user: "Arjun M.", text: "A truly soul-stirring departure from the usual weekend bustle." },
    { user: "Priya K.", text: "The attention to detail was impeccable. Best workshop I've attended!" },
    { user: "Samir R.", text: "Vikram is a master of his craft. Learnt so much about flavor balancing." },
    { user: "Neha L.", text: "Trove creates magic. The atmosphere was intimate and high-end." },
    { user: "Kabir S.", text: "The perfect mix of education and entertainment. Highly recommended." },
    { user: "Ishani T.", text: "Intimate, artisanal, and thoroughly curated. Loved every second." }
  ]
};

const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ experience, onAddToCart, onNavigate }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  // Merge defaults for missing data
  const data = { ...DEFAULT_EVENT_DATA, ...experience };
  const gallery = data.gallery || [experience.image];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [experience.id]);

  const handleReserveClick = () => {
    setIsLocationModalOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    // Create a modified experience object with the chosen location and a unique ID for the cart
    const experienceWithLocation = {
      ...experience,
      id: `${experience.id}-${location}`, // Ensures same experience at different locations are distinct in cart
      location: location,
      cityTag: location.substring(0, 3).toUpperCase()
    };
    onAddToCart(experienceWithLocation);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 2. Experience Details Section (Reference Image Layout) */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Media Carousel & Thumbnails */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-zinc-900/5 bg-zinc-50 group">
              <img 
                src={gallery[activeImgIdx]} 
                alt={experience.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
                {gallery.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImgIdx === i ? 'w-6 bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnails grid */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              {gallery.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImgIdx(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImgIdx === i ? 'border-[#4b2545] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                  {i === 0 && <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Event Details */}
          <div className="flex flex-col pt-2">
             <div className="space-y-3 mb-8">
                <h1 className="text-4xl md:text-6xl font-display font-medium text-[#4b2545] leading-[0.95] tracking-tight">
                   {experience.title}
                </h1>
                <h2 className="text-lg md:text-2xl font-display italic text-[#4b2545]/70 leading-tight">
                   {experience.category}
                </h2>
             </div>

             <div className="mb-8">
                <div className="text-2xl font-bold text-zinc-950 tracking-tight">
                   {experience.price || `₹${experience.priceValue?.toLocaleString()}.00`}
                </div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">(Inclusive of 18% GST)</p>
             </div>

             <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-[#4b2545]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-950">{experience.date}</p>
                    <p className="text-xs text-zinc-500">{data.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-[#4b2545]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-950">{experience.location}</p>
                    <p className="text-xs text-zinc-500">{data.address}</p>
                  </div>
                </div>
             </div>

             <div className="space-y-5 text-zinc-600 text-sm md:text-base leading-relaxed font-light mb-10 max-w-xl">
               <p>
                 Discover the world of {experience.title.toLowerCase()} and spirits and learn how to make and balance your own {experience.title.split(' ').pop()?.toLowerCase()} concoction like a professional. 
               </p>
               <p>
                 The experience will include a quick introduction to different spirits, cocktail making techniques, bar equipment, interesting garnishing tips along with various stories and myths around cocktails and spirits, and some fun games.
               </p>
               <button onClick={() => {document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})}} className="text-zinc-950 font-bold underline underline-offset-4 decoration-zinc-200 hover:text-[#4b2545] transition-colors">View FAQs</button>
             </div>

             <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleReserveClick}
                  className="bg-zinc-950 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#4b2545] transition-all transform active:scale-95 shadow-xl shadow-zinc-900/10"
                >
                  Reserve Spot
                </button>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="border border-zinc-200 text-zinc-950 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-50 transition-all"
                >
                  Enquire Private
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLocationModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl animate-[reveal-up_0.6s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-10 right-10 text-zinc-300 hover:text-zinc-950 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mb-12">
               <span className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-4 block">SECURE DEPARTURE</span>
               <h3 className="text-3xl md:text-5xl font-display font-medium text-zinc-950 tracking-tight">Select Location</h3>
               <p className="mt-4 text-zinc-500 font-light italic">Choose where you wish to collect your fragments of joy.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {LOCATIONS.map((loc) => (
                <button 
                  key={loc.code}
                  onClick={() => handleLocationSelect(loc.name)}
                  className="group relative flex flex-col items-center py-8 border border-zinc-100 rounded-3xl hover:border-[#4b2545] hover:bg-zinc-50 transition-all duration-300 overflow-hidden"
                >
                  <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-[#4b2545]/40 mb-2 transition-colors">{loc.code}</span>
                  <span className="text-base md:text-lg font-bold text-zinc-900 group-hover:text-[#4b2545] transition-colors">{loc.name}</span>
                </button>
              ))}
            </div>
            
            <p className="mt-12 text-center text-[9px] font-bold text-zinc-300 uppercase tracking-[0.4em] italic">
              Discrete booking via Trove® Vault
            </p>
          </div>
        </div>
      )}

      {/* 3. What Will You Get Section */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
              <div className="w-full lg:w-1/3">
                 <h2 className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.7em] mb-4">THE ESSENTIALS</h2>
                 <h3 className="text-3xl md:text-5xl font-display font-medium text-zinc-950 tracking-tighter">What Will You Get?</h3>
              </div>
              <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {data.deliverables.map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-[1.8rem] border border-zinc-100 shadow-sm group hover:shadow-lg transition-all duration-500">
                    <div className="w-8 h-8 rounded-full bg-[#4b2545] flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <span className="text-sm md:text-base font-medium text-zinc-800 leading-tight flex items-center">{item}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* 4. About the Host Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-center">
             <div className="relative aspect-square md:aspect-auto md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl">
                <img src={data.host.image} className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0" alt={data.host.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
             </div>
             <div>
                <h2 className="text-[10px] font-black text-[#bfa260] uppercase tracking-[0.7em] mb-8">MEET THE STORYTELLER</h2>
                <h3 className="text-4xl md:text-7xl font-display font-medium text-zinc-950 mb-3 tracking-tighter">{data.host.name}</h3>
                <h4 className="text-lg md:text-2xl font-display italic text-zinc-400 mb-10">{data.host.role}</h4>
                <div className="h-px w-20 bg-[#4b2545]/20 mb-10"></div>
                <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed mb-10 italic">
                  "{data.host.bio}"
                </p>
                <button className="text-[10px] font-black text-zinc-950 uppercase tracking-[0.4em] border-b-2 border-zinc-950 pb-2 hover:text-[#4b2545] hover:border-[#4b2545] transition-all">
                  Read more legacy
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="py-20 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.7em] mb-4">CLARITY</h2>
              <h3 className="text-3xl md:text-6xl font-display font-medium text-zinc-950 tracking-tighter">Frequently Asked</h3>
           </div>
           
           <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <div key={i} className={`border border-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-500 ${activeFaq === i ? 'bg-white shadow-xl' : 'bg-white/50 hover:bg-white hover:border-zinc-300'}`}>
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-10 py-8 flex justify-between items-center text-left"
                  >
                    <span className="text-base md:text-lg font-bold text-zinc-950 leading-tight">{faq.question}</span>
                    <div className={`w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center transition-all duration-500 ${activeFaq === i ? 'rotate-180 bg-zinc-950 text-white border-zinc-950' : ''}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </button>
                  <div className={`px-10 overflow-hidden transition-all duration-500 ${activeFaq === i ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">{faq.answer}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. Reviews Continuous Scroll Marquee */}
      <section className="py-20 bg-zinc-950 overflow-hidden relative border-y border-white/5">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        
        <div className="flex whitespace-nowrap animate-marquee py-6">
          {[...data.reviews, ...data.reviews].map((rev, i) => (
            <div key={i} className="inline-block px-8 md:px-16 group">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-display italic text-white/90 group-hover:text-[#bfa260] transition-colors duration-500 leading-tight">
                  "{rev.text}"
                </span>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-6 h-px bg-white/20"></div>
                  <span className="text-[9px] md:text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.4em]">
                    {rev.user}
                  </span>
                  <div className="w-6 h-px bg-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Customise for Private Group Section */}
      <PrivateGroup />
    </div>
  );
};

export default ExperienceDetailPage;