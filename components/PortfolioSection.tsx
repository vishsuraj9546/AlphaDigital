'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Local Images Import (replace with your actual images)
import aiAssistantImg from '@/public/images/portfolio/ai-assistant.png';
import smartShoppingImg from '@/public/images/portfolio/smart-shopping.png';
import portfolioV1Img from '@/public/images/portfolio/portfolio-v1.png';
import portfolioV2Img from '@/public/images/portfolio/portfolio-v2.png';

// Placeholder images for Graphic, Video Editing, 3D Animation (replace with your images)
import graphicImg1 from '@/public/images/portfolio/graphic1.png';
import graphicImg2 from '@/public/images/portfolio/graphic2.png';
import videoImg1 from '@/public/images/portfolio/video1.png';
import videoImg2 from '@/public/images/portfolio/video2.png';
import animationImg1 from '@/public/images/portfolio/animation1.png';
import animationImg2 from '@/public/images/portfolio/animation2.png';

export default function PortfolioSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ PROJECT DATA (grouped by service)
  const services = [
    {
      title: 'FULL STACK',
      subtitle: 'DEVELOPER',
      description: 'Crafting digital experiences with cutting-edge technologies',
      color: 'from-purple-400 to-pink-400',
      projects: [
        {
          title: 'AI Assistant',
          category: 'AI PROJECT',
          subservices: ['Chat Interface', 'Voice Input', 'News Integration'],
          image: aiAssistantImg,
          url: 'https://mocoai.netlify.app/'
        },
        {
          title: 'Smart Shopping',
          category: 'E-COMMERCE',
          subservices: ['AI Recommendations', 'Personalized Shopping', 'Category Browsing'],
          image: smartShoppingImg,
          url: 'https://shopsmartdeal.netlify.app/'
        },
        {
          title: 'Portfolio V1',
          category: 'WEB DEVELOPMENT',
          subservices: ['Personal Branding', 'Responsive Design', 'Project Showcase'],
          image: portfolioV1Img,
          url: 'https://alexsuraj.vercel.app/'
        },
        {
          title: 'Portfolio V2',
          category: 'WEB DEVELOPMENT',
          subservices: ['AI/ML Focus', 'Interactive Design', 'Professional Profile'],
          image: portfolioV2Img,
          url: 'https://portfoliosuraj-vish.netlify.app/'
        }
      ]
    },
    {
      title: 'GRAPHIC',
      subtitle: 'DESIGNER',
      description: 'Creative designs for brands, posters, and logos',
      color: 'from-pink-400 to-red-400',
      projects: [
        {
          title: 'Logo Pack',
          category: 'LOGO DESIGN',
          subservices: ['Modern Logos', 'Minimal Branding', 'Custom Icons'],
          image: graphicImg1,
          url: '#'
        },
        {
          title: 'Poster Collection',
          category: 'POSTER DESIGN',
          subservices: ['Event Posters', 'Promotional Designs', 'Campaign Graphics'],
          image: graphicImg2,
          url: '#'
        }
      ]
    },
    {
      title: 'VIDEO',
      subtitle: 'EDITING',
      description: 'Transforming raw clips into stunning visual stories',
      color: 'from-blue-400 to-purple-400',
      projects: [
        {
          title: 'Promo Video',
          category: 'VIDEO EDITING',
          subservices: ['Transitions', 'Color Grading', 'Sound Mixing'],
          image: videoImg1,
          
          url: '#'
        },
        {
          title: 'Short Reels',
          category: 'SOCIAL CONTENT',
          subservices: ['Instagram Reels', 'YouTube Shorts', 'TikTok Edits'],
          image: videoImg2,
          url: '#'
        }
      ]
    },
    {
      title: '3D',
      subtitle: 'ANIMATION',
      description: 'Bringing concepts to life with 3D visuals & motion',
      color: 'from-green-400 to-blue-400',
      projects: [
        {
          title: '3D Product Demo',
          category: '3D ANIMATION',
          subservices: ['Product Animations', 'Motion Graphics', 'Texturing'],
          image: animationImg1,
          url: '#'
        },
        {
          title: '3D Logo Reveal',
          category: '3D LOGO',
          subservices: ['Cinematic Effects', 'Logo Animation', 'Particle FX'],
          image: animationImg2,
          url: '#'
        }
      ]
    }
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const openProject = (url: string, e: React.MouseEvent) => {
    if (expandedCategory) {
      e.stopPropagation();
      return;
    }
    if (url && url !== '#') window.open(url, '_blank');
  };

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-black relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-900/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col lg:flex-row">
            {/* Left Side - Section Title */}
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
                <p className="text-gray-400 text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Right Side - Projects Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.projects.map((project, index) => (
                  <div
                    key={index}
                    className={`
                      group relative overflow-hidden rounded-xl bg-zinc-900 cursor-pointer
                      h-80 transition-all duration-500
                      hover:shadow-[0_0_20px_5px_rgba(192,132,252,0.3)]
                      border border-transparent hover:border-purple-500/30
                    `}
                    data-aos="fade-left"
                    data-aos-delay={100 + (index * 100)}
                    onClick={(e) => openProject(project.url, e)}
                  >
                    {/* Project Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-purple-400 text-xs font-bold tracking-widest mb-1 block">
                        {project.category}
                      </span>
                      <h3 className="text-white font-bold text-xl leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Accordion for Subservices */}
                    {expandedCategory === project.category && (
                      <div 
                        className="absolute inset-0 bg-black/90 p-4 flex flex-col justify-end animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ul className="text-sm text-gray-300 mb-3">
                          {project.subservices.map((service, i) => (
                            <li key={i} className="py-1 flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              {service}
                            </li>
                          ))}
                        </ul>
                        <button
                          className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                          onClick={() => window.open(project.url, '_blank')}
                        >
                          View Project
                        </button>
                      </div>
                    )}

                    {/* Click indicator with pulse animation */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      Click for details
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
