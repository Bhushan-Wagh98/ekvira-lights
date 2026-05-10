'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram } from 'lucide-react';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';

const InstagramEmbed = ({ url }: { url: string }) => {
  const embedUrl = url.replace(/\?.*$/, '') + 'embed';

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/10 leading-[0] transition-all hover:border-neon-pink/50"
      style={{ maxHeight: '650px' }}
    >
      <iframe
        src={embedUrl}
        className="block w-full border-0"
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
    <section
      id="instagram"
      className="section-padding relative"
      style={{ background: 'hsl(240, 10%, 4%)' }}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />

      <div className="container-padding container relative z-10 mx-auto">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-3xl text-center">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <InstagramEmbed key={post.id} url={post.post_url} />
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-10 text-center">
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
