'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Star } from 'lucide-react';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';

const Reviews = () => {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('reviews') as any)
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="section-padding relative" style={{ background: 'hsl(240, 10%, 5%)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="container mx-auto container-padding relative z-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="glow-card p-6 space-y-4">
              {rev.photo_url ? (
                <img src={rev.photo_url} alt={rev.customer_name} className="w-full h-40 object-cover rounded-xl" />
              ) : (
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-neon-purple/10 via-background to-neon-cyan/10 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
              <div className="flex text-yellow-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"{rev.review_text}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{rev.customer_name}</p>
                <p className="text-gray-500 text-xs">{rev.event_type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
