'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Star, Users } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="gradient-bg particles-bg relative flex min-h-screen items-center overflow-hidden pt-[72px]">
      {/* Background beams - CSS only, no JS animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-glow absolute left-1/4 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent" />
        <div
          className="animate-pulse-glow absolute right-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-neon-cyan/15 to-transparent"
          style={{ animationDelay: '1s' }}
        />

        {/* Glowing orbs - CSS animation */}
        <div className="animate-pulse-glow absolute right-10 top-20 h-48 w-48 rounded-full bg-neon-purple/15 blur-[80px] md:h-64 md:w-64" />
        <div
          className="animate-pulse-glow absolute bottom-20 left-10 h-56 w-56 rounded-full bg-neon-cyan/10 blur-[100px] md:h-72 md:w-72"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-padding container relative z-10 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center space-x-2 rounded-full border border-neon-purple/30 bg-white/5 px-4 py-2 backdrop-blur-md"
            >
              <Zap className="h-4 w-4 text-neon-cyan" />
              <span className="text-sm font-semibold text-neon-cyan">
                Lights on Rent
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-gradient font-jaini">एकवीरा लाइट्स</span>
                <span className="text-gradient mt-2 block text-2xl sm:text-3xl md:text-4xl">
                  {' '}
                  — DJ Lights on Rent
                </span>
              </h1>
              <p
                className={cn(
                  'max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl',
                  locale === 'mr' ? 'font-marathi' : ''
                )}
              >
                {t('subtitle')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10">
                  <Users className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">500+</div>
                  <div className="text-xs text-gray-400">Events Done</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10">
                  <Star className="h-5 w-5 text-neon-cyan" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">4.9/5</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col gap-4 pt-2 sm:flex-row"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center justify-center space-x-2 text-base sm:text-lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t('cta')}</span>
              </a>
              <Link
                href={`/${locale}#services`}
                className="btn-secondary inline-flex items-center justify-center text-base sm:text-lg"
              >
                {t('cta_secondary')}
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual - simplified for performance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square w-full">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse-glow h-64 w-64 rounded-full bg-gradient-to-br from-neon-purple/15 via-neon-pink/10 to-neon-cyan/15 blur-xl" />
              </div>

              {/* Rotating ring - CSS only */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-44 w-44">
                  <div className="animate-beam absolute inset-0 rounded-full border-2 border-neon-purple/20" />
                  <div
                    className="animate-beam absolute inset-4 rounded-full border border-neon-cyan/15"
                    style={{
                      animationDirection: 'reverse',
                      animationDuration: '12s',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-pink shadow-[0_0_40px_hsla(280,100%,60%,0.4)]">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating labels - CSS animation */}
              <div className="animate-float absolute right-8 top-8 rounded-xl border border-neon-purple/30 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                <span className="text-sm font-bold text-neon-purple">
                  Sharpy
                </span>
              </div>
              <div
                className="animate-float absolute left-4 top-1/4 rounded-xl border border-neon-cyan/30 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                style={{ animationDelay: '0.7s' }}
              >
                <span className="text-sm font-bold text-neon-cyan">Laser</span>
              </div>
              <div
                className="animate-float absolute bottom-1/4 right-4 rounded-xl border border-neon-pink/30 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                style={{ animationDelay: '1.4s' }}
              >
                <span className="text-sm font-bold text-neon-pink">
                  Blinder
                </span>
              </div>
              <div
                className="animate-float absolute bottom-8 left-8 rounded-xl border border-neon-blue/30 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                style={{ animationDelay: '2.1s' }}
              >
                <span className="text-sm font-bold text-neon-blue">Bottom</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-8 w-5 justify-center rounded-full border-2 border-neon-purple/40">
          <div className="mt-1.5 h-2.5 w-1 animate-pulse rounded-full bg-neon-purple" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
