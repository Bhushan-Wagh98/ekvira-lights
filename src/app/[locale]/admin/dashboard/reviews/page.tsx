'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Pencil } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_name: '', event_type: '', rating: 5, review_text: '', photo_url: '' });
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ customer_name: '', event_type: '', rating: 5, review_text: '', photo_url: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('reviews').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setReviews(data);
      setLoading(false);
    });
  }, []);

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error: err } = await (supabase.from('reviews') as any).insert({ ...form, photo_url: form.photo_url || null, is_featured: true });
    if (err) { setError('Failed: ' + err.message); return; }
    setError('');
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data);
    setForm({ customer_name: '', event_type: '', rating: 5, review_text: '', photo_url: '' });
    setShowForm(false);
  };

  const saveEdit = async (id: string) => {
    const payload = { ...editForm, photo_url: editForm.photo_url || null };
    await (supabase.from('reviews') as any).update(payload).eq('id', id);
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...payload } : r));
    setEditing(null);
  };

  const deleteReview = async (id: string) => {
    await (supabase.from('reviews') as any).delete().eq('id', id);
    setReviews(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const inputClass = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500/50 focus:outline-none";

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : (
      <div className="space-y-6">
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
          {showForm ? 'Cancel' : '+ Add Review'}
        </button>

        {showForm && (
          <form onSubmit={addReview} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Customer Name" value={form.customer_name} onChange={(e) => setForm(p => ({ ...p, customer_name: e.target.value }))} required className={inputClass} />
              <input type="text" placeholder="Event Type" value={form.event_type} onChange={(e) => setForm(p => ({ ...p, event_type: e.target.value }))} required className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select value={form.rating} onChange={(e) => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className={inputClass}>
                <option value={5} className="bg-gray-900">⭐⭐⭐⭐⭐ (5)</option>
                <option value={4} className="bg-gray-900">⭐⭐⭐⭐ (4)</option>
                <option value={3} className="bg-gray-900">⭐⭐⭐ (3)</option>
              </select>
              <input type="text" placeholder="Photo URL (optional)" value={form.photo_url} onChange={(e) => setForm(p => ({ ...p, photo_url: e.target.value }))} className={inputClass} />
            </div>
            <textarea placeholder="Review text" value={form.review_text} onChange={(e) => setForm(p => ({ ...p, review_text: e.target.value }))} required rows={3} className={`${inputClass} resize-none`} />
            <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Add Review</button>
            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">{error}</p>}
          </form>
        )}

        {reviews.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">No reviews yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                {editing === rev.id ? (
                  <div className="space-y-3">
                    <input type="text" value={editForm.customer_name} onChange={(e) => setEditForm(p => ({ ...p, customer_name: e.target.value }))} className={inputClass} placeholder="Customer Name" />
                    <input type="text" value={editForm.event_type} onChange={(e) => setEditForm(p => ({ ...p, event_type: e.target.value }))} className={inputClass} placeholder="Event Type" />
                    <select value={editForm.rating} onChange={(e) => setEditForm(p => ({ ...p, rating: Number(e.target.value) }))} className={inputClass}>
                      <option value={5} className="bg-gray-900">⭐⭐⭐⭐⭐ (5)</option>
                      <option value={4} className="bg-gray-900">⭐⭐⭐⭐ (4)</option>
                      <option value={3} className="bg-gray-900">⭐⭐⭐ (3)</option>
                    </select>
                    <textarea value={editForm.review_text} onChange={(e) => setEditForm(p => ({ ...p, review_text: e.target.value }))} rows={2} className={`${inputClass} resize-none`} placeholder="Review text" />
                    <input type="text" value={editForm.photo_url} onChange={(e) => setEditForm(p => ({ ...p, photo_url: e.target.value }))} className={inputClass} placeholder="Photo URL (optional)" />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(rev.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-green-500/20 border border-green-500/30 hover:bg-green-500/30">Save</button>
                      <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-white font-semibold">{rev.customer_name}</h4>
                        <p className="text-gray-500 text-xs">{rev.event_type}</p>
                        <div className="text-yellow-400 text-sm">{'⭐'.repeat(rev.rating)}</div>
                        <p className="text-gray-400 text-sm mt-2">{rev.review_text}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditing(rev.id); setEditForm({ customer_name: rev.customer_name, event_type: rev.event_type, rating: rev.rating, review_text: rev.review_text, photo_url: rev.photo_url || '' }); }} className="p-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20">
                          <Pencil className="h-3.5 w-3.5 text-purple-400" />
                        </button>
                        <button onClick={() => setDeleteConfirm(rev.id)} className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20">
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                    {rev.photo_url && <img src={rev.photo_url} alt={rev.customer_name} className="mt-3 w-full h-32 object-cover rounded-lg" />}
                  </>
                )}
              </div>
            ))}
          </div>
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
              <button onClick={() => deleteReview(deleteConfirm)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500/20 border border-red-500/30 hover:bg-red-500/30">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
