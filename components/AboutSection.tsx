
'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const brands = ['TECHCORP', 'INNOVATE', 'NEXUS', 'PIXEL', 'VERTEX', 'QUANTUM'];

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
              <img
                src="https://static.readdy.ai/image/68245faa3d2894b33c04c4573a75c538/365d846e2de4448c4d64816ddf8a47f4.jfif"
                alt="Founder"
                className="relative z-10 w-full h-full object-cover object-top rounded-full border-4 border-purple-500/30"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              NEXT-GEN
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CREATORS
              </span>
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
              We are a next-generation creative tech startup passionate about turning bold ideas into reality. Whether it's a powerful web app, a captivating 3D animation, or an eye-catching brand identity – we create it all.
            </p>
            
            <div className="grid grid-cols-3 gap-8 opacity-40">
              {brands.map((brand, index) => (
                <div 
                  key={brand}
                  className={`text-center transition-all duration-700 delay-${index * 100}`}
                  style={{ 
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="text-white/60 font-bold text-sm tracking-widest">
                    {brand}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
