import React, { useState, useEffect, useRef } from 'react';

interface Recommendation {
  mood: string;
  activity: string;
  reason: string;
  matchScore: number;
}

const STATIC_RECOMMENDATIONS: Recommendation[] = [
  {
    mood: "Serene & Grounded",
    activity: "Forest Bathing in the Northern Groves",
    reason: "A poetic escape into the ancient rhythm of the trees, designed to recalibrate your senses.",
    matchScore: 98
  },
  {
    mood: "Creative & Artisanal",
    activity: "Wheel Throwing Masterclass",
    reason: "A tactile journey into the alchemy of clay, finding stillness in the movement of the potter's wheel.",
    matchScore: 94
  },
  {
    mood: "Refined & Sensory",
    activity: "The Art of Mixology",
    reason: "Explore the architecture of flavor through balanced spirits and artisanal botanicals.",
    matchScore: 91
  },
  {
    mood: "Niche & Precise",
    activity: "Watchmaking Workshop",
    reason: "Uncover the mechanical heart of time, where precision meets unparalleled craftsmanship.",
    matchScore: 89
  },
  {
    mood: "Atmospheric & Deep",
    activity: "Perfume Formulation Lab",
    reason: "Synthesize your personal aura using rare essences and historical fragrance libraries.",
    matchScore: 87
  }
];

interface AIConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 500);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    // Simulate a brief discovery period without using an external API
    setTimeout(() => {
      const searchTerm = input.toLowerCase();
      const filtered = STATIC_RECOMMENDATIONS.filter(rec => 
        rec.activity.toLowerCase().includes(searchTerm) || 
        rec.mood.toLowerCase().includes(searchTerm) ||
        rec.reason.toLowerCase().includes(searchTerm)
      );
      
      // If no exact match, show a random selection of the best curations
      setResults(filtered.length > 0 ? filtered : STATIC_RECOMMENDATIONS.slice(0, 3));
      setLoading(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
      <div 
        className="absolute inset-0 bg-white/70 backdrop-blur-2xl transition-opacity duration-700"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-white border border-zinc-100 rounded-[3rem] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.08)] flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 text-zinc-300 hover:text-zinc-900 transition-all z-10 p-2 hover:rotate-90"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-12 md:p-20 overflow-y-auto no-scrollbar">
          <header className="mb-16 text-center">
            <h2 className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-[0.8em] mb-6">THE DISCOVERY</h2>
            <h3 className="font-display italic text-4xl md:text-6xl text-zinc-900 tracking-tight">What does your soul seek?</h3>
          </header>

          <form onSubmit={handleSearch} className="relative mb-24 max-w-3xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I seek something quiet and grounded in nature..."
              className="w-full bg-transparent border-b border-zinc-200 py-8 text-2xl md:text-3xl text-zinc-900 placeholder:text-zinc-200 focus:outline-none focus:border-zinc-900 transition-all font-light"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-900 hover:scale-125 transition-all disabled:opacity-20"
            >
              {loading ? (
                <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((rec, idx) => (
              <div 
                key={idx} 
                className="group p-10 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 animate-[reveal-up_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[10px] font-black text-[#9a8a6d] uppercase tracking-widest opacity-80">
                    {rec.mood}
                  </div>
                  <div className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">
                    {rec.matchScore}% Curated
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#9a8a6d] transition-colors leading-snug">
                  {rec.activity}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed italic font-light opacity-80">
                  "{rec.reason}"
                </p>
                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#9a8a6d]" />
                   <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">Explore departure</span>
                </div>
              </div>
            ))}
          </div>

          {!loading && results.length === 0 && (
            <div className="text-center py-24 opacity-20">
               <div className="w-16 h-16 border-2 border-zinc-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#9a8a6d] rounded-full animate-ping" />
               </div>
               <p className="text-[11px] uppercase tracking-[0.6em] text-zinc-400 font-bold">Whisper your intention</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;