'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setInquiries(data);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await (supabase.from('inquiries') as any).update({ status }).eq('id', id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = async (id: string) => {
    await (supabase.from('inquiries') as any).delete().eq('id', id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : (
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">No inquiries yet.</div>
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
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=नमस्कार ${inq.name}, तुमची चौकशी मिळाली. एकवीरा लाइट्स कडून.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-green-400" />
                  </a>
                  <button
                    onClick={() => setDeleteConfirm(inq.id)}
                    className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
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

      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm mx-4 space-y-4">
            <h3 className="text-white font-bold text-lg">Confirm Delete</h3>
            <p className="text-gray-400 text-sm">Are you sure? This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10">Cancel</button>
              <button onClick={() => deleteInquiry(deleteConfirm)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500/20 border border-red-500/30 hover:bg-red-500/30">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
