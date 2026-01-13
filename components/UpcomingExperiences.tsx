import React, { useState, useRef, useEffect } from 'react';
import { locationStore } from '../services/stores/locationStore'; // ✅ Add this import
import { Experience } from '../types';

const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    title: 'The Healing Power of Forests',
    category: 'A Forest Bathing Experience',
    date: 'Next on Sat, 10th Jan.',
    location: 'Ahmedabad',
    price: '₹2,000 for one participant',
    priceValue: 2000,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    cityTag: 'AMD'
  },
  {
    id: 'e2',
    title: 'Hula Harmony',
    category: 'Explore Movement Through Hooping',
    date: 'Next on Sat, 10th Jan.',
    location: 'Hyderabad',
    price: '₹1,500 for one participant',
    priceValue: 1500,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c64b5ca5?auto=format&fit=crop&q=80&w=1200',
    cityTag: 'HYD'
  },
  {
    id: 'e3',
    title: 'The Balancing Act',
    category: 'A Slacklining Experience',
    date: 'Next on Sat, 10th Jan.',
    location: 'Pune',
    price: '₹1,650 for one participant',
    priceValue: 1650,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
    cityTag: 'PNQ'
  },
  {
    id: 'e4',
    title: 'Threads of Expression',
    category: 'A Tapestry Weaving Experience',
    date: 'Next on Sat, 10th Jan.',
    location: 'Pune',
    price: '₹2,500 for one participant',
    priceValue: 2500,
    image: 'https://images.unsplash.com/photo-1528813145864-7036666fd177?auto=format&fit=crop&q=80&w=1200',
    cityTag: 'PNQ'
  },
  {
    id: 'e5',
    title: 'Pottery in the Park',
    category: 'Ceramic Arts Workshop',
    date: 'Next on Sun, 11th Jan.',
    location: 'Mumbai',
    price: '₹3,200 for one participant',
    priceValue: 3200,
    image: 'https://images.unsplash.com/photo-1565193998248-d500a721c7d8?auto=format&fit=crop&q=80&w=1200',
    cityTag: 'MUM'
  }
];

interface UpcomingExperiencesProps {
  onAddToCart: (experience: Experience) => void;
  onViewDetail: (experience: Experience) => void;
}

const UpcomingExperiences: React.FC<UpcomingExperiencesProps> = ({ onAddToCart, onViewDetail }) => {
  const [activeCity, setActiveCity] = useState('ALL');
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [cities, setCities] = useState([{ code: 'ALL', name: 'All Locations' }]); // ✅ Dynamic cities from API
  const [loadingCities, setLoadingCities] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ Initialize locationStore + get cities
  useEffect(() => {
    const initCities = async () => {
      await locationStore.init();
      setCities(locationStore.getCityFilters());
      setLoadingCities(false);
    };
    initCities();
  }, []);

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
  }, [activeCity]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = window.innerWidth < 768 ? clientWidth * 0.8 : clientWidth;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // ✅ Filter experiences by active city tag
  const filteredExperiences = EXPERIENCES.filter(exp => {
    if (activeCity === 'ALL') return true;
    return exp.cityTag === activeCity;
  });

  return (
    <section id="upcoming" className="bg-white py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-6 md:px-12 flex flex-col items-center text-center mb-24">
          <h2 className="text-[11px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-6">
            UPCOMING EXPERIENCES
          </h2>
          <h3 className="text-4xl md:text-7xl font-display italic text-zinc-950 leading-tight mb-16 max-w-4xl tracking-tight">
            Curated departures from the everyday.
          </h3>

          {/* ✅ DYNAMIC CITIES from /api/locations */}
          <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center justify-center md:flex-wrap gap-x-12 gap-y-6 min-w-max md:min-w-0 px-8">
              {loadingCities ? (
                <div className="text-zinc-400 text-sm">Loading locations...</div>
              ) : (
                cities.map((city) => (
                  <button 
                    key={city.code}
                    onClick={() => setActiveCity(city.code)}
                    className={`group relative text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 pb-2 ${
                      activeCity === city.code ? 'text-zinc-950' : 'text-zinc-300 hover:text-zinc-500'
                    }`}
                  >
                    {city.name}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-zinc-950 transition-transform duration-500 origin-left ${
                      activeCity === city.code ? 'scale-x-100' : 'scale-x-0'
                    }`} />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="relative group px-0 md:px-12">
          <div className="absolute -top-24 right-12 hidden md:flex gap-6 z-20">
            <button 
              onClick={() => scroll('left')} 
              className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm ${isAtStart ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="1" /></svg>
            </button>
            <button 
              onClick={() => scroll('right')} 
              className={`w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm ${isAtEnd ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="1" /></svg>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-32 px-6 md:px-0"
          >
            {filteredExperiences.map((exp) => (
              <div 
                key={exp.id} 
                className="flex-shrink-0 w-[82vw] md:w-[480px] snap-center md:snap-start transition-all duration-1000"
              >
                <div 
                  onClick={() => onViewDetail(exp)}
                  className="relative aspect-[4/5] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden mb-12 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.1)] group/card cursor-pointer bg-zinc-50"
                >
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover/card:scale-110 saturate-[0.75]" />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(exp); }}
                      className="bg-white text-zinc-950 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 hover:bg-[#e3ae3f] hover:text-white"
                    >
                      Add to Trove
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onViewDetail(exp); }}
                      className="bg-zinc-950 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 hover:bg-white hover:text-zinc-950 border border-white/20"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="absolute top-8 left-8 px-5 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[10px] font-black tracking-widest text-zinc-950 uppercase">
                    {exp.cityTag}
                  </div>
                </div>

                <div className="px-4 md:px-12 space-y-4 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-zinc-950 tracking-tight leading-tight cursor-pointer hover:text-[#9a8a6d] transition-colors" onClick={() => onViewDetail(exp)}>{exp.title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#9a8a6d]" />
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">{exp.date}</p>
                  </div>
                  <p className="text-sm text-zinc-400 italic">{exp.price}</p>
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
