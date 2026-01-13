import React from 'react';
import PrivateGroup from '../components/PrivateGroup';

interface CategoryOccurrence {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  price: string;
  image: string;
  cityTag: string;
}

const CATEGORY_DATA: Record<string, CategoryOccurrence[]> = {
  'Alcobev': [
    {
      id: 'c1',
      title: "Sommelier's Secrets",
      subtitle: 'Decoding Fine Wines',
      date: 'Next on Sun, 11th Jan.',
      location: 'Delhi',
      price: '₹3,000 for one participant',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
      cityTag: 'DELHI'
    },
    {
      id: 'c2',
      title: 'Whisky Wonderland',
      subtitle: 'A Journey Through Single Malts',
      date: 'Next on Sat, 17th Jan.',
      location: 'Mumbai',
      price: '₹4,500 for one participant',
      image: 'https://images.unsplash.com/photo-1527281405159-35d5b5d94445?auto=format&fit=crop&q=80&w=1200',
      cityTag: 'MUMBAI'
    }
  ],
  'Niche': [
    {
      id: 'c3',
      title: 'Art of Horology',
      subtitle: 'Fine Watchmaking Workshop',
      date: 'Next on Sat, 10th Jan.',
      location: 'Mumbai',
      price: '₹4,000 for one participant',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200',
      cityTag: 'MUMBAI'
    }
  ]
};

interface CategoryPageProps {
  categoryName: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName }) => {
  const experiences = CATEGORY_DATA[categoryName] || CATEGORY_DATA['Alcobev'];

  return (
    <div className="bg-white">
      <section className="pt-48 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Header - Styled like the reference image text */}
          <div className="mb-20">
            <h1 className="text-6xl md:text-8xl font-display font-medium text-[#bfa260] tracking-[0.2em] uppercase">
              {categoryName}
            </h1>
          </div>

          {/* Grid of cards matching the reference image layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {experiences.map((exp) => (
              <div key={exp.id} className="group cursor-pointer flex flex-col">
                {/* Image Card */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Location Tag - Matches reference image style */}
                  <div className="absolute top-6 left-0 bg-[#bfa260] text-zinc-950 px-6 py-2 rounded-r-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {exp.cityTag}
                  </div>
                </div>

                {/* Card Details */}
                <div className="px-2 space-y-1">
                  <h3 className="text-[26px] font-bold text-zinc-950 tracking-tight leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-[14px] text-zinc-400 font-medium mb-4">
                    {exp.subtitle}
                  </p>
                  <div className="pt-3 space-y-1 text-[14px] text-zinc-500 font-medium">
                    <p>{exp.date}</p>
                    <p>{exp.location}</p>
                    <p>{exp.price}</p>
                  </div>
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

export default CategoryPage;