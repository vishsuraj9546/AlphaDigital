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

  // ✅ Scroll to next section function
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('services'); // 👉 apne next section ka id yahan do (services, portfolio etc.)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen w-full flex flex-col items-center justify-center bg-black"
    >
      {/* ✅ Spline 3D Model Fullscreen Background */}
      <iframe
        src="https://my.spline.design/theorbhand-pU2kt9gPvizgtrdVaxoZdN8f/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'transparent',
        }}
      ></iframe>

      {/* ✅ Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ✅ Overlay Text */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white">
          NEXT-GEN{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CREATORS
          </span>
        </h2>

        <p className="mt-6 text-lg text-white/80">
          We are a next-generation creative tech startup passionate about turning bold ideas into reality.
          Whether it's a powerful web app, a captivating 3D animation, or an eye-catching brand identity – we create it all.
        </p>
      </div>

      {/* ✅ Animated Scroll Arrow */}
      <div
        className="absolute bottom-8 cursor-pointer z-20 flex flex-col items-center"
        onClick={scrollToNextSection}
      >
        <span className="text-white/70 text-sm mb-2">Scroll Down</span>

        {/* 🔥 Animated Arrow */}
        <div className="w-6 h-6 border-b-2 border-r-2 border-white rotate-45 animate-bounce"></div>
      </div>
    </section>
  );
}
