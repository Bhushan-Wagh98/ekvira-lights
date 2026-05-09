'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, Users } from 'lucide-react';
import { cn } from '@/utils';

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-bg particles-bg">
      {/* Background beams - CSS only, no JS animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent animate-pulse-glow" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-cyan/15 to-transparent animate-pulse-glow" style={{ animationDelay: '1s' }} />

        {/* Glowing orbs - CSS animation */}
        <div className="absolute top-20 right-10 w-48 h-48 md:w-64 md:h-64 bg-neon-purple/15 rounded-full blur-[80px] animate-pulse-glow" />
        <div className="absolute bottom-20 left-10 w-56 h-56 md:w-72 md:h-72 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-neon-purple/30"
            >
              <Zap className="h-4 w-4 text-neon-cyan" />
              <span className="text-sm font-semibold text-neon-cyan">Lights on Rent</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              <h1 className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight",
                locale === 'mr' ? 'font-marathi' : ''
              )}>
                <span className="text-gradient">{t('title')}</span>
              </h1>
              <p className={cn(
                "text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl",
                locale === 'mr' ? 'font-marathi' : ''
              )}>
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
                <div className="w-11 h-11 bg-neon-purple/10 border border-neon-purple/30 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">500+</div>
                  <div className="text-xs text-gray-400">Events Done</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl flex items-center justify-center">
                  <Star className="h-5 w-5 text-neon-cyan" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">4.9/5</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center space-x-2 group text-base sm:text-lg"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="relative w-full aspect-square">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-neon-purple/15 via-neon-pink/10 to-neon-cyan/15 blur-xl animate-pulse-glow" />
              </div>

              {/* Rotating ring - CSS only */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-44 h-44">
                  <div className="absolute inset-0 rounded-full border-2 border-neon-purple/20 animate-beam" />
                  <div className="absolute inset-4 rounded-full border border-neon-cyan/15 animate-beam" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shadow-[0_0_40px_hsla(280,100%,60%,0.4)]">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating labels - CSS animation */}
              <div className="absolute top-8 right-8 bg-white/5 backdrop-blur-md border border-neon-purple/30 rounded-xl px-4 py-2.5 animate-float">
                <span className="text-neon-purple font-bold text-sm">Sharpy</span>
              </div>
              <div className="absolute top-1/4 left-4 bg-white/5 backdrop-blur-md border border-neon-cyan/30 rounded-xl px-4 py-2.5 animate-float" style={{ animationDelay: '0.7s' }}>
                <span className="text-neon-cyan font-bold text-sm">Laser</span>
              </div>
              <div className="absolute bottom-1/4 right-4 bg-white/5 backdrop-blur-md border border-neon-pink/30 rounded-xl px-4 py-2.5 animate-float" style={{ animationDelay: '1.4s' }}>
                <span className="text-neon-pink font-bold text-sm">Blinder</span>
              </div>
              <div className="absolute bottom-8 left-8 bg-white/5 backdrop-blur-md border border-neon-blue/30 rounded-xl px-4 py-2.5 animate-float" style={{ animationDelay: '2.1s' }}>
                <span className="text-neon-blue font-bold text-sm">Bottom</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-neon-purple/40 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-neon-purple rounded-full mt-1.5 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
