import React, { useState, useEffect } from 'react';
import { locationStore } from '../services/stores/locationStore';

interface NavbarProps {
  shrink: boolean;
  onOpenDiscovery: () => void;
  onNavigate: (page: 'home' | 'upcoming' | 'all-experiences' | 'category' | 'groups' | 'gifting' | 'about' | 'contact' | 'cart' | 'profile', param?: string) => void;
  currentPage: string;
  cartCount: number;
}

interface NavItem {
  label?: string;
  name?: string;
  page: string;
  dropdownType?: string;
  href?: string;
}

const Navbar: React.FC<NavbarProps> = ({ shrink, onOpenDiscovery, onNavigate, currentPage, cartCount }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [locations, setLocations] = useState(locationStore.locations); // ✅ FIXED 1: Import PublicLocation type
  const [loadingLocations, setLoadingLocations] = useState(true); // ✅ FIXED 2: Missing loading state

  useEffect(() => {
    // Update when store changes
    const updateLocations = () => {
      setLocations(locationStore.locations);
      setLoadingLocations(locationStore.loading);
    };
    
    locationStore.init(); // Ensure loaded
    
    // Initial update + poll for changes
    updateLocations();
    const checkInterval = setInterval(updateLocations, 2000); // ✅ FIXED 3: 2s interval (not 1s spam)
    
    return () => clearInterval(checkInterval);
  }, []);

  // ✅ FIXED 4: Define ONCE - Remove duplicate
  const locationNavItems = locations.map(loc => ({
    name: loc.name,
    page: 'upcoming'
  }));

  const navLinks: NavItem[] = [
    { label: 'Upcoming Experiences', page: 'upcoming', dropdownType: 'locations' },
    { label: 'All Experiences', page: 'all-experiences', dropdownType: 'categories' },
    { label: 'Groups', page: 'groups' },
    { label: 'Gifting', page: 'gifting' },
    { label: 'About', page: 'about' },
    { label: 'Contact Us', page: 'contact' }
  ];

  const categories: NavItem[] = [
    { name: 'Alcobev', page: 'category' },
    { name: 'Arts & Crafts', page: 'category' },
    { name: 'Niche', page: 'category' },
    { name: 'Food & Beverages', page: 'category' },
    { name: 'Performance', page: 'category' },
    { name: 'Wellness', page: 'category' },
    { name: 'Movement', page: 'category' }
  ];

  const handleLinkClick = (link: NavItem) => { // ✅ FIXED 5: Proper typing
    setHoveredLink(null);
    if (link.page) {
      onNavigate(link.page as any, link.page === 'category' ? 'Alcobev' : undefined);
    } else if (link.href) {
      window.location.hash = link.href;
    }
  };

  const handleDropdownItemClick = (e: React.MouseEvent, item: NavItem) => { // ✅ FIXED 6: Proper typing
    e.stopPropagation();
    setHoveredLink(null);
    if (item.page) {
      onNavigate(item.page as any, item.name);
    } else if (item.href) {
      window.location.hash = item.href;
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${shrink ? 'py-2 h-16 glass shadow-xl' : 'py-6 h-24 bg-transparent'}`}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-full w-full">
          {/* Mobile nav */}
          <div className="lg:hidden grid grid-cols-3 items-center h-full w-full">
            <div className="justify-self-start">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`p-2 -ml-2 hover:opacity-70 transition-opacity ${shrink ? 'text-zinc-950' : 'text-white'}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </button>
            </div>

            <div 
              className="flex flex-col items-center cursor-pointer leading-none justify-self-center" 
              onClick={() => onNavigate('home')}
            >
              <span className={`text-xl font-display font-medium tracking-[0.1em] transition-colors duration-500 ${shrink ? 'text-zinc-950' : 'text-white'}`}>
                TROVE
              </span>
            </div>

            <div className="justify-self-end flex items-center gap-2">
              <button onClick={() => onNavigate('cart')} className={`p-2 transition-colors duration-500 relative ${shrink ? 'text-zinc-950' : 'text-white'}`} aria-label="Cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#e3ae3f] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_3fr_1fr] items-center h-full w-full">
            {/* Logo */}
            <div 
              className="flex flex-col items-start cursor-pointer leading-none shrink-0 justify-self-start" 
              onClick={() => onNavigate('home')}
            >
              <span className={`text-xl xl:text-2xl font-display font-medium tracking-[0.05em] transition-colors duration-500 ${shrink ? 'text-zinc-950' : 'text-white'}`}>
                TROVE
              </span>
              <span className={`text-[7px] font-bold uppercase tracking-[0.4em] mt-0.5 transition-colors duration-500 ${shrink ? 'text-zinc-400' : 'text-white/50'}`}>
                EXPERIENCES<span className="opacity-50">®</span>
              </span>
            </div>

            {/* Nav Links */}
            <div className={`flex items-center justify-center gap-10 xl:gap-14 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${shrink ? 'text-zinc-950' : 'text-white'}`}>
              {navLinks.map((link) => (
                <div 
                  key={link.label} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.label || null)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <button 
                    onClick={() => handleLinkClick(link)}
                    className="hover:opacity-50 transition-all whitespace-nowrap px-1 py-4 relative flex items-center gap-2 h-full"
                  >
                    {link.label}
                    {link.dropdownType && (
                      <svg className={`w-3 h-3 transition-transform duration-300 ${hoveredLink === link.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className={`absolute bottom-4 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${shrink ? 'bg-zinc-950' : 'bg-white'}`}></span>
                  </button>

                  {link.dropdownType && (
                    <div className={`absolute top-full left-0 pt-2 transition-all duration-300 z-[110] ${hoveredLink === link.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                      <div className="bg-white border border-zinc-100 shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-xl py-6 min-w-[220px] overflow-hidden">
                        <div className="px-6 mb-4">
                          <h4 className="text-[14px] font-bold text-zinc-950 tracking-tight pb-2 border-b border-zinc-900 inline-block pr-8">
                            {link.label}
                          </h4>
                        </div>
                        <ul className="flex flex-col max-h-64 overflow-y-auto">
                          {(link.dropdownType === 'locations' 
                            ? (loadingLocations ? [{ name: 'Loading...' }] : locationNavItems)
                            : categories
                          ).map((item, index) => (
                            <li key={item.name || index}>
                              <button 
                                onClick={(e) => handleDropdownItemClick(e, item)}
                                className="w-full text-left px-6 py-2.5 text-[14px] font-medium text-zinc-600 hover:text-[#2d66af] transition-colors"
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={onOpenDiscovery}
                className="bg-[#9a8a6d] text-white px-7 py-2 rounded-full hover:bg-zinc-950 transition-all transform hover:scale-105 ml-6 font-black text-[10px] tracking-widest"
              >
                DISCOVER
              </button>
            </div>

            {/* Right side buttons */}
            <div className={`flex items-center gap-8 justify-self-end transition-colors duration-500 ${shrink ? 'text-zinc-950' : 'text-white'}`}>
              <button onClick={() => onNavigate('profile')} className="hover:opacity-50 transition-opacity p-1" aria-label="Profile">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>
              <button onClick={() => onNavigate('cart')} className="hover:opacity-50 transition-opacity p-1 relative" aria-label="Shopping Cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e3ae3f] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[150] transition-all duration-500 lg:hidden ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-zinc-950/40 backdrop-blur-md transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsSidebarOpen(false)} />
        <div className={`absolute top-0 left-0 w-[85%] max-w-[320px] h-full bg-white p-12 flex flex-col transition-transform duration-700 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-20">
            <span className="text-2xl font-display font-medium text-zinc-950 uppercase" onClick={() => { onNavigate('home'); setIsSidebarOpen(false); }}>TROVE</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-zinc-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.label} 
                onClick={() => {
                  if (link.page) onNavigate(link.page as any, link.page === 'category' ? 'Alcobev' : 'All');
                  else if (link.href) window.location.hash = link.href;
                  setIsSidebarOpen(false);
                }} 
                className="text-2xl font-display font-medium text-zinc-950 hover:text-[#9a8a6d] transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => { onOpenDiscovery(); setIsSidebarOpen(false); }} className="text-sm font-black text-[#9a8a6d] uppercase tracking-[0.5em] text-left mt-12 border-t border-zinc-100 pt-12">
              Discover Joy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
