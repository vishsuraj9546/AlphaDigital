'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const orbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  // 🔵 Floating orb mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        orbRef.current.style.transform = `translate(-50%, -50%) translate(${xPos}px, ${yPos}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🔵 Scroll trigger for text animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <div 
        ref={orbRef}
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full transition-transform duration-100 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
          filter: 'blur(1px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      
      {/* 🔵 Text wrapper with scroll animation */}
      <div 
        ref={textRef}
        className={`relative z-10 text-center max-w-6xl mx-auto px-8 transition-all duration-1000 ease-out ${
          textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
            LET&apos;S BUILD.<br />
            LET&apos;S DESIGN.<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LET&apos;S CREATE.
            </span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          We craft innovative digital experiences – from full-stack development to 3D animations and creative branding solutions.
        </p>
        
        <button
          onClick={() => scrollToSection('contact')}
          className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer whitespace-nowrap"
        >
          <span className="relative z-10">START A PROJECT</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </button>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <div className="w-0.5 h-12 bg-gradient-to-b from-purple-400 to-transparent mx-auto mb-4 animate-pulse" />
        <span className="text-white/60 text-xs font-bold tracking-widest">SCROLL</span>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          33% { transform: translate(-50%, -50%) translateY(-20px) rotate(120deg); }
          66% { transform: translate(-50%, -50%) translateY(10px) rotate(240deg); }
        }
      `}</style>
    </section>
  );
}
