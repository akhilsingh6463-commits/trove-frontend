import React from 'react';

interface FooterProps {
  onNavigate?: (page: any, param?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white text-zinc-950 pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Logo Section */}
          <div className="flex flex-col">
            <div className="flex flex-col items-start leading-none mb-2">
              <span 
                className="text-3xl font-display font-medium tracking-tight text-zinc-950 cursor-pointer"
                onClick={() => onNavigate?.('home')}
              >
                TROVE
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#9a8a6d] mt-2">
                EXPERIENCES<span className="opacity-50">®</span>
              </span>
            </div>
            <p className="mt-8 text-zinc-950/60 text-sm leading-relaxed max-w-[240px]">
              Imagining new age lifestyle experiences for the urban curious.
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-zinc-950">RESOURCES</h4>
            <ul className="space-y-5">
              <li>
                <button onClick={() => onNavigate?.('about')} className="text-zinc-950/70 hover:text-[#9a8a6d] transition-colors text-sm font-medium">About Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('contact')} className="text-zinc-950/70 hover:text-[#9a8a6d] transition-colors text-sm font-medium">Contact Us</button>
              </li>
              <li>
                <a href="#" className="text-zinc-950/70 hover:text-[#9a8a6d] transition-colors text-sm font-medium">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Get In Touch Section */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-zinc-950">CONNECT</h4>
            <div className="space-y-6">
              <p 
                className="text-zinc-950 text-base font-bold tracking-tight cursor-pointer hover:text-[#e3ae3f] transition-colors"
                onClick={() => onNavigate?.('contact')}
              >
                +91 82629 16889
              </p>
              <a href="mailto:hello@troveexperiences.com" className="text-zinc-950/70 hover:text-[#9a8a6d] transition-colors text-sm block font-medium underline underline-offset-8 decoration-zinc-100">
                hello@troveexperiences.com
              </a>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-2 italic">(Mon to Fri - 10AM to 7PM)</p>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-zinc-950">SOCIETY</h4>
            <div className="flex items-center gap-8">
              <a href="#" className="text-zinc-950 hover:text-[#9a8a6d] transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-zinc-950 hover:text-[#9a8a6d] transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-zinc-100 mb-12"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em]">
          <p>© 2026 Trove Experiences — India</p>
          <div className="mt-4 md:mt-0 flex gap-8 italic">
            <span>Designed for the Curiously Urban</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;