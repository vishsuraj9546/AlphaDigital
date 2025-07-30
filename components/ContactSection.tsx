'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  // 🟢 Form ke liye state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  // 🟢 Scroll animation ke liye IntersectionObserver
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

  // 🟢 Input changes handle karna
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 🟢 Form submit function (API call)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🛑 Message validation (500 char limit)
    if (formData.message.length > 500) {
      setSubmitStatus('⚠️ Message must be 500 characters or less.');
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ API ko request bhejna
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('✅ Message sent successfully! We’ll respond within 24 hours.');
        setFormData({ name: '', email: '', message: '' }); // 🔄 Reset form
      } else {
        setSubmitStatus('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submit error:', error);
      setSubmitStatus('⚠️ Server error. Try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-gradient-to-br from-purple-900 via-black to-pink-900"
    >
      <div className="max-w-4xl mx-auto px-8">
        {/* 🟣 Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            LET'S
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent ml-4">
              TALK
            </span>
          </h2>
        </div>

        {/* 🟣 Contact Form */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 🔹 Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
                />
              </div>

              {/* 🔹 Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
                />
              </div>
            </div>

            {/* 🔹 Message */}
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={6}
                maxLength={500}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none"
              />
              <div className="text-right mt-2">
                <span className="text-white/40 text-sm">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* 🔹 Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-white text-black px-12 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>

            {/* 🟢 Status Message */}
            {submitStatus && (
              <div className="text-center">
                <p className="text-white/80 text-sm">{submitStatus}</p>
              </div>
            )}
          </form>

          {/* 🔹 Social Links */}
          <div className="text-center mt-12">
            <p className="text-white/60 text-lg mb-8">
              We respond within 24 hours.
            </p>

            <div className="flex items-center justify-center space-x-6">
              {[
                {
                  name: 'LinkedIn',
                  icon: 'ri-linkedin-fill',
                  link: 'https://www.linkedin.com/in/suraj-kumar-6a2759283/',
                },
                {
                  name: 'GitHub',
                  icon: 'ri-github-fill',
                  link: 'https://github.com/vishsuraj9546',
                },
                {
                  name: 'Instagram',
                  icon: 'ri-instagram-fill',
                  link: 'https://www.instagram.com/rolex_suraj_9546/?hl=en',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-black rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <i className={`${social.icon} text-xl`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
