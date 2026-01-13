import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingExperiences from './components/UpcomingExperiences';
import AllExperiencesIntro from './components/AllExperiencesIntro';
import PrivateGroup from './components/PrivateGroup';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';
import UpcomingPage from './pages/UpcomingPage';
import AllExperiencesPage from './pages/AllExperiencesPage';
import CategoryPage from './pages/CategoryPage';
import GroupsPage from './pages/GroupsPage';
import GiftingPage from './pages/GiftingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import { CartItem, Experience } from './types';

type Page = 'home' | 'upcoming' | 'all-experiences' | 'category' | 'groups' | 'gifting' | 'about' | 'contact' | 'cart' | 'profile' | 'experience-detail';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroFinished(true), 1500);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navigateTo = (page: Page, param: string = 'All') => {
    setCurrentPage(page);
    if (page === 'category') {
      setSelectedCategory(param);
    } else {
      setSelectedLocation(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewExperienceDetail = (experience: Experience) => {
    setSelectedExperience(experience);
    setCurrentPage('experience-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (experience: Experience) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === experience.id);
      if (existing) {
        return prev.map(item => 
          item.id === experience.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...experience, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 transition-colors duration-500">
      {!isIntroFinished && (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center transition-opacity duration-1000">
          <div className="text-center px-6">
            <h2 className="font-display italic text-2xl md:text-4xl text-white tracking-widest opacity-0 animate-[fade-in_1.2s_forwards]">
              Experiences aren’t bought. They’re felt.
            </h2>
            <div className="mt-10 h-[2px] w-20 bg-[#9a8a6d] mx-auto animate-[scale-x_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      <Navbar 
        shrink={scrollY > 60 || currentPage !== 'home'} 
        onOpenDiscovery={() => setIsDiscoveryOpen(true)} 
        onNavigate={navigateTo}
        currentPage={currentPage}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
      <main className={isIntroFinished ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
        {currentPage === 'home' && (
          <>
            <Hero />
            <UpcomingExperiences onAddToCart={addToCart} onViewDetail={viewExperienceDetail} />
            <AllExperiencesIntro onViewDetail={viewExperienceDetail} />
            <PrivateGroup />
          </>
        )}
        {currentPage === 'upcoming' && (
          <UpcomingPage initialLocation={selectedLocation} onAddToCart={addToCart} onViewDetail={viewExperienceDetail} />
        )}
        {currentPage === 'all-experiences' && (
          <AllExperiencesPage onNavigate={navigateTo} onViewDetail={viewExperienceDetail} />
        )}
        {currentPage === 'category' && (
          <CategoryPage categoryName={selectedCategory} />
        )}
        {currentPage === 'groups' && (
          <GroupsPage />
        )}
        {currentPage === 'gifting' && (
          <GiftingPage />
        )}
        {currentPage === 'about' && (
          <AboutPage />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'cart' && (
          <CartPage 
            items={cart} 
            onRemove={removeFromCart} 
            onUpdateQuantity={updateQuantity}
            onContinueShopping={() => navigateTo('home')}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage />
        )}
        {currentPage === 'experience-detail' && selectedExperience && (
          <ExperienceDetailPage 
            experience={selectedExperience} 
            onAddToCart={addToCart}
            onNavigate={navigateTo}
            onViewDetail={viewExperienceDetail}
          />
        )}
        <Footer onNavigate={navigateTo} />
      </main>

      <AIConcierge isOpen={isDiscoveryOpen} onClose={() => setIsDiscoveryOpen(false)} />
      
      <style>{`
        @keyframes fade-in {
          to { opacity: 1; transform: translateY(-10px); }
        }
        @keyframes scale-x {
          0%, 100% { transform: scaleX(0.5); opacity: 0.3; }
          50% { transform: scaleX(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;