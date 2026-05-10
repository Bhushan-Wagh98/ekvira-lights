'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';
import { FadeUp, SlideLeft, SlideRight } from '@/components/ui/ScrollAnimations';

const Contact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    event_date: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [biz, setBiz] = useState<any>(null);

  useEffect(() => {
    const fetchBiz = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('business_info') as any).select('*').single();
      if (data) setBiz(data);
    };
    fetchBiz();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { supabase } = await import('@/lib/supabase');

      const { error } = await (supabase.from('inquiries') as any).insert({
        name: formData.name,
        email: formData.email || 'not provided',
        phone: formData.phone,
        service: formData.service,
        message: `Event Date: ${formData.event_date}\n${formData.message}`,
        status: 'new',
      });

      if (error) {
        console.error('Supabase error:', error.message, error.details, error.hint);
        throw error;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', event_date: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const lights = [
    { label: 'Sharpy Lights', value: 'sharpy' },
    { label: 'Blinder Lights', value: 'blinder' },
    { label: 'Bottom Lights', value: 'bottom' },
    { label: 'Laser Lights', value: 'laser' },
    { label: 'Full Setup (All Lights)', value: 'full_setup' },
  ];

  return (
    <section id="contact" className="section-padding relative" style={{ background: 'hsl(240, 10%, 6%)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="container mx-auto container-padding relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={cn(
              "text-4xl md:text-5xl font-black text-white mb-6",
              locale === 'mr' ? 'font-marathi' : ''
            )}>
              <span className="text-gradient">{t('title')}</span>
            </h2>
            <p className={cn(
              "text-lg text-gray-400",
              locale === 'mr' ? 'font-marathi' : ''
            )}>
              {t('subtitle')}
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <SlideLeft>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">{t('form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 focus:outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">{t('form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 focus:outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">{t('form.service')}</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 focus:outline-none transition-all"
                  >
                    <option value="" className="bg-gray-900">Select lights</option>
                    {lights.map((light) => (
                      <option key={light.value} value={light.value} className="bg-gray-900">{light.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">{t('form.event_date')}</label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">{t('form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 focus:outline-none transition-all resize-none"
                  placeholder="Venue, occasion, number of lights needed..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary inline-flex items-center justify-center space-x-2 group text-lg disabled:opacity-50"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <span>{status === 'sending' ? 'Sending...' : t('form.submit')}</span>
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/20 rounded-lg py-3">
                  ✓ Inquiry sent! We'll contact you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-3">
                  Failed to send. Please try WhatsApp or call directly.
                </p>
              )}
            </form>
          </SlideLeft>

          {/* Contact Information */}
          <SlideRight>
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-neon-purple/10 border border-neon-purple/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsla(280,100%,60%,0.3)] transition-all">
                    <Phone className="h-5 w-5 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('info.phone')}</h4>
                    <div className="flex flex-wrap gap-x-2">
                      {(biz?.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '').split(',').map((p: string, i: number, arr: string[]) => (
                        <span key={p.trim()}>
                          <a href={`tel:${p.trim()}`} className="text-gray-400 hover:text-neon-cyan transition-colors">{p.trim()}</a>
                          {i < arr.length - 1 && <span className="text-gray-600">, </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsla(180,100%,50%,0.3)] transition-all">
                    <Mail className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('info.email')}</h4>
                    <div className="flex flex-wrap gap-x-2">
                      {(biz?.email || process.env.NEXT_PUBLIC_BUSINESS_EMAIL || '').split(',').map((e: string, i: number, arr: string[]) => (
                        <span key={e.trim()}>
                          <a href={`mailto:${e.trim()}`} className="text-gray-400 hover:text-neon-cyan transition-colors">{e.trim()}</a>
                          {i < arr.length - 1 && <span className="text-gray-600">, </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-neon-pink/10 border border-neon-pink/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsla(320,100%,50%,0.3)] transition-all">
                    <MapPin className="h-5 w-5 text-neon-pink" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('info.address')}</h4>
                    <p className="text-gray-400">{biz?.address || process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-neon-blue/10 border border-neon-blue/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsla(220,100%,60%,0.3)] transition-all">
                    <Clock className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('info.hours')}</h4>
                    <p className="text-gray-400">{biz?.business_hours || '24/7 for events'}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glow-card p-6">
                <h4 className="font-bold text-white mb-4 text-lg">Quick Booking</h4>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${(biz?.social_links?.whatsapp || biz?.phone?.split(',')[0] || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '').replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-4 py-3.5 rounded-xl font-semibold text-center transition-all hover:shadow-[0_0_20px_hsla(140,100%,40%,0.2)] inline-flex items-center justify-center space-x-2"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>WhatsApp Us</span>
                  </a>
                  <a
                    href={`tel:${(biz?.phone?.split(',')[0] || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '').trim()}`}
                    className="block w-full bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/50 text-neon-purple px-4 py-3.5 rounded-xl font-semibold text-center transition-all hover:shadow-[0_0_20px_hsla(280,100%,60%,0.2)]"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
};

export default Contact;
