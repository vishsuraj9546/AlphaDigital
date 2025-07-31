'use client';

import { useState, useEffect, useRef } from 'react';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: 'FULL-STACK DEVELOPMENT',
      description:
        'End-to-end web applications with cutting-edge technologies and scalable architecture.',
    },
    {
      title: '3D ANIMATION',
      description:
        'Immersive 3D experiences, motion graphics, and stunning visual storytelling.',
    },
    {
      title: 'GRAPHIC DESIGN',
      description:
        'Bold visual identities, print materials, and digital assets that make an impact.',
    },
    {
      title: 'UI/UX DESIGN',
      description:
        'User-centered interfaces that blend aesthetics with exceptional functionality.',
    },
    {
      title: 'VIDEO EDITING',
      description:
        'Complete brand strategies from logo design to comprehensive brand guidelines.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 bg-zinc-950 overflow-hidden"
    >
      {/* ✅ Spline 3D Background */}
      <iframe
        src="https://my.spline.design/particlenebula-GHcskVbXhZsvKUJOCRFZkAIL/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'transparent',
        }}
      ></iframe>

      {/* ✅ Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            OUR
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ml-4">
              SERVICES
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              <button
                onClick={() =>
                  setActiveService(activeService === index ? null : index)
                }
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
                  {service.title}
                </span>
                <div
                  className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                    activeService === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  <div className="w-4 h-0.5 bg-purple-400 absolute" />
                  <div className="w-0.5 h-4 bg-purple-400 absolute" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeService === index
                    ? 'max-h-32 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-white/70 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
