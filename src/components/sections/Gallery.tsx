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
      const { data } = await (supabase
        .from('gallery') as any)
        .select('*')
        .eq('is_featured', true)
        .order('order_index', { ascending: true });
      if (data) setGalleryItems(data);
    };
    fetchGallery();
  }, []);


  if (galleryItems.length === 0) return null;

  return (
    <section id="gallery" className="section-padding relative" style={{ background: 'hsl(240, 10%, 4%)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />

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

        {/* Gallery Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group glow-card overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                {item.image_url?.startsWith('http') ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon-purple/20 via-background to-neon-cyan/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-md text-neon-cyan px-3 py-1 rounded-full text-xs font-bold border border-neon-cyan/30">
                    {categories.find(c => c.key === item.category)?.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 text-sm">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="text-center mt-16">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '')}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2 group text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Book for Your Event</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Gallery;
