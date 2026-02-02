import React, { useState, useRef, useEffect, useMemo } from 'react';
import PrivateGroup from '../components/PrivateGroup';
import { Experience } from '../types';
import { getAllExperiences } from '../services/util/api';

interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

interface AllExperiencesPageProps {
  onNavigate: (
    page: 'home' | 'upcoming' | 'all-experiences' | 'category',
    param?: string
  ) => void;
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

const AllExperiencesPage: React.FC<AllExperiencesPageProps> = ({
  onNavigate,
  onViewDetail
}) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH EXPERIENCES (CACHED) ================= */
  useEffect(() => {
    getAllExperiences().then(setExperiences).catch(console.error);
  }, []);

  /* ================= SCROLL LOGIC ================= */
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 5);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  /* ================= MAP BACKEND → UI CARDS ================= */
  const catalogue: ExperienceCard[] = useMemo(() => {
    return experiences
      // ✅ TEMP: SHOW DRAFT + ACTIVE
      .filter(exp => exp.status === 'DRAFT' || exp.status === 'ACTIVE')
      .map(exp => ({
        id: exp._id,
        title: exp.heading,
        subtitle: exp.subheading,
        description: exp.description,
        image: exp.experienceImages?.[0]?.url,
        category: exp.skillLevel // using existing backend field
      }));
  }, [experiences]);

  const handleCardClick = (card: ExperienceCard) => {
    const exp = experiences.find(e => e._id === card.id);
    if (exp) onViewDetail(exp);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ================= PHILOSOPHY ================= */}
      <section className="pt-56 pb-32 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-10 opacity-40">
            <div className="w-10 h-px bg-zinc-950" />
            <span className="text-[10px] font-black tracking-[0.8em] uppercase">
              THE PHILOSOPHY
            </span>
            <div className="w-10 h-px bg-zinc-950" />
          </div>

          <h2 className="text-4xl md:text-7xl font-display font-medium text-zinc-950 leading-[1.1] tracking-tight mb-12 italic">
            "A life well-lived is a <span className="text-[#9a8a6d]">collection</span> of moments
            <br className="hidden md:block" />
            that leave you <span className="underline decoration-1 underline-offset-8 decoration-[#9a8a6d]/30">changed</span>."
          </h2>
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="py-24 border-y border-zinc-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {LOCATIONS.map(loc => (
              <button
                key={loc.code}
                onClick={() => onNavigate('upcoming', loc.name)}
                className="group relative flex flex-col items-center py-10 border border-zinc-100 rounded-3xl hover:border-[#bfa260] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#bfa260] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[11px] font-black text-zinc-400 group-hover:text-white/70 tracking-[0.4em] uppercase mb-3">
                  EXPLORE
                </span>
                <span className="relative z-10 text-lg font-display font-medium text-zinc-950 group-hover:text-white">
                  {loc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATALOGUE ================= */}
      <section className="py-40 bg-zinc-50 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto">

          <div className="px-6 md:px-12 mb-20 flex justify-between items-end">
            <div>
              <h2 className="text-[11px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-6">
                CURATED CATALOGUE
              </h2>
              <h3 className="text-5xl md:text-7xl font-display font-medium text-zinc-950 tracking-tighter">
                The Complete Series
              </h3>
            </div>

            <div className="flex gap-4 mb-2">
              <button
                onClick={() => scroll('left')}
                disabled={isAtStart}
                className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-white hover:bg-zinc-950 hover:text-white transition-all shadow-sm disabled:opacity-20"
              >
                ‹
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={isAtEnd}
                className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-white hover:bg-zinc-950 hover:text-white transition-all shadow-sm disabled:opacity-20"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 pb-8"
          >
            {catalogue.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-[480px] snap-center md:snap-start"
              >
                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden mb-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ring-1 ring-zinc-950/5">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-12 flex flex-col justify-end">
                    <p className="text-white/80 text-sm italic font-light leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-left px-4">
                  <h4 className="text-3xl font-display font-medium text-zinc-950 mb-3 tracking-tight group-hover:text-[#9a8a6d] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">
                    {card.subtitle}
                  </p>
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
