import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type HeroSlide = {
  title: string;
  subtitle: string;
  cta: string;
  categoryId: string;
  image: string;
};

const AUTO_SLIDE_MS = 4000;

const slides: HeroSlide[] = [
  {
    title: "Upgrade Your Space with Premium Tiles",
    subtitle: "Stylish, durable, and affordable designs",
    cta: "Shop Tiles",
    categoryId: "tiles_floor_tiles",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Smart & Stylish Faucets",
    subtitle: "Designed for elegance and performance",
    cta: "Explore Faucets",
    categoryId: "faucets_basin_faucets",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Experience Luxury Showers",
    subtitle: "Turn your bathroom into a spa",
    cta: "Shop Showers",
    categoryId: "showers_overhead_showers",
    image:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Everything You Need for Your Bathroom",
    subtitle: "Tiles, sinks, showers & more",
    cta: "View Collection",
    categoryId: "accessories_pipe_fittings",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1800&q=80",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = slides.length;

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = window.setInterval(goNext, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [isHovered]);

  const currentSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  return (
    <section
      tabIndex={0}
      aria-label="EndlessCart hero carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }}
      className="relative w-full h-[55vh] min-h-[340px] md:h-[65vh] lg:h-[75vh] overflow-hidden outline-none"
    >
      <div className="absolute inset-0">
        {slides.map((slide, idx) => (
          <img
            key={slide.title}
            src={slide.image}
            loading="lazy"
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              idx === activeIndex
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100 pointer-events-none"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl text-white space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            {currentSlide.title}
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-100">
            {currentSlide.subtitle}
          </p>
          <button
            onClick={() => navigate(`/products/${currentSlide.categoryId}`)}
            className="mt-2 px-6 py-3 md:px-8 md:py-3 bg-[#00927c] hover:bg-[#007a67] transition-colors duration-300 rounded-full font-semibold shadow-lg"
          >
            {currentSlide.cta}
          </button>
        </div>
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute z-20 left-3 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
      >
        &#10094;
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute z-20 right-3 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
      >
        &#10095;
      </button>

      <div className="absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.title}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
