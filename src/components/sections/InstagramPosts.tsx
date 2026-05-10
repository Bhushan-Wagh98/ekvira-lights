'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram } from 'lucide-react';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';

const InstagramPosts = () => {
  const t = useTranslations('instagram');
  const locale = useLocale();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await (supabase.from('instagram_posts') as any)
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="section-padding relative" style={{ background: 'hsl(240, 10%, 4%)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />

      <div className="container mx-auto container-padding relative z-10">
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-12">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all"
            >
              <img src={post.image_url} alt={post.caption || 'Instagram'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </a>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="text-center mt-10">
            <a
              href="https://instagram.com/ekviralights"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center space-x-2 text-base"
            >
              <Instagram className="h-5 w-5" />
              <span>{t('follow')}</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default InstagramPosts;
