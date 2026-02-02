import React, { useState, useEffect } from 'react';
import { Experience } from '../types';
import PrivateGroup from '../components/PrivateGroup';

interface ExperienceDetailPageProps {
  experience: Experience;
  onAddToCart: (experience: Experience) => void;
  onNavigate: (page: any, param?: string) => void;
}

const LOCATIONS = [
  { name: 'Mumbai', code: 'MUM' },
  { name: 'Pune', code: 'PNQ' },
  { name: 'Delhi', code: 'DEL' },
  { name: 'Bangalore', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' },
  { name: 'Ahmedabad', code: 'AMD' }
];

const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  experience,
  onAddToCart,
  onNavigate
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  /* ================= SAFE DATA NORMALIZATION ================= */

  const gallery =
    experience.experienceImages?.length
      ? experience.experienceImages.map(img => img.url)
      : [];

const primaryHost = experience.host || null;



  const formattedDate = experience.experienceDate
    ? new Date(experience.experienceDate).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '';

  const timeRange =
    experience.startTime && experience.endTime
      ? `${experience.startTime} - ${experience.endTime}`
      : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [experience._id]);

  const handleReserveClick = () => {
    setIsLocationModalOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    onAddToCart({
      ...experience,
      location: { ...experience.location, name: location }
    });
    setIsLocationModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20">

          {/* LEFT: GALLERY */}
          <div className="space-y-6 overflow-hidden">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-50">
              {gallery[activeImgIdx] && (
                <img
                  src={gallery[activeImgIdx]}
                  alt={experience.heading}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              )}
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                      activeImgIdx === i
                        ? 'border-[#4b2545]'
                        : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col max-w-full overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-display font-medium text-[#4b2545] leading-[0.95] tracking-tight break-words">
              {experience.heading}
            </h1>

            <h2 className="text-lg md:text-2xl font-display italic text-[#4b2545]/70 mt-3 break-words">
              {experience.subheading}
            </h2>

            <div className="mt-8">
              <div className="text-2xl font-bold text-zinc-950">
                ₹{experience.pricePerParticipant?.toLocaleString()}
              </div>
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">
                (Inclusive of GST)
              </p>
            </div>

            <div className="space-y-6 mt-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
                  📅
                </div>
                <div>
                  <p className="text-sm font-bold">{formattedDate}</p>
                  <p className="text-xs text-zinc-500">{timeRange}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
                  📍
                </div>
                <div className="max-w-full">
                  <p className="text-sm font-bold break-words">
                    {experience.location?.name}
                  </p>
                  <p className="text-xs text-zinc-500 break-words">
                    {experience.experienceAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-zinc-600 text-sm md:text-base leading-relaxed font-light max-w-xl break-words">
              {experience.description}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={handleReserveClick}
                className="bg-zinc-950 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Reserve Spot
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border border-zinc-200 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Enquire Private
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOST ================= */}
{primaryHost && (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">

      <div className="relative w-full aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl bg-zinc-100">
        <img
          src={primaryHost.image?.url}
          alt={primaryHost.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div>
        <h3 className="text-4xl md:text-7xl font-display font-medium">
          {primaryHost.title}
        </h3>
        <p className="text-lg md:text-xl text-zinc-600 mt-6">
          {primaryHost.details}
        </p>
      </div>

    </div>
  </section>
)}



      {/* ================= FAQ ================= */}
      {experience.faqs?.length > 0 && (
        <section id="faq" className="py-20 bg-zinc-50">
          <div className="max-w-4xl mx-auto px-6">
            {experience.faqs.map((faq, i) => (
              <div key={i} className="mb-4 border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-6 flex justify-between text-left"
                >
                  <span className="font-bold break-words">{faq.question}</span>
                  <span>{activeFaq === i ? '−' : '+'}</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-zinc-600 break-words">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <PrivateGroup />

      {/* ================= LOCATION MODAL ================= */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsLocationModalOpen(false)}
          />
          <div className="relative bg-white max-w-xl w-full rounded-3xl p-10">
            <h3 className="text-3xl font-display font-medium mb-8 text-center">
              Select Location
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {LOCATIONS.map(loc => (
                <button
                  key={loc.code}
                  onClick={() => handleLocationSelect(loc.name)}
                  className="border rounded-xl py-6 font-bold"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetailPage;
