'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const navigation = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.services'), href: `/${locale}#services` },
    { name: t('navigation.gallery'), href: `/${locale}#gallery` },
    { name: t('navigation.contact'), href: `/${locale}#contact` },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'mr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <nav className="container mx-auto container-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center shadow-[0_0_20px_hsla(280,100%,60%,0.3)] group-hover:shadow-[0_0_30px_hsla(280,100%,60%,0.5)] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Ekvira Lights</h1>
              <p className="text-xs text-neon-cyan">DJ Lights on Rent</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-neon-purple transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-400 hover:text-neon-cyan transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{locale === 'en' ? 'मराठी' : 'English'}</span>
            </button>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`}
              className="flex items-center space-x-2 bg-neon-purple/10 border border-neon-purple/30 text-neon-purple px-4 py-2 rounded-xl font-semibold hover:bg-neon-purple/20 transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-neon-purple transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-400 hover:text-neon-cyan transition-colors w-fit"
              >
                <Globe className="h-4 w-4" />
                <span>{locale === 'en' ? 'मराठी' : 'English'}</span>
              </button>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`}
                className="btn-primary w-fit text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
