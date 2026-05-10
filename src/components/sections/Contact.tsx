'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';
import {
  FadeUp,
  SlideLeft,
  SlideRight,
} from '@/components/ui/ScrollAnimations';

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
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [biz, setBiz] = useState<any>(null);

  useEffect(() => {
    const fetchBiz = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('business_info') as any)
        .select('*')
        .single();
      if (data) setBiz(data);
    };
    fetchBiz();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { supabase } = await import('@/lib/supabase');

      const selectedLights = formData.service
        ? formData.service.split(',')
        : [];
      const lightNames = selectedLights
        .map(s => {
          const found = lights.find(l => l.value === s);
          return found ? found.label : s;
        })
        .join(', ');
      const serviceValue =
        selectedLights.length === 1
          ? selectedLights[0]
          : selectedLights.length > 1
            ? 'full_setup'
            : 'other';

      const { error } = await (supabase.from('inquiries') as any).insert({
        name: formData.name,
        email: formData.email || 'not provided',
        phone: formData.phone,
        service: serviceValue,
        message: [
          `📅 Event Date: ${new Date(formData.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
          formData.message ? `📝 Event Details: ${formData.message}` : '',
          `🎯 Lights: ${lightNames || 'Not specified'}`,
        ]
          .filter(Boolean)
          .join('\n'),
        status: 'new',
      });

      if (error) {
        console.error(
          'Supabase error:',
          error.message,
          error.details,
          error.hint
        );
        throw error;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        event_date: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const lights = [
    {
      label: locale === 'mr' ? 'शार्पी लाइट्स' : 'Sharpy Lights',
      value: 'sharpy',
    },
    {
      label: locale === 'mr' ? 'ब्लाइंडर लाइट्स' : 'Blinder Lights',
      value: 'blinder',
    },
    {
      label: locale === 'mr' ? 'बॉटम लाइट्स' : 'Bottom Lights',
      value: 'bottom',
    },
    { label: locale === 'mr' ? 'लेझर लाइट्स' : 'Laser Lights', value: 'laser' },
    {
      label:
        locale === 'mr' ? 'फुल सेटअप (सर्व लाइट्स)' : 'Full Setup (All Lights)',
      value: 'full_setup',
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding relative"
      style={{ background: 'hsl(240, 10%, 6%)' }}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="container-padding container relative z-10 mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2
              className={cn(
                'mb-6 text-4xl font-black text-white md:text-5xl',
                locale === 'mr' ? 'font-marathi' : ''
              )}
            >
              <span className="text-gradient">{t('title')}</span>
            </h2>
            <p
              className={cn(
                'text-lg text-gray-400',
                locale === 'mr' ? 'font-marathi' : ''
              )}
            >
              {t('subtitle')}
            </p>
          </div>
        </FadeUp>

        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <SlideLeft>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                    placeholder={locale === 'mr' ? 'तुमचे नाव' : 'Your name'}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    {t('form.service')}
                  </label>
                  <div className="space-y-2">
                    {lights.map(light => (
                      <label
                        key={light.value}
                        className="flex cursor-pointer items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          checked={formData.service
                            .split(',')
                            .includes(light.value)}
                          onChange={e => {
                            const current = formData.service
                              ? formData.service.split(',')
                              : [];
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                service: [...current, light.value].join(','),
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                service: current
                                  .filter(s => s !== light.value)
                                  .join(','),
                              }));
                            }
                          }}
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple/50"
                        />
                        <span className="text-sm text-gray-300">
                          {light.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    {t('form.event_date')}
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  {t('form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                  placeholder={
                    locale === 'mr'
                      ? 'व्हेन्यू, प्रसंग, लाइट्सची संख्या...'
                      : 'Venue, occasion, number of lights needed...'
                  }
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary group inline-flex w-full items-center justify-center space-x-2 text-lg disabled:opacity-50"
              >
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span>
                  {status === 'sending' ? 'Sending...' : t('form.submit')}
                </span>
              </button>

              {status === 'success' && (
                <p className="rounded-lg border border-green-500/20 bg-green-500/10 py-3 text-center text-sm text-green-400">
                  {locale === 'mr'
                    ? '✓ चौकशी पाठवली! आम्ही लवकरच संपर्क करू.'
                    : '✓ Inquiry sent! We’ll contact you soon.'}
                </p>
              )}
              {status === 'error' && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 py-3 text-center text-sm text-red-400">
                  {locale === 'mr'
                    ? 'पाठवण्यात अयशस्वी. WhatsApp किंवा कॉल करा.'
                    : 'Failed to send. Please try WhatsApp or call directly.'}
                </p>
              )}
            </form>
          </SlideLeft>

          {/* Contact Information */}
          <SlideRight>
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Phone */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 transition-all group-hover:shadow-[0_0_20px_hsla(280,100%,60%,0.3)]">
                    <Phone className="h-5 w-5 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">
                      {t('info.phone')}
                    </h4>
                    <div className="flex flex-wrap gap-x-2">
                      {(
                        biz?.phone ||
                        process.env.NEXT_PUBLIC_BUSINESS_PHONE ||
                        ''
                      )
                        .split(',')
                        .map((p: string, i: number, arr: string[]) => (
                          <span key={p.trim()}>
                            <a
                              href={`tel:${p.trim()}`}
                              className="text-gray-400 transition-colors hover:text-neon-cyan"
                            >
                              {p.trim()}
                            </a>
                            {i < arr.length - 1 && (
                              <span className="text-gray-600">, </span>
                            )}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 transition-all group-hover:shadow-[0_0_20px_hsla(180,100%,50%,0.3)]">
                    <Mail className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">
                      {t('info.email')}
                    </h4>
                    <div className="flex flex-wrap gap-x-2">
                      {(
                        biz?.email ||
                        process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
                        ''
                      )
                        .split(',')
                        .map((e: string, i: number, arr: string[]) => (
                          <span key={e.trim()}>
                            <a
                              href={`mailto:${e.trim()}`}
                              className="text-gray-400 transition-colors hover:text-neon-cyan"
                            >
                              {e.trim()}
                            </a>
                            {i < arr.length - 1 && (
                              <span className="text-gray-600">, </span>
                            )}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neon-pink/30 bg-neon-pink/10 transition-all group-hover:shadow-[0_0_20px_hsla(320,100%,50%,0.3)]">
                    <MapPin className="h-5 w-5 text-neon-pink" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">
                      {t('info.address')}
                    </h4>
                    <p className="text-gray-400">
                      {biz?.address || process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10 transition-all group-hover:shadow-[0_0_20px_hsla(220,100%,60%,0.3)]">
                    <Clock className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">
                      {t('info.hours')}
                    </h4>
                    <p className="text-gray-400">
                      {biz?.business_hours || '24/7 for events'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glow-card p-6">
                <h4 className="mb-4 text-lg font-bold text-white">
                  {locale === 'mr' ? 'त्वरित बुकिंग' : 'Quick Booking'}
                </h4>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${(biz?.social_links?.whatsapp || biz?.phone?.split(',')[0] || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '').replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block inline-flex w-full items-center justify-center space-x-2 rounded-xl border border-green-500/50 bg-green-500/20 px-4 py-3.5 text-center font-semibold text-green-400 transition-all hover:bg-green-500/30 hover:shadow-[0_0_20px_hsla(140,100%,40%,0.2)]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>
                      {locale === 'mr'
                        ? 'WhatsApp वर संपर्क करा'
                        : 'WhatsApp Us'}
                    </span>
                  </a>
                  <a
                    href={`tel:${(biz?.phone?.split(',')[0] || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '').trim()}`}
                    className="block w-full rounded-xl border border-neon-purple/50 bg-neon-purple/20 px-4 py-3.5 text-center font-semibold text-neon-purple transition-all hover:bg-neon-purple/30 hover:shadow-[0_0_20px_hsla(280,100%,60%,0.2)]"
                  >
                    {locale === 'mr' ? 'आत्ता कॉल करा' : 'Call Now'}
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
