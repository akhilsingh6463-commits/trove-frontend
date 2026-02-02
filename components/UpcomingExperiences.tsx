import React, { useState, useRef, useEffect, useMemo } from 'react';
import { locationStore } from '../services/stores/locationStore';
import { Experience } from '../types';
import { getAllExperiences } from '../services/util/api';

interface UpcomingExperiencesProps {
  onAddToCart: (experience: Experience) => void;
  onViewDetail: (experience: Experience) => void;
}

const UpcomingExperiences: React.FC<UpcomingExperiencesProps> = ({
  onAddToCart,
  onViewDetail
}) => {
  const [activeCity, setActiveCity] = useState('ALL');
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [cities, setCities] = useState([{ code: 'ALL', name: 'All Locations' }]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH EXPERIENCES (CACHED) ================= */
  useEffect(() => {
    getAllExperiences().then(setExperiences).catch(console.error);
  }, []);

  /* ================= INIT LOCATIONS ================= */
  useEffect(() => {
    const initCities = async () => {
      await locationStore.init();
      setCities(locationStore.getCityFilters());
      setLoadingCities(false);
    };
    initCities();
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
    window.addEventListener('resize', checkScroll);
    checkScroll();

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [activeCity]);

  /* ================= DATA MAPPING (UI SAFE) ================= */
  const filteredExperiences = useMemo(() => {
    return experiences
      // ✅ TEMP: SHOW DRAFT + ACTIVE
      .filter(exp => exp.status === 'DRAFT' || exp.status === 'ACTIVE')
      .map(exp => ({
        ...exp,

        // 🔒 UI-compatible fields
        id: exp._id,
        title: exp.heading,
        category: exp.subheading,
        image: exp.experienceImages?.[0]?.url,
        price: `₹${exp.pricePerParticipant} for one participant`,
        date: new Date(exp.experienceDate).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        }),
        cityTag: exp.location?.locationId?.slice(0, 3),
        locationName: exp.location?.name
      }))
      .filter(exp => {
        if (activeCity === 'ALL') return true;
        return exp.cityTag === activeCity;
      });
  }, [experiences, activeCity]);

  return (
    <section id="upcoming" className="bg-white py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="px-6 md:px-12 flex flex-col items-center text-center mb-24">
          <h2 className="text-[11px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-6">
            UPCOMING EXPERIENCES
          </h2>
          <h3 className="text-4xl md:text-7xl font-display italic text-zinc-950 leading-tight mb-16 max-w-4xl tracking-tight">
            Curated departures from the everyday.
          </h3>

          {/* ================= LOCATIONS ================= */}
          <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center justify-center md:flex-wrap gap-x-12 gap-y-6 min-w-max md:min-w-0 px-8">
              {loadingCities ? (
                <div className="text-zinc-400 text-sm">Loading locations...</div>
              ) : (
                cities.map(city => (
                  <button
                    key={city.code}
                    onClick={() => setActiveCity(city.code)}
                    className={`group relative text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 pb-2 ${
                      activeCity === city.code
                        ? 'text-zinc-950'
                        : 'text-zinc-300 hover:text-zinc-500'
                    }`}
                  >
                    {city.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-zinc-950 transition-transform duration-500 origin-left ${
                        activeCity === city.code ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative group px-0 md:px-12">

          {/* NAV BUTTONS */}
          <div className="absolute -top-24 right-12 hidden md:flex gap-6 z-20">
            <button
              onClick={() => scrollRef.current && scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' })}
              className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm ${
                isAtStart ? 'opacity-30 pointer-events-none' : ''
              }`}
            >
              ‹
            </button>
            <button
              onClick={() => scrollRef.current && scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' })}
              className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm ${
                isAtEnd ? 'opacity-30 pointer-events-none' : ''
              }`}
            >
              ›
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-32 px-6 md:px-0"
          >
            {filteredExperiences.map((exp: any) => (
              <div
                key={exp.id}
                className="flex-shrink-0 w-[82vw] md:w-[480px] snap-center md:snap-start"
              >
                <div
                  onClick={() => onViewDetail(exp)}
                  className="relative aspect-[4/5] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden mb-12 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.1)] group/card cursor-pointer bg-zinc-50"
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover/card:scale-110 saturate-[0.75]"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(exp);
                      }}
                      className="bg-white text-zinc-950 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#e3ae3f] hover:text-white"
                    >
                      Add to Trove
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(exp);
                      }}
                      className="bg-zinc-950 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-zinc-950 border border-white/20"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="absolute top-8 left-8 px-5 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[10px] font-black tracking-widest text-zinc-950 uppercase">
                    {exp.cityTag}
                  </div>
                </div>

                <div className="px-4 md:px-12 space-y-4 text-center md:text-left">
                  <h3
                    className="text-3xl md:text-4xl font-display font-medium text-zinc-950 tracking-tight leading-tight cursor-pointer hover:text-[#9a8a6d]"
                    onClick={() => onViewDetail(exp)}
                  >
                    {exp.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">
                    {exp.date}
                  </p>
                  <p className="text-sm text-zinc-400 italic">
                    {exp.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default UpcomingExperiences;
