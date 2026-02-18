import React from 'react';

interface HeroBannerProps {
  title: React.ReactNode;
  subtitle: string;
  image: string;
  onCtaClick: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, image, onCtaClick }) => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-gray-900 group">
      <img 
        src={image} 
        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
        alt="Campaign Hero" 
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-[12px] font-black uppercase tracking-[6px] mb-4 animate-in fade-in slide-in-from-bottom duration-700">
          {subtitle}
        </p>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
          {title}
        </h1>
        <button 
          onClick={onCtaClick}
          className="bg-white text-black px-12 py-5 text-[11px] font-black uppercase tracking-[4px] hover:bg-black hover:text-white transition-all transform active:scale-95"
        >
          Explorar Tienda
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;