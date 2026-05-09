'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { LogOut, MessageSquare, Image, CheckCircle, Trash2, MessageCircle, Clock, ChevronDown } from 'lucide-react';

export default function DashboardPage() {
  const locale = useLocale();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'inquiries' | 'gallery' | 'settings'>('inquiries');
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image_url: '', category: 'wedding' });
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [savingInfo, setSavingInfo] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/${locale}/admin`);
        return;
      }
      await fetchData();
      setLoading(false);
    };
    init();
  }, [locale, router]);

  const fetchData = async () => {
    const [inqRes, galRes, bizRes] = await Promise.all([
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery').select('*').order('order_index', { ascending: true }),
      supabase.from('business_info').select('*').single(),
    ]);
    setInquiries(inqRes.data || []);
    setGallery(galRes.data || []);
    if (bizRes.data) setBusinessInfo(bizRes.data);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('gallery').insert({
      ...galleryForm,
      is_featured: false,
      order_index: gallery.length + 1,
    });
    if (!error) {
      await fetchData();
      setGalleryForm({ title: '', description: '', image_url: '', category: 'wedding' });
      setShowGalleryForm(false);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this gallery item?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const saveBusinessInfo = async () => {
    if (!businessInfo) return;
    setSavingInfo(true);
    setSaveStatus('idle');
    const { error } = await supabase.from('business_info').update({
      phone: businessInfo.phone,
      email: businessInfo.email,
      address: businessInfo.address,
      business_hours: businessInfo.business_hours,
      social_links: businessInfo.social_links,
    }).eq('id', businessInfo.id);
    if (error) {
      console.error('Update error:', error.message);
      setSaveStatus('error');
    } else {
      setSaveStatus('success');
    }
    setSavingInfo(false);
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}/admin`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(240, 10%, 4%)' }}>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(240, 10%, 4%)' }}>
      {/* Header */}
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
                <p className="text-xl font-bold text-white">{inquiries.length}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-xl font-bold text-white">{inquiries.filter(i => i.status === 'new').length}</p>
                <p className="text-xs text-gray-400">New</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-xl font-bold text-white">{inquiries.filter(i => i.status === 'in_progress').length}</p>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-xl font-bold text-white">{inquiries.filter(i => i.status === 'completed').length}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setTab('inquiries')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === 'inquiries' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Inquiries
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === 'gallery' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Gallery
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${tab === 'settings' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'}`}
          >
            Settings
          </button>
        </div>

        {/* Inquiries Tab */}
        {tab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                No inquiries yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id} className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-white font-semibold">{inq.name}</h3>
                      <p className="text-gray-400 text-sm">{inq.phone} • {inq.service}</p>
                      <p className="text-gray-500 text-xs">{inq.message}</p>
                      <p className="text-gray-600 text-xs">{new Date(inq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status update dropdown */}
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border focus:outline-none cursor-pointer ${
                          inq.status === 'new' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                          inq.status === 'in_progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          inq.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                          'bg-gray-500/10 text-gray-400 border-gray-500/30'
                        }`}
                      >
                        <option value="new" className="bg-gray-900">New</option>
                        <option value="in_progress" className="bg-gray-900">In Progress</option>
                        <option value="completed" className="bg-gray-900">Completed</option>
                        <option value="closed" className="bg-gray-900">Closed</option>
                      </select>

                      {/* WhatsApp reply */}
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=नमस्कार ${inq.name}, तुमची चौकशी मिळाली. एकवीरा लाइट्स कडून.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                        title="Reply on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4 text-green-400" />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {tab === 'gallery' && (
          <div className="space-y-6">
            {/* Add button */}
            <button
              onClick={() => setShowGalleryForm(!showGalleryForm)}
              className="px-4 py-2 rounded-xl font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
            >
              {showGalleryForm ? 'Cancel' : '+ Add Gallery Item'}
            </button>

            {/* Add form */}
            {showGalleryForm && (
              <form onSubmit={addGalleryItem} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm(p => ({ ...p, title: e.target.value }))}
                    required
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  />
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm(p => ({ ...p, category: e.target.value }))}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none"
                  >
                    <option value="wedding" className="bg-gray-900">Wedding</option>
                    <option value="party" className="bg-gray-900">Party</option>
                    <option value="corporate" className="bg-gray-900">Corporate</option>
                    <option value="stage" className="bg-gray-900">Stage</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={galleryForm.image_url}
                  onChange={(e) => setGalleryForm(p => ({ ...p, image_url: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
                >
                  Add Item
                </button>
              </form>
            )}

            {/* Gallery list */}
            {gallery.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                No gallery items yet. Add your first one above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center">
                      {item.image_url.startsWith('http') ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <Image className="h-8 w-8 text-gray-600" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                          <p className="text-gray-500 text-xs mt-1">{item.category}</p>
                        </div>
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {tab === 'settings' && businessInfo && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
              <h3 className="text-white font-bold text-lg">Business Information</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Numbers (comma separated for multiple)</label>
                <input
                  type="text"
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="+91 77218 73991, +91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email Addresses (comma separated for multiple)</label>
                <input
                  type="text"
                  value={businessInfo.email}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="info@ekviralights.com, booking@ekviralights.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
                <textarea
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Business Hours</label>
                <input
                  type="text"
                  value={businessInfo.business_hours}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, business_hours: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={businessInfo.social_links?.whatsapp || ''}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, whatsapp: e.target.value } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="+917721873991"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={businessInfo.social_links?.instagram || ''}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, instagram: e.target.value } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="https://instagram.com/ekviralights"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Facebook URL</label>
                <input
                  type="text"
                  value={businessInfo.social_links?.facebook || ''}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, facebook: e.target.value } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="https://facebook.com/ekviralights"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">YouTube URL</label>
                <input
                  type="text"
                  value={businessInfo.social_links?.youtube || ''}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, youtube: e.target.value } })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  placeholder="https://youtube.com/@ekviralights"
                />
              </div>

              <button
                onClick={saveBusinessInfo}
                disabled={savingInfo}
                className="px-6 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                {savingInfo ? 'Saving...' : 'Save Changes'}
              </button>

              {saveStatus === 'success' && (
                <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-3">
                  ✓ Changes saved successfully!
                </p>
              )}
              {saveStatus === 'error' && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                  Failed to save. Check console for details.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
