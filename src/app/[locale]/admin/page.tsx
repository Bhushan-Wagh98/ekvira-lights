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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { supabase } = await import('@/lib/supabase');

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || t('error'));
        setLoading(false);
        return;
      }

      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('email', data.user.email)
        .single();

      console.log('User query result:', userData, userError);

      if (userError) {
        // If RLS blocks the query, check by email as fallback
        const adminEmails = [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'wagh.bhushan.998@gmail.com'];
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'hsl(240, 10%, 4%)' }}>
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-2xl flex items-center justify-center mb-4">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
            <p className="text-gray-500 text-sm mt-1">Ekvira Lights</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all"
                placeholder="admin@ekviralights.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
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
