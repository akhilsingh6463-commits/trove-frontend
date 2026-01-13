import React from 'react';
import { CartItem } from '../types';

interface CartPageProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onContinueShopping: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onRemove, onUpdateQuantity, onContinueShopping }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.priceValue || 0) * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-20 text-center">
           <span className="text-[10px] font-black text-[#e3ae3f] uppercase tracking-[0.8em] mb-6 block">
             YOUR SELECTION
           </span>
           <h1 className="text-5xl md:text-7xl font-display font-medium text-zinc-950 tracking-tighter">
             The Collection
           </h1>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-32 text-center">
             <div className="w-24 h-24 border border-zinc-100 rounded-full flex items-center justify-center mb-10 opacity-30">
                <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
             </div>
             <p className="text-2xl font-display italic text-zinc-400 mb-12">
               "Your Trove is currently awaiting its first departure."
             </p>
             <button 
                onClick={onContinueShopping}
                className="px-10 py-3 bg-zinc-950 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#e3ae3f] transition-all transform hover:scale-105"
             >
               Discover Experiences
             </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-20">
            {/* Cart Items List */}
            <div className="space-y-12">
              {items.map((item) => (
                <div key={item.id} className="group flex flex-col md:flex-row gap-10 pb-12 border-b border-zinc-100">
                  <div className="relative w-full md:w-64 aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-50 shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center py-4">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-[10px] font-black text-[#e3ae3f] uppercase tracking-widest mb-2 block">
                            {item.cityTag} • {item.category}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-display font-medium text-zinc-950 tracking-tight leading-none mb-4">
                            {item.title}
                          </h3>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-zinc-300 hover:text-zinc-950 transition-colors p-2"
                        >
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                     </div>
                     
                     <p className="text-zinc-500 font-light mb-8 italic">
                       {item.date}
                     </p>

                     <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-6 border border-zinc-100 rounded-full px-6 py-2">
                           <button 
                             onClick={() => onUpdateQuantity(item.id, -1)}
                             className="text-zinc-400 hover:text-zinc-950 font-black"
                           >—</button>
                           <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                           <button 
                             onClick={() => onUpdateQuantity(item.id, 1)}
                             className="text-zinc-400 hover:text-zinc-950 font-black"
                           >+</button>
                        </div>
                        <div className="text-right">
                           <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">Subtotal</p>
                           <p className="text-xl font-bold text-zinc-950">₹{((item.priceValue || 0) * item.quantity).toLocaleString()}</p>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={onContinueShopping}
                className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-950 transition-colors flex items-center gap-4 group"
              >
                <span className="group-hover:-translate-x-2 transition-transform">←</span> CONTINUE EXPLORING
              </button>
            </div>

            {/* Order Summary */}
            <div className="relative">
              <div className="sticky top-40 bg-zinc-50 border border-zinc-100 rounded-[3rem] p-12">
                 <h2 className="text-[11px] font-black text-zinc-950 uppercase tracking-[0.6em] mb-10 pb-6 border-b border-zinc-200">
                   INVESTMENT SUMMARY
                 </h2>
                 
                 <div className="space-y-6 mb-12">
                    <div className="flex justify-between text-sm">
                       <span className="text-zinc-500 font-light italic">Experiences ({items.length})</span>
                       <span className="text-zinc-950 font-bold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-zinc-500 font-light italic">GST (18%)</span>
                       <span className="text-zinc-950 font-bold">₹{(subtotal * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="pt-6 border-t border-zinc-200 flex justify-between items-end">
                       <span className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Grand Total</span>
                       <span className="text-3xl font-display font-medium text-[#e3ae3f]">
                         ₹{(subtotal * 1.18).toLocaleString()}
                       </span>
                    </div>
                 </div>

                 <button className="w-full bg-zinc-950 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#e3ae3f] transition-all transform active:scale-95 shadow-2xl shadow-zinc-900/10 mb-6">
                   Finalise Collection
                 </button>
                 
                 <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest italic opacity-60">
                   Discrete checkout secure via Trove® Vault
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;