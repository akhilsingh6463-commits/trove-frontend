import React, { useState, useRef, useEffect } from 'react';
import PrivateGroup from '../components/PrivateGroup';
import { Experience } from '../types';

interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

const ALL_EXPERIENCES_CATALOGUE: ExperienceCard[] = [
  {
    id: 'ae1',
    title: 'The Craft of Mixology',
    subtitle: 'Making & Mastering A Fine Cocktail',
    description: 'Learn the secrets of the bar. From balancing flavors to the art of the pour, become the master of your own home bar.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200',
    category: 'Alcobev'
  },
  {
    id: 'ae2',
    title: 'Oasis Of Scents',
    subtitle: 'Artisanal Perfume Making',
    description: 'Follow your nose through a library of fragrances to formulate your own perfume.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200',
    category: 'Niche'
  },
  {
    id: 'ae3',
    title: 'The Healing Power of Forests',
    subtitle: 'A Forest Bathing Experience',
    description: 'Step away from the digital world and reconnect with nature. Learn the Japanese art of Shinrin-yoku.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1200',
    category: 'Wellness'
  },
  {
    id: 'ae4',
    title: 'Art of Horology',
    subtitle: 'Fine Watchmaking Workshop',
    description: 'Uncover the mechanical soul of time. A deep dive into the precision and beauty of watch movements.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200',
    category: 'Niche'
  },
  {
    id: 'ae5',
    title: 'Ceramic Poetry',
    subtitle: 'Wheel Throwing & Glazing',
    description: 'Find your rhythm on the potter\'s wheel. Create functional art from raw earth.',
    image: 'https://images.unsplash.com/photo-1565193998248-d500a721c7d8?auto=format&fit=crop&q=80&w=1200',
    category: 'Arts & Crafts'
  },
  {
    id: 'ae6',
    title: 'Culinary Alchemy',
    subtitle: 'Molecular Gastronomy Masterclass',
    description: 'Where science meets flavor. Experiment with textures and temperatures in a high-tech kitchen.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200',
    category: 'Food & Beverages'
  }
];

const LOCATIONS = [
  { name: 'Mumbai', code: 'MUM' },
  { name: 'Pune', code: 'PNQ' },
  { name: 'Delhi', code: 'DEL' },
  { name: 'Bangalore', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' },
  { name: 'Ahmedabad', code: 'AMD' }
];

interface AllExperiencesPageProps {
  onNavigate: (page: 'home' | 'upcoming' | 'all-experiences' | 'category', param?: string) => void;
  onViewDetail: (experience: Experience) => void;
}

const AllExperiencesPage: React.FC<AllExperiencesPageProps> = ({ onNavigate, onViewDetail }) => {
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
    const exp: Experience = {
      id: card.id,
      title: card.title,
      category: card.subtitle,
      date: 'Next on Sun, 11th Jan.',
      location: 'Various Locations',
      price: '₹2,750 onwards',
      priceValue: 2750,
      image: card.image,
      cityTag: 'TROVE'
    };
    onViewDetail(exp);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-56 pb-32 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-10 opacity-40">
            <div className="w-10 h-px bg-zinc-950" />
            <span className="text-[10px] font-black tracking-[0.8em] uppercase">THE PHILOSOPHY</span>
            <div className="w-10 h-px bg-zinc-950" />
          </div>
          <h2 className="text-4xl md:text-7xl font-display font-medium text-zinc-950 leading-[1.1] tracking-tight mb-12 italic">
            "A life well-lived is a <span className="text-[#9a8a6d]">collection</span> of moments <br className="hidden md:block"/> that leave you <span className="underline decoration-1 underline-offset-8 decoration-[#9a8a6d]/30">changed</span>."
          </h2>
        </div>
      </section>

      <section className="py-24 border-y border-zinc-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {LOCATIONS.map((loc) => (
              <button 
                key={loc.code}
                onClick={() => onNavigate('upcoming', loc.name)}
                className="group relative flex flex-col items-center py-10 border border-zinc-100 rounded-3xl hover:border-[#bfa260] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#bfa260] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[11px] font-black text-zinc-400 group-hover:text-white/70 tracking-[0.4em] uppercase mb-3 transition-colors">
                  EXPLORE
                </span>
                <span className="relative z-10 text-lg font-display font-medium text-zinc-950 group-hover:text-white transition-colors">
                  {loc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-zinc-50 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="px-6 md:px-12 mb-20 flex justify-between items-end">
            <div>
              <h2 className="text-[11px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-6">CURATED CATALOGUE</h2>
              <h3 className="text-5xl md:text-7xl font-display font-medium text-zinc-950 tracking-tighter">The Complete Series</h3>
            </div>
            
            <div className="flex gap-4 mb-2">
              <button 
                onClick={() => scroll('left')} 
                disabled={isAtStart}
                className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-white hover:bg-zinc-950 hover:text-white transition-all shadow-sm group/btn disabled:opacity-20 disabled:cursor-not-allowed`}
              >
                <svg className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button 
                onClick={() => scroll('right')} 
                disabled={isAtEnd}
                className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-white hover:bg-zinc-950 hover:text-white transition-all shadow-sm group/btn disabled:opacity-20 disabled:cursor-not-allowed`}
              >
                <svg className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 pb-8"
          >
            {ALL_EXPERIENCES_CATALOGUE.map((exp) => (
              <div key={exp.id} onClick={() => handleCardClick(exp)} className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-[480px] snap-center md:snap-start">
                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden mb-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ring-1 ring-zinc-950/5">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-12 flex flex-col justify-end">
                     <p className="text-white/80 text-sm italic font-light leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                       {exp.description}
                     </p>
                  </div>
                </div>
                <div className="text-center md:text-left px-4">
                  <h4 className="text-3xl font-display font-medium text-zinc-950 mb-3 tracking-tight group-hover:text-[#9a8a6d] transition-colors">{exp.title}</h4>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">{exp.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrivateGroup />
    </div>
  );
};

export default AllExperiencesPage;