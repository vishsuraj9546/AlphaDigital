'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Local Images Import
import aiAssistantImg from '@/public/images/portfolio/ai-assistant.png';
import smartShoppingImg from '@/public/images/portfolio/smart-shopping.png';
import portfolioV1Img from '@/public/images/portfolio/portfolio-v1.png';
import portfolioV2Img from '@/public/images/portfolio/portfolio-v2.png';
import alphaDigitalImg from '@/public/images/portfolio/alphadigital.png';

// ✅ Placeholder images
import graphicImg1 from '@/public/images/portfolio/graphic1.png';
import graphicImg2 from '@/public/images/portfolio/graphic2.png';
import videoImg1 from '@/public/images/portfolio/video1.png';
import videoImg2 from '@/public/images/portfolio/video2.png';
import animationImg1 from '@/public/images/portfolio/animation1.png';
import animationImg2 from '@/public/images/portfolio/animation2.png';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  // ✅ PROJECT DATA
  const services = [
    {
  title: 'FULL STACK',
  subtitle: 'DEVELOPER',
  description: 'Crafting digital experiences with cutting-edge technologies',
  color: 'from-purple-400 to-pink-400',
  projects: [
    { title: 'AI Assistant', category: 'AI PROJECT', image: aiAssistantImg, url: 'https://mocoai.netlify.app/' },
    { title: 'Smart Shopping', category: 'E-COMMERCE', image: smartShoppingImg, url: 'https://shopsmartdeal.netlify.app/' },
    { title: 'Portfolio V1', category: 'WEB DEVELOPMENT', image: portfolioV1Img, url: 'https://alexsuraj.vercel.app/' },
    { title: 'Portfolio V2', category: 'WEB DEVELOPMENT', image: portfolioV2Img, url: 'https://portfoliosuraj-vish.netlify.app/' },

    // ✅ FIXED ALPHADIGITAL ENTRY
    { title: 'AlphaDigital', category: 'COMPANY WEBSITE', image: alphaDigitalImg, url: 'https://alphadigital.vercel.app/' }
  ]
},

    {
      title: 'GRAPHIC',
      subtitle: 'DESIGNER',
      description: 'Creative designs for brands, posters, and logos',
      color: 'from-pink-400 to-red-400',
      projects: [
        { title: 'Logo Pack', category: 'LOGO DESIGN', image: graphicImg1, url: '#' },
        { title: 'Poster Collection', category: 'POSTER DESIGN', image: graphicImg2, url: '#' },
      ],
    },
    {
      title: 'VIDEO',
      subtitle: 'EDITING',
      description: 'Transforming raw clips into stunning visual stories',
      color: 'from-blue-400 to-purple-400',
      projects: [
        { title: 'Promo Video', category: 'VIDEO EDITING', image: videoImg1, url: '#' },
        { title: 'Short Reels', category: 'SOCIAL CONTENT', image: videoImg2, url: '#' },
      ],
    },
    {
      title: '3D',
      subtitle: 'ANIMATION',
      description: 'Bringing concepts to life with 3D visuals & motion',
      color: 'from-green-400 to-blue-400',
      projects: [
        { title: '3D Product Demo', category: '3D ANIMATION', image: animationImg1, url: '#' },
        { title: '3D Logo Reveal', category: '3D LOGO', image: animationImg2, url: '#' },
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/30 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-900/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col lg:flex-row">
            {/* ✅ LEFT SIDE - Service Title */}
            <div
              className="lg:w-1/3 lg:pr-12 mb-12 lg:mb-0 flex items-center"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.title}
                  </span>
                  <br />
                  {service.subtitle}
                </h2>
                <p className="text-gray-400 text-lg">{service.description}</p>
              </div>
            </div>

            {/* ✅ RIGHT SIDE - Infinite Scrolling Images */}
            <div className="lg:w-2/3 overflow-hidden">
              <div
                className={`flex space-x-6 ${
                  idx % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'
                } hover:[animation-play-state:paused]`}
              >
                {[...service.projects, ...service.projects].map((project, index) => (
                  <div
                    key={index}
                    className="relative w-80 h-56 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => project.url !== '#' && window.open(project.url, '_blank')}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                      {project.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Alternate Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          animation: marquee-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

