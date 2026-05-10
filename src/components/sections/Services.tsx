'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Zap, Sun, ArrowDown, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { cn } from '@/utils';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/ScrollAnimations';

const Services = () => {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    { icon: Zap, key: 'sharpy', color: 'neon-purple', glow: 'hsla(280, 100%, 60%, 0.4)' },
    { icon: Sun, key: 'blinder', color: 'neon-pink', glow: 'hsla(320, 100%, 50%, 0.4)' },
    { icon: ArrowDown, key: 'bottom', color: 'neon-cyan', glow: 'hsla(180, 100%, 50%, 0.4)' },
    { icon: Sparkles, key: 'laser', color: 'neon-blue', glow: 'hsla(220, 100%, 60%, 0.4)' },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden" style={{ background: 'hsl(240, 10%, 6%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-20">
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

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.key}>
                <div className="group glow-card p-8 card-hover spotlight-sweep h-full">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${service.glow}, transparent)`,
                      boxShadow: `0 0 30px ${service.glow}`,
                    }}
                  >
                    <Icon className={`h-8 w-8 text-${service.color}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className={cn(
                      "text-2xl font-bold text-white group-hover:text-neon-purple transition-colors",
                      locale === 'mr' ? 'font-marathi' : ''
                    )}>
                      {t(`${service.key}.title`)}
                    </h3>
                    <p className={cn(
                      "text-gray-400 leading-relaxed",
                      locale === 'mr' ? 'font-marathi' : ''
                    )}>
                      {t(`${service.key}.description`)}
                    </p>
                  </div>

                  {/* Bottom glow line */}
                  <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink rounded-full transition-all duration-700" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="text-center mt-20">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{locale === 'mr' ? 'WhatsApp वर लाइट्स बुक करा' : 'Book Lights on WhatsApp'}</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Services;
