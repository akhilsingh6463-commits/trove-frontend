import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="bg-white min-h-screen pt-48 pb-32 flex items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black text-[#e3ae3f] uppercase tracking-[0.8em] mb-6 block">
            {isSignUp ? 'JOIN THE COLLECTIVE' : 'WELCOME BACK'}
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-medium text-zinc-950 tracking-tighter">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="mt-6 text-zinc-400 text-sm font-light italic">
            {isSignUp 
              ? 'Begin your journey into the extraordinary.' 
              : 'Reconnect with your curated sources of joy.'}
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-100 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Julian Vane"
                  className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-950 placeholder:text-zinc-200 focus:outline-none focus:border-[#e3ae3f] transition-all"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="julian@example.com"
                className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-950 placeholder:text-zinc-200 focus:outline-none focus:border-[#e3ae3f] transition-all"
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-950 placeholder:text-zinc-200 focus:outline-none focus:border-[#e3ae3f] transition-all"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
                {!isSignUp && (
                  <button type="button" className="text-[9px] font-bold text-[#e3ae3f] uppercase tracking-widest hover:text-zinc-950 transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-950 placeholder:text-zinc-200 focus:outline-none focus:border-[#e3ae3f] transition-all"
              />
            </div>

            <button className="w-full bg-zinc-950 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#e3ae3f] transition-all transform active:scale-95 shadow-2xl shadow-zinc-900/10 mt-4">
              {isSignUp ? 'Sign Up Now' : 'Sign In'}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-zinc-200 text-center">
            <p className="text-zinc-400 text-[11px] font-medium tracking-tight">
              {isSignUp ? 'Already a member?' : "Don't have an account yet?"}
            </p>
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-3 text-[10px] font-black text-zinc-950 uppercase tracking-[0.2em] hover:text-[#e3ae3f] transition-colors pb-1 border-b-2 border-zinc-950 hover:border-[#e3ae3f]"
            >
              {isSignUp ? 'Sign In Instead' : 'Sign Up Now'}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center opacity-40">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.5em]">
            SECURE ACCESS • TROVE® VAULT
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;