'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react';
import { cn } from '@/utils';

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [biz, setBiz] = useState<any>(null);

  useEffect(() => {
    const fetchBiz = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('business_info') as any).select('*').single();
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
    { name: t('navigation.services'), href: `/${locale}#services` },
    { name: t('navigation.gallery'), href: `/${locale}#gallery` },
    { name: t('navigation.contact'), href: `/${locale}#contact` },
  ];

  const lights = ['Sharpy Lights', 'Blinder Lights', 'Bottom Lights', 'Laser Lights'];

  return (
    <footer className="relative" style={{ background: 'hsl(240, 10%, 3%)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      <div className="container mx-auto container-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center shadow-[0_0_20px_hsla(280,100%,60%,0.3)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ekvira Lights</h3>
                <p className="text-xs text-neon-cyan">DJ Lights on Rent</p>
              </div>
            </div>
            <p className={cn(
              "text-gray-500 leading-relaxed text-sm",
              locale === 'mr' ? 'font-marathi' : ''
            )}>
              Sharpy, Blinder, Bottom & Laser lights on rent for weddings, parties, and all events.
            </p>
            <div className="flex space-x-3">
              {biz?.social_links?.facebook && (
                <a href={biz.social_links.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-neon-purple/50 hover:bg-neon-purple/10 rounded-lg flex items-center justify-center transition-all">
                  <Facebook className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {biz?.social_links?.instagram && (
                <a href={biz.social_links.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-neon-pink/50 hover:bg-neon-pink/10 rounded-lg flex items-center justify-center transition-all">
                  <Instagram className="h-4 w-4 text-gray-400" />
                </a>
              )}
              {biz?.social_links?.youtube && (
                <a href={biz.social_links.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-lg flex items-center justify-center transition-all">
                  <Youtube className="h-4 w-4 text-gray-400" />
                </a>
              )}
              <a
                href={`https://wa.me/${(whatsapp || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 rounded-lg flex items-center justify-center transition-all"
              >
                <MessageCircle className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-neon-purple transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lights */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Our Lights</h4>
            <ul className="space-y-3">
              {lights.map((light) => (
                <li key={light}>
                  <span className="text-gray-500 text-sm">{light}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-neon-purple flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-1 text-sm">
                  {(phone || '').split(',').map((p: string, i: number, arr: string[]) => (
                    <span key={p.trim()}>
                      <a href={`tel:${p.trim()}`} className="text-gray-400 hover:text-white transition-colors">{p.trim()}</a>
                      {i < arr.length - 1 && <span className="text-gray-600">,</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-1 text-sm">
                  {(email || '').split(',').map((e: string, i: number, arr: string[]) => (
                    <span key={e.trim()}>
                      <a href={`mailto:${e.trim()}`} className="text-gray-400 hover:text-white transition-colors">{e.trim()}</a>
                      {i < arr.length - 1 && <span className="text-gray-600">,</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-neon-pink flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto container-padding py-6 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Ekvira Lights. All rights reserved.
          </p>
          <Link href={`/${locale}/admin`} className="text-gray-700 hover:text-gray-500 text-xs transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
