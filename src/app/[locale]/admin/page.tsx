'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LogIn, Zap } from 'lucide-react';

export default function AdminPage() {
  const t = useTranslations('admin.login');
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { supabase } = await import('@/lib/supabase');
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push(`/${locale}/admin/dashboard`);
      } else {
        setChecking(false);
      }
    };
    checkSession();
  }, [locale, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { supabase } = await import('@/lib/supabase');

      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message || t('error'));
        setLoading(false);
        return;
      }

      // Check if user is admin
      const { data: userData, error: userError } = await (
        supabase.from('users') as any
      )
        .select('role')
        .eq('email', data.user.email)
        .single();

      console.log('User query result:', userData, userError);

      if (userError) {
        // If RLS blocks the query, check by email as fallback
        const adminEmails = [
          process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'wagh.bhushan.998@gmail.com',
        ];
        if (!adminEmails.includes(data.user.email || '')) {
          setError('Access denied. Admin only.');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }
      } else if (userData?.role !== 'admin') {
        setError('Access denied. Admin only.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      router.push(`/${locale}/admin/dashboard`);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: 'hsl(240, 10%, 4%)' }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: 'hsl(240, 10%, 4%)' }}
    >
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899]">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">Ekvira Lights</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                placeholder="admin@ekviralights.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center space-x-2 rounded-xl py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              }}
            >
              <LogIn className="h-5 w-5" />
              <span>{loading ? 'Loading...' : t('submit')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
