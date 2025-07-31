'use client';
// import Footer from '@/components/Footer';

import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 🟣 1. Company Info */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">AlphaDigital</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            AlphaDigital is a creative digital agency that brings ideas to life.
            We specialize in Full-Stack Development, Graphic Design, Video Editing,
            and 3D Animation to help brands stand out in the digital world.
          </p>
        </div>

        {/* 🟣 2. Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            {[
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'contact', label: 'Contact' },
              { id: 'careers', label: 'Careers' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🟣 3. Social Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-6">
            {/* Instagram */}
            <div className="flex flex-col items-center">
              <a
                href="https://www.instagram.com/alp_hadigital9546/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:scale-110 transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <span className="text-xs text-gray-400 mt-2">Instagram</span>
            </div>

            {/* Facebook */}
            <div className="flex flex-col items-center">
              <a
                href="https://www.facebook.com/profile.php?id=61578975447443"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <span className="text-xs text-gray-400 mt-2">Facebook</span>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center">
              <a
                href="https://www.linkedin.com/in/suraj-kumar-6a2759283/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <span className="text-xs text-gray-400 mt-2">LinkedIn</span>
            </div>

            {/* GitHub */}
            <div className="flex flex-col items-center">
              <a
                href="https://github.com/vishsuraj9546"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-black hover:scale-110 transition-all duration-300"
              >
                <FaGithub className="text-lg" />
              </a>
              <span className="text-xs text-gray-400 mt-2">GitHub</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © 2025 AlphaDigital – All Rights Reserved
      </div>
    </footer>
  );
}
