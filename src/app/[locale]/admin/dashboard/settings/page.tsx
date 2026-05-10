'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    supabase.from('business_info').select('*').single().then(({ data }) => {
      if (data) setBusinessInfo(data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    if (!businessInfo) return;
    setSaving(true);
    setStatus('idle');
    const { error } = await (supabase.from('business_info') as any).update({
      phone: businessInfo.phone,
      email: businessInfo.email,
      address: businessInfo.address,
      business_hours: businessInfo.business_hours,
      social_links: businessInfo.social_links,
    }).eq('id', businessInfo.id);
    setStatus(error ? 'error' : 'success');
    setSaving(false);
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );

  if (!businessInfo) return <div className="text-gray-400">No data found.</div>;

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none";

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-5">
        <h3 className="text-white font-bold text-lg">Business Information</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Numbers</label>
            <input type="text" value={businessInfo.phone} onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })} className={inputClass} placeholder="+91 77218 73991" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Addresses</label>
            <input type="text" value={businessInfo.email} onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })} className={inputClass} placeholder="info@ekviralights.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Business Hours</label>
            <input type="text" value={businessInfo.business_hours} onChange={(e) => setBusinessInfo({ ...businessInfo, business_hours: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">WhatsApp Number</label>
            <input type="text" value={businessInfo.social_links?.whatsapp || ''} onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, whatsapp: e.target.value } })} className={inputClass} placeholder="+917721873991" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram URL</label>
            <input type="text" value={businessInfo.social_links?.instagram || ''} onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, instagram: e.target.value } })} className={inputClass} placeholder="https://instagram.com/ekviralights" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Facebook URL</label>
            <input type="text" value={businessInfo.social_links?.facebook || ''} onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, facebook: e.target.value } })} className={inputClass} placeholder="https://facebook.com/ekviralights" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">YouTube URL</label>
            <input type="text" value={businessInfo.social_links?.youtube || ''} onChange={(e) => setBusinessInfo({ ...businessInfo, social_links: { ...businessInfo.social_links, youtube: e.target.value } })} className={inputClass} placeholder="https://youtube.com/@ekviralights" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
            <textarea value={businessInfo.address} onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })} rows={2} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <button onClick={save} disabled={saving} className="px-6 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {status === 'success' && <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-3">✓ Changes saved successfully!</p>}
        {status === 'error' && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">Failed to save. Check console for details.</p>}
      </div>
    </div>
  );
}
