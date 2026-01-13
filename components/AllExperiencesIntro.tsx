import React, { useState, useRef, useEffect } from 'react';
import { Experience } from '../types';

interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const ALL_EXPERIENCES_CARDS: ExperienceCard[] = [
  {
    id: 'ae1',
    title: 'The Craft of Mixology',
    subtitle: 'Making & Mastering A Fine Cocktail',
    description: 'Learn the secrets of the bar. From balancing flavors to the art of the pour, become the master of your own home bar with guided instruction from expert mixologists.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ae2',
    title: 'Oasis Of Scents',
    subtitle: 'Artisanal Perfume Making',
    description: 'Follow your nose through a library of fragrances to formulate your own perfume. This experience will have you develop a discerning sense of smell, understand the nuances of perfumery and how fragrances create a lasting memory.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ae3',
    title: 'The Healing Power of Forests',
    subtitle: 'A Forest Bathing Experience',
    description: 'Step away from the digital world and reconnect with nature. Learn the Japanese art of Shinrin-yoku to reduce stress, improve well-being, and find a deep sense of peace among the trees.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1200'
  }
];

interface AllExperiencesIntroProps {
  onViewDetail: (experience: Experience) => void;
}

export default function AllExperiencesIntro({ onViewDetail }: AllExperiencesIntroProps) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft <= 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleCardClick = (card: ExperienceCard) => {
    // Convert minimal card to full experience type for navigation
    const exp: Experience = {
      id: card.id,
      title: card.title,
      category: card.subtitle,
      date: 'Next on Sat, 10th Jan.',
      location: 'Various Locations',
      price: '₹2,750 onwards',
      priceValue: 2750,
      image: card.image,
      cityTag: 'TROVE'
    };
    onViewDetail(exp);
  };

  return (
    <section id="all-experiences" className="bg-white overflow-hidden">
      {/* MANIFESTO SECTION */}
      <div className="w-full bg-gradient-to-br from-[#c9b48b] via-[#f2e8d0] to-[#bca77d] py-32 md:py-48 border-y border-[#9a8a6d]/30 relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 p-12 md:p-16 border-[1px] border-white/60 rounded-[4rem] bg-white/70 backdrop-blur-3xl shadow-[0_60px_130px_-20px_rgba(80,60,20,0.15)] ring-1 ring-zinc-950/5">
              <div className="flex flex-col items-start gap-8">
                 <div className="w-16 h-16 border border-zinc-950 rounded-2xl flex items-center justify-center rotate-12 bg-white/50 shadow-sm">
                    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                      <path d="M70 40C70 40 85 35 90 45C95 55 80 65 75 60M70 40C60 30 40 30 30 40C20 50 20 70 35 75C50 80 65 70 70 40ZM35 75L30 90M50 78L50 90" stroke="#111" strokeWidth="4.5" strokeLinecap="round"/>
                    </svg>
                 </div>
                 <p className="font-display text-4xl md:text-5xl text-zinc-950 leading-[1.05] italic">
                  "Experiences aren’t <span className="text-[#847355] not-italic font-bold underline decoration-2 underline-offset-8 decoration-[#847355]/40">bought</span>. They’re <span className="text-[#847355] not-italic font-bold underline decoration-2 underline-offset-8 decoration-[#847355]/40">felt</span>."
                 </p>
                 <p className="text-zinc-950 text-xl leading-relaxed max-w-md font-bold tracking-tight">
                   Curating departures for the urban curious. We collaborate with masters of craft to weave memories that resonate.
                 </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start lg:pl-20 order-1 lg:order-2">
              <div className="flex flex-col gap-2 mb-12">
                <span className="text-[10px] font-black text-zinc-950 tracking-[1.2em] opacity-40">EST. MMXXIV</span>
                <h2 className="text-[13px] font-black text-zinc-950 uppercase tracking-[1em] flex items-center gap-6">
                  <span className="w-12 h-[2px] bg-zinc-950"></span>
                  THE MANIFESTO
                </h2>
              </div>
              <div className="space-y-10">
                 <h3 className="text-6xl md:text-8xl font-display font-medium text-zinc-950 leading-[0.9] tracking-tighter">
                  Lustrous <br/><span className="italic font-light opacity-80 underline decoration-[#847355]/20 underline-offset-[-10px]">inspirations.</span>
                 </h3>
                 <div className="h-px w-full bg-zinc-950/10 max-w-sm"></div>
                 <p className="text-zinc-950/50 text-[11px] font-bold uppercase tracking-[0.6em]">
                   CURATED • EXCLUSIVE • URBAN
                 </p>
              </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white pt-32 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-12 h-px bg-zinc-200" />
            <h2 className="text-[11px] font-black text-[#9a8a6d] uppercase tracking-[0.8em]">
              THE CATALOGUE
            </h2>
            <div className="w-12 h-px bg-zinc-200" />
          </div>
          <h2 className="text-5xl md:text-[8rem] font-display font-medium text-zinc-950 tracking-tighter leading-none mb-4">
            All Experiences
          </h2>
        </div>
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto pb-48">
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-24 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-6 md:px-12"
        >
          {ALL_EXPERIENCES_CARDS.map((card) => (
            <div 
              key={card.id} 
              className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative overflow-hidden rounded-[4rem] bg-zinc-50 aspect-[3/4] mb-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 hover:shadow-2xl ring-1 ring-zinc-950/5">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-all duration-[3s] ease-out group-hover:scale-110 saturate-[0.85] group-hover:saturate-100" 
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 text-center md:text-left">
                    <p className="text-white/90 text-lg leading-relaxed mb-10 font-light italic">
                      {card.description}
                    </p>
                    <div className="flex items-center gap-6 text-[#bfa260] text-[11px] font-black uppercase tracking-[0.5em]">
                      View Departure
                      <div className="flex-1 h-px bg-[#bfa260]/40 transform origin-left scale-x-50 group-hover:scale-x-100 transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left px-6">
                <h3 className="text-4xl font-display font-medium text-zinc-950 tracking-tight mb-4 group-hover:text-[#9a8a6d] transition-colors leading-none">
                  {card.title}
                </h3>
                <p className="text-[11px] text-zinc-950 font-black uppercase tracking-[0.6em] mb-4 opacity-40">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}