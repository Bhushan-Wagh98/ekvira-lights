'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LogOut, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/${locale}/admin`);
        return;
      }
      const { data } = await supabase.from('inquiries').select('status');
      if (data) {
        setStats({
          total: data.length,
          new: data.filter(i => i.status === 'new').length,
          inProgress: data.filter(i => i.status === 'in_progress').length,
          completed: data.filter(i => i.status === 'completed').length,
        });
      }
      setLoading(false);
    };
    init();
  }, [locale, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}/admin`);
  };

  const tabs = [
    { key: 'inquiries', label: 'Inquiries', href: `/${locale}/admin/dashboard/inquiries` },
    { key: 'gallery', label: 'Gallery', href: `/${locale}/admin/dashboard/gallery` },
    { key: 'reviews', label: 'Reviews', href: `/${locale}/admin/dashboard/reviews` },
    { key: 'settings', label: 'Settings', href: `/${locale}/admin/dashboard/settings` },
  ];

  const activeTab = tabs.find(t => pathname.includes(t.key))?.key || 'inquiries';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(240, 10%, 4%)' }}>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(240, 10%, 4%)' }}>
      <header className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-xl font-bold text-white">{stats.new}</p>
                <p className="text-xs text-gray-400">New</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-xl font-bold text-white">{stats.inProgress}</p>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-xl font-bold text-white">{stats.completed}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs as Links */}
        <div className="flex space-x-4 mb-6">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === t.key ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
