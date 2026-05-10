'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Zap, Sun, ArrowDown, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/ScrollAnimations';

const Services = () => {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    {
      icon: Zap,
      key: 'sharpy',
      color: 'neon-purple',
      glow: 'hsla(280, 100%, 60%, 0.4)',
    },
    {
      icon: Sun,
      key: 'blinder',
      color: 'neon-pink',
      glow: 'hsla(320, 100%, 50%, 0.4)',
    },
    {
      icon: ArrowDown,
      key: 'bottom',
      color: 'neon-cyan',
      glow: 'hsla(180, 100%, 50%, 0.4)',
    },
    {
      icon: Sparkles,
      key: 'laser',
      color: 'neon-blue',
      glow: 'hsla(220, 100%, 60%, 0.4)',
    },
  ];

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ background: 'hsl(240, 10%, 6%)' }}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      </div>

      <div className="container-padding container relative z-10 mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="mx-auto mb-20 max-w-3xl text-center">
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

        {/* Services Grid */}
        <StaggerContainer className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {services.map(service => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.key}>
                <div className="glow-card card-hover spotlight-sweep group h-full p-8">
                  {/* Icon */}
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${service.glow}, transparent)`,
                      boxShadow: `0 0 30px ${service.glow}`,
                    }}
                  >
                    <Icon className={`h-8 w-8 text-${service.color}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3
                      className={cn(
                        'text-2xl font-bold text-white transition-colors group-hover:text-neon-purple',
                        locale === 'mr' ? 'font-marathi' : ''
                      )}
                    >
                      {t(`${service.key}.title`)}
                    </h3>
                    <p
                      className={cn(
                        'leading-relaxed text-gray-400',
                        locale === 'mr' ? 'font-marathi' : ''
                      )}
                    >
                      {t(`${service.key}.description`)}
                    </p>
                  </div>

                  {/* Bottom glow line */}
                  <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink transition-all duration-700 group-hover:w-full" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="mt-20 text-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>
                {locale === 'mr'
                  ? 'WhatsApp वर लाइट्स बुक करा'
                  : 'Book Lights on WhatsApp'}
              </span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Services;
