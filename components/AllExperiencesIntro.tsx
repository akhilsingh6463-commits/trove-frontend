import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Experience } from '../types';
import { getAllExperiences } from '../services/util/api';

interface ExperienceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface AllExperiencesIntroProps {
  onViewDetail: (experience: Experience) => void;
}

export default function AllExperiencesIntro({ onViewDetail }: AllExperiencesIntroProps) {
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

  /* ================= MAP BACKEND → CARDS ================= */
  const cards: ExperienceCard[] = useMemo(() => {
    return experiences
      // ✅ TEMP: SHOW DRAFT + ACTIVE
      .filter(exp => exp.status === 'DRAFT' || exp.status === 'ACTIVE')
      .map(exp => ({
        id: exp._id,
        title: exp.heading,
        subtitle: exp.subheading,
        description: exp.description,
        image: exp.experienceImages?.[0]?.url
      }));
  }, [experiences]);

  const handleCardClick = (card: ExperienceCard) => {
    const exp = experiences.find(e => e._id === card.id);
    if (exp) onViewDetail(exp);
  };

  return (
    <section id="all-experiences" className="bg-white overflow-hidden">
      {/* ================= MANIFESTO ================= */}
      <div className="w-full bg-gradient-to-br from-[#c9b48b] via-[#f2e8d0] to-[#bca77d] py-32 md:py-48 border-y border-[#9a8a6d]/30 relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          {/* LEFT */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 p-12 md:p-16 border border-white/60 rounded-[4rem] bg-white/70 backdrop-blur-3xl shadow-[0_60px_130px_-20px_rgba(80,60,20,0.15)] ring-1 ring-zinc-950/5">
              <div className="flex flex-col items-start gap-8">
                <p className="font-display text-4xl md:text-5xl text-zinc-950 leading-[1.05] italic">
                  "Experiences aren’t <span className="text-[#847355] font-bold underline decoration-2 underline-offset-8 decoration-[#847355]/40">bought</span>. They’re <span className="text-[#847355] font-bold underline decoration-2 underline-offset-8 decoration-[#847355]/40">felt</span>."
                </p>
                <p className="text-zinc-950 text-xl leading-relaxed max-w-md font-bold tracking-tight">
                  Curating departures for the urban curious. We collaborate with masters of craft to weave memories that resonate.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center items-start lg:pl-20 order-1 lg:order-2">
            <h3 className="text-6xl md:text-8xl font-display font-medium text-zinc-950 leading-[0.9] tracking-tighter">
              Lustrous <br />
              <span className="italic font-light opacity-80 underline decoration-[#847355]/20 underline-offset-[-10px]">
                inspirations.
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="w-full bg-white pt-32 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-[8rem] font-display font-medium text-zinc-950 tracking-tighter leading-none mb-4">
            All Experiences
          </h2>
        </div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="relative w-full max-w-[1600px] mx-auto pb-48">
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-24 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-6 md:px-12"
        >
          {cards.map(card => (
            <div
              key={card.id}
              className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-auto snap-center"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative overflow-hidden rounded-[4rem] bg-zinc-50 aspect-[3/4] mb-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 hover:shadow-2xl ring-1 ring-zinc-950/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-all duration-[3s] ease-out group-hover:scale-110 saturate-[0.85]"
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-white/90 text-lg leading-relaxed mb-10 font-light italic">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-6 text-[#bfa260] text-[11px] font-black uppercase tracking-[0.5em]">
                    View Departure
                    <div className="flex-1 h-px bg-[#bfa260]/40" />
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left px-6">
                <h3 className="text-4xl font-display font-medium text-zinc-950 tracking-tight mb-4 group-hover:text-[#9a8a6d] transition-colors leading-none">
                  {card.title}
                </h3>
                <p className="text-[11px] text-zinc-950 font-black uppercase tracking-[0.6em] opacity-40">
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
