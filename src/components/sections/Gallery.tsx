'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const Gallery = () => {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  const categories = [
    { key: 'wedding', label: t('categories.wedding') },
    { key: 'party', label: t('categories.party') },
    { key: 'corporate', label: t('categories.corporate') },
    { key: 'stage', label: t('categories.stage') },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('gallery') as any)
        .select('*')
        .eq('is_featured', true)
        .order('order_index', { ascending: true });
      if (data) setGalleryItems(data);
    };
    fetchGallery();
  }, []);

  if (galleryItems.length === 0) return null;

  return (
    <section
      id="gallery"
      className="section-padding relative"
      style={{ background: 'hsl(240, 10%, 4%)' }}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />

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

        {/* Gallery Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glow-card card-hover group overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.image_url?.startsWith('http') ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neon-purple/20 via-background to-neon-cyan/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-neon-cyan/30 bg-black/50 px-3 py-1 text-xs font-bold text-neon-cyan backdrop-blur-md">
                    {categories.find(c => c.key === item.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-neon-purple">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group inline-flex items-center space-x-2 text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>
                {locale === 'mr'
                  ? 'तुमच्या इव्हेंटसाठी बुक करा'
                  : 'Book for Your Event'}
              </span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Gallery;
