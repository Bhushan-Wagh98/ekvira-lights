'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram, Play, Pause } from 'lucide-react';
import { cn } from '@/utils';
import { FadeUp } from '@/components/ui/ScrollAnimations';

const MediaItem = ({ post }: { post: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isVideo = post.media_type === 'video' || /\.(mp4|webm|mov)$/i.test(post.image_url);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  if (isVideo) {
    return (
      <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all">
        <video
          ref={videoRef}
          src={post.image_url}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          poster={post.thumbnail_url || undefined}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          {playing ? (
            <Pause className="h-10 w-10 text-white drop-shadow-lg" />
          ) : (
            <Play className="h-10 w-10 text-white drop-shadow-lg" />
          )}
        </button>
        {post.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-xs truncate">{post.caption}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <a
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <MediaItem key={post.id} post={post} />
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="text-center mt-10">
            <a
              href="https://instagram.com/ekvira_lights_07"
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
