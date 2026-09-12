import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { heroImages } from '../data/products';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { pages } = useContent();

  // Get hero data from CMS or use defaults
  const homePage = pages.find((p) => p.id === 'home');
  const heroData = homePage?.content.hero;

  const slides = heroData
    ? [
        {
          image: heroData.image,
          title: heroData.title,
          subtitle: heroData.subtitle,
          cta: heroData.cta,
        },
        ...heroImages.slice(1),
      ]
    : heroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-8">
            {slides[currentSlide].title}
          </h2>
          <button
            onClick={() => onNavigate('shop')}
            className="border border-white px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            {slides[currentSlide].cta}
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-0.5 transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
