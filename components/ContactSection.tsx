'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  // 🟢 Form state
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

  // 🟢 Input changes handle
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

    if (formData.message.length > 500) {
      setSubmitStatus('⚠️ Message must be 500 characters or less.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('✅ Message sent successfully! We’ll respond within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
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
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 🔹 LEFT SIDE - Spline Robot */}
        <div className="relative flex justify-center">
          <iframe
            src="https://my.spline.design/genkubgreetingrobot-xFkiPyPgBmLyDrLtIESFj5Zt/"
            frameBorder="0"
            width="100%"
            height="500px"
            className="rounded-xl transition-transform duration-500 hover:rotate-6"
          ></iframe>
        </div>

        {/* 🔹 RIGHT SIDE - Contact Form */}
        <div>
          <div
            className={`text-center lg:text-left mb-16 transition-all duration-1000 ${
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
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div className="text-center lg:text-left">
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

            {submitStatus && (
              <div className="text-center lg:text-left">
                <p className="text-white/80 text-sm">{submitStatus}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
