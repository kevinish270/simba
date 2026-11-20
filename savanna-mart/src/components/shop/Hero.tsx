"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";

import { useTranslation } from "@/store/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      badge: t('common.flashSale'),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      cta: t('hero.cta'),
      dealsCta: t('hero.dealsCta'),
      color: "primary",
    },
    {
      id: 1,
      badge: "NEW ARRIVALS",
      title: "Fresh Harvest Just Arrived.",
      subtitle: "Discover the freshest organic fruits and vegetables from our local farmers.",
      cta: "SHOP FRESH",
      dealsCta: "VIEW ALL",
      color: "secondary",
    },
    {
      id: 2,
      badge: "MEMBER EXCLUSIVE",
      title: "Save More With Simba Rewards.",
      subtitle: "Join our membership program and earn points on every purchase you make.",
      cta: "JOIN NOW",
      dealsCta: "LEARN MORE",
      color: "accent",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-slate-900 rounded-[2rem] md:rounded-[3rem] my-4 md:my-8 mx-2 md:mx-4 min-h-[500px] md:min-h-[600px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10"
        >
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8`}
            >
              <Zap className="h-3 w-3 md:h-4 md:w-4 fill-primary animate-pulse" /> {slides[currentSlide].badge}
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1.1]">
              {slides[currentSlide].title.includes('Delivered') ? (
                <>
                  {slides[currentSlide].title.split('Delivered')[0]} 
                  <span className="text-primary italic">Delivered</span> 
                  {slides[currentSlide].title.split('Delivered')[1]}
                </>
              ) : slides[currentSlide].title}
            </h1>
            
            <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-12 max-w-xl font-medium leading-relaxed">
              {slides[currentSlide].subtitle}
              <br />
              <span className="text-white font-bold underline decoration-primary underline-offset-4">{t('common.freeDelivery')}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/shop" 
                className="bg-primary text-slate-900 font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 active:scale-95 text-base md:text-lg min-h-[56px]"
              >
                {slides[currentSlide].cta} <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link 
                href="/deals" 
                className="bg-white/10 backdrop-blur border border-white/10 text-white font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95 text-base md:text-lg min-h-[56px]"
              >
                {slides[currentSlide].dealsCta} <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-20">
        <button 
          onClick={prevSlide}
          className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-sm hidden sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-20">
        <button 
          onClick={nextSlide}
          className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 backdrop-blur-sm hidden sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? "w-8 md:w-12 h-2 md:h-2.5 bg-primary shadow-lg shadow-primary/50" 
                : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Abstract Shapes / Decoration */}
      <div className="absolute right-[-10%] top-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] opacity-30"></div>
      <div className="absolute left-[20%] bottom-[-20%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-secondary/20 rounded-full blur-[60px] md:blur-[100px] opacity-20"></div>
      <div className="absolute right-4 md:right-10 bottom-16 md:bottom-10 text-[100px] md:text-[300px] opacity-5 select-none pointer-events-none font-black text-white italic tracking-tighter hidden sm:block">SIMBA</div>
    </section>
  );
}
