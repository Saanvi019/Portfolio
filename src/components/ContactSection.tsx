"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', message: '' });
          setIsRevealed(false);
        }, 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="w-full flex justify-center pt-0 pb-24 sm:pt-4 sm:pb-32 relative z-20" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-4xl px-4 sm:px-8 flex flex-col items-center justify-center gap-12 text-center"
      >
        <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Let's Connect</span>

        <div className="relative w-full flex justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="contact-cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute w-full max-w-[400px] flex justify-center items-center"
              >
                <Image
                  src="/reachme.webp"
                  alt="Contact Me"
                  width={600}
                  height={600}
                  className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                <div className="absolute z-10 translate-y-16 flex justify-center items-center">
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="border border-green-400/80 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs tracking-[0.3em] font-[600] px-6 sm:px-8 py-4 rounded-full uppercase cursor-pointer shadow-[0_0_50px_rgba(34,197,94,0.8)] hover:scale-105 transition-all duration-300"
                  >
                    Send a signal &rarr;
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-20 w-full max-w-2xl text-left flex flex-col mt-8"
              >
                <div className="relative w-full border border-zinc-800 bg-[#050505] p-6 sm:p-10 rounded-2xl flex flex-col shadow-2xl">
                  {/* Corner Dots */}
                  <div className="absolute top-4 left-4 w-1 h-1 bg-zinc-600 rounded-full" />
                  <div className="absolute top-4 right-4 w-1 h-1 bg-zinc-600 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-zinc-600 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-1 h-1 bg-zinc-600 rounded-full" />

                  <h3 className="text-lg sm:text-xl font-[800] tracking-[0.2em] text-white uppercase mb-2">Establish Contact</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-400 tracking-widest leading-relaxed mb-8 uppercase">
                    Have an idea worth building? Let's bring it into orbit.
                  </p>

                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase ml-1">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-black/50 border ${errors.name ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-500'} rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors`}
                      />
                      {errors.name && <span className="text-[10px] text-red-400 tracking-widest uppercase ml-1">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase ml-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-black/50 border ${errors.email ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-500'} rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors`}
                      />
                      {errors.email && <span className="text-[10px] text-red-400 tracking-widest uppercase ml-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase ml-1">Your Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full bg-black/50 border ${errors.message ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-500'} rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors resize-none`}
                      />
                      {errors.message && <span className="text-[10px] text-red-400 tracking-widest uppercase ml-1">{errors.message}</span>}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-start gap-4">
                    {status === 'success' ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-green-400 text-xs sm:text-sm font-[600] tracking-widest uppercase flex items-center gap-2">
                          TRANSMISSION RECEIVED ✓
                        </span>
                        <span className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">
                          Your message has reached mission control.
                        </span>
                      </div>
                    ) : status === 'error' ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-red-400 text-xs sm:text-sm font-[600] tracking-widest uppercase">
                            TRANSMISSION FAILED
                          </span>
                          <span className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">
                            Something went wrong. Please try again or contact me directly.
                          </span>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="bg-red-900/20 text-red-400 border border-red-900 hover:bg-red-900/40 px-6 py-3 rounded-full text-[10px] font-[600] tracking-[0.3em] uppercase transition-colors"
                        >
                          TRY AGAIN &rarr;
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                        className={`px-8 py-4 rounded-full text-[10px] sm:text-xs font-[600] tracking-[0.3em] uppercase transition-all duration-300 ${status === 'loading' ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 hover:scale-105'}`}
                      >
                        {status === 'loading' ? 'TRANSMITTING...' : 'SEND TRANSMISSION \u2192'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direct Contact & Socials */}
        <div className="mt-20 sm:mt-28 flex flex-col items-center gap-12 w-full border-t border-zinc-900 pt-16">
          <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Or Reach Me Directly</span>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
            <a href="mailto:saanvi.s019@gmail.com" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-500 group-hover:bg-zinc-900 transition-colors">
                <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase">Email</span>
                <span className="text-xs text-zinc-300 tracking-widest group-hover:text-white transition-colors">saanvi.s019@gmail.com</span>
              </div>
            </a>

            <a href="tel:+917696750037" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-500 group-hover:bg-zinc-900 transition-colors">
                <Phone className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase">Phone</span>
                <span className="text-xs text-zinc-300 tracking-widest group-hover:text-white transition-colors">+91 7696750037</span>
              </div>
            </a>
          </div>

          <div className="flex gap-6 mt-4">
            <a href="https://x.com/S019Sharma" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="https://github.com/Saanvi019" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M12 18v-4"></path></svg>
            </a>
            <a href="https://linkedin.com/in/saanvi019" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
