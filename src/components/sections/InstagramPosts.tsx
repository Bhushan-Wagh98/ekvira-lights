'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram } from 'lucide-react';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';

const InstagramEmbed = ({ url }: { url: string }) => {
  const embedUrl = url.replace(/\?.*$/, '') + 'embed';

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all leading-[0]" style={{ maxHeight: '650px' }}>
      <iframe
        src={embedUrl}
        className="w-full border-0 block"
        style={{ height: '700px', marginBottom: '-50px' }}
        scrolling="no"
        allowFullScreen
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      />
    </div>
  );
};

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <InstagramEmbed key={post.id} url={post.post_url} />
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/reel/DYH4YEqTyta/?igsh=OHY3dmFjbnZsemgw"
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
