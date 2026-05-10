'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();
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

  const phone = biz?.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  const email = biz?.email || process.env.NEXT_PUBLIC_BUSINESS_EMAIL;
  const address = biz?.address || process.env.NEXT_PUBLIC_BUSINESS_ADDRESS;
  const whatsapp = biz?.social_links?.whatsapp || phone;

  const quickLinks = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.gallery'), href: `/${locale}#gallery` },
    { name: t('navigation.services'), href: `/${locale}#services` },
    { name: t('common.reviews'), href: `/${locale}#reviews` },
    { name: 'Instagram', href: `/${locale}#instagram` },
    { name: t('navigation.contact'), href: `/${locale}#contact` },
  ];

  const lights = [
    t('services.sharpy.title'),
    t('services.blinder.title'),
    t('services.bottom.title'),
    t('services.laser.title'),
  ];

  return (
    <footer className="relative" style={{ background: 'hsl(240, 10%, 3%)' }}>
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      <div className="container-padding container mx-auto py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink shadow-[0_0_20px_hsla(280,100%,60%,0.3)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-jaini text-lg font-bold text-white">
                  एकवीरा लाइट्स
                </h3>
                <p className="text-xs text-neon-cyan">DJ Lights on Rent</p>
              </div>
            </div>
            <p
              className={cn(
                'text-sm leading-relaxed text-gray-500',
                locale === 'mr' ? 'font-marathi' : ''
              )}
            >
              {locale === 'mr'
                ? 'लग्न, पार्टी आणि सर्व प्रसंगांसाठी शार्पी, ब्लाइंडर, बॉटम आणि लेझर लाइट्स भाड्याने उपलब्ध.'
                : 'Sharpy, Blinder, Bottom & Laser lights on rent for weddings, parties, and all events.'}
            </p>
            <div className="flex space-x-3">
              {biz?.social_links?.facebook && (
                <a
                  href={biz.social_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-neon-purple/50 hover:bg-neon-purple/10"
                >
                  <Facebook className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {biz?.social_links?.instagram && (
                <a
                  href={biz.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-neon-pink/50 hover:bg-neon-pink/10"
                >
                  <Instagram className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {biz?.social_links?.youtube && (
                <a
                  href={biz.social_links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-red-500/50 hover:bg-red-500/10"
                >
                  <Youtube className="h-4 w-4 text-gray-400" />
                </a>
              )}
              <a
                href={`https://wa.me/${(whatsapp || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-green-500/50 hover:bg-green-500/10"
              >
                <WhatsAppIcon className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              {locale === 'mr' ? 'लिंक्स' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-neon-purple"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lights */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              {t('navigation.services')}
            </h4>
            <ul className="space-y-3">
              {lights.map(light => (
                <li key={light}>
                  <span className="text-sm text-gray-500">{light}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              {t('navigation.contact')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-purple" />
                <div className="flex flex-wrap gap-x-1 text-sm">
                  {(phone || '')
                    .split(',')
                    .map((p: string, i: number, arr: string[]) => (
                      <span key={p.trim()}>
                        <a
                          href={`tel:${p.trim()}`}
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {p.trim()}
                        </a>
                        {i < arr.length - 1 && (
                          <span className="text-gray-600">,</span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-cyan" />
                <div className="flex flex-wrap gap-x-1 text-sm">
                  {(email || '')
                    .split(',')
                    .map((e: string, i: number, arr: string[]) => (
                      <span key={e.trim()}>
                        <a
                          href={`mailto:${e.trim()}`}
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {e.trim()}
                        </a>
                        {i < arr.length - 1 && (
                          <span className="text-gray-600">,</span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-pink" />
                <p className="text-sm text-gray-400">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-padding container mx-auto flex items-center justify-between py-6">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Ekvira Lights. All rights reserved.
          </p>
          <a
            href={`/${locale}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-700 transition-colors hover:text-gray-500"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
