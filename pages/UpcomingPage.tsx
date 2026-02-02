import React, { useState, useEffect, useMemo } from 'react';
import PrivateGroup from '../components/PrivateGroup';
import { Experience } from '../types';
import { getAllExperiences } from '../services/util/api';

interface UpcomingPageProps {
  initialLocation?: string;
  onAddToCart: (experience: Experience) => void;
  onViewDetail: (experience: Experience) => void;
}

const DATE_RANGES = ['Jan 10 - Jan 11', 'Jan 17 - Jan 18', 'Jan 24 - Jan 25'];

const UpcomingPage: React.FC<UpcomingPageProps> = ({
  initialLocation = 'All',
  onAddToCart,
  onViewDetail
}) => {
  const [selectedRange, setSelectedRange] = useState(DATE_RANGES[0]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  /* ================= FETCH (CACHED) ================= */
  useEffect(() => {
    getAllExperiences().then(setExperiences).catch(console.error);
  }, []);

  useEffect(() => {
    setSelectedLocation(initialLocation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialLocation]);

  /* ================= DERIVED DATA ================= */
  const filteredData = useMemo(() => {
    return experiences
      // ✅ TEMP: SHOW BOTH DRAFT + ACTIVE
      .filter(exp => exp.status === 'DRAFT' || exp.status === 'ACTIVE')
      .map(exp => {
        return {
          ...exp,
          /* UI COMPAT FIELDS (NO JSX CHANGE) */
          id: exp._id,
          title: exp.heading,
          category: exp.subheading,
          image: exp.experienceImages?.[0]?.url,
          price: `₹${exp.pricePerParticipant} for one participant`,
          priceValue: exp.pricePerParticipant,
          cityTag: exp.location?.locationId?.slice(0, 3),
          locationName: exp.location?.name
        };
      })
      // ✅ TEMP: ONLY LOCATION FILTER
      .filter(exp => {
        return (
          selectedLocation === 'All' ||
          exp.locationName === selectedLocation
        );
      });
  }, [experiences, selectedLocation]);

  return (
    <div className="bg-white">
      <section className="pt-40 pb-32 min-h-[70vh]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="flex flex-col items-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-medium text-[#bfa260] tracking-[0.05em] uppercase mb-12">
              {selectedLocation === 'All' ? 'UPCOMING' : selectedLocation}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {DATE_RANGES.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-6 py-1.5 rounded-full border text-[11px] font-bold tracking-tight transition-all duration-300 ${
                    selectedRange === range
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                      : 'bg-white text-zinc-900 border-zinc-300 hover:border-zinc-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredData.map((exp: any) => (
              <div
                key={exp.id}
                className="group flex flex-col cursor-pointer"
                onClick={() => onViewDetail(exp)}
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2">
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
                      className="bg-zinc-950 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-zinc-950"
                    >
                      View
                    </button>
                  </div>

                  <div className="absolute top-6 left-0 bg-[#e3ae3f] text-white px-5 py-1.5 rounded-r-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg z-10">
                    {exp.cityTag}
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-[22px] font-bold text-zinc-950 leading-tight group-hover:text-[#e3ae3f] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 font-medium">
                    {exp.category}
                  </p>
                  <p className="text-[13px] text-zinc-600 pt-2 font-bold">
                    {exp.price}
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

export default UpcomingPage;
