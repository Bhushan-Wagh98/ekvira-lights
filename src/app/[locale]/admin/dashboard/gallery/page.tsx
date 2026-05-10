'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Image, Trash2, Pencil } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', category: 'wedding' });
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', image_url: '', category: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('gallery').select('*').order('order_index', { ascending: true }).then(({ data }) => {
      if (data) setGallery(data);
      setLoading(false);
    });
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await (supabase.from('gallery') as any).insert({ ...form, is_featured: false, order_index: gallery.length + 1 });
    if (!error) {
      const { data } = await supabase.from('gallery').select('*').order('order_index', { ascending: true });
      if (data) setGallery(data);
      setForm({ title: '', description: '', image_url: '', category: 'wedding' });
      setShowForm(false);
    }
  };

  const saveEdit = async (id: string) => {
    await (supabase.from('gallery') as any).update(editForm).eq('id', id);
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...editForm } : g));
    setEditing(null);
  };

  const deleteItem = async (id: string) => {
    await (supabase.from('gallery') as any).delete().eq('id', id);
    setGallery(prev => prev.filter(g => g.id !== id));
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
          {showForm ? 'Cancel' : '+ Add Gallery Item'}
        </button>

        {showForm && (
          <form onSubmit={addItem} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required className={inputClass} />
              <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} className={inputClass}>
                <option value="wedding" className="bg-gray-900">Wedding</option>
                <option value="party" className="bg-gray-900">Party</option>
                <option value="corporate" className="bg-gray-900">Corporate</option>
                <option value="stage" className="bg-gray-900">Stage</option>
              </select>
            </div>
            <input type="text" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm(p => ({ ...p, image_url: e.target.value }))} required className={inputClass} />
            <input type="text" placeholder="Description (optional)" value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} className={inputClass} />
            <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Add Item</button>
          </form>
        )}

        {gallery.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">No gallery items yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {editing === item.id ? (
                  <div className="p-4 space-y-3">
                    <input type="text" value={editForm.title} onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))} className={inputClass} placeholder="Title" />
                    <input type="text" value={editForm.image_url} onChange={(e) => setEditForm(p => ({ ...p, image_url: e.target.value }))} className={inputClass} placeholder="Image URL" />
                    <input type="text" value={editForm.description} onChange={(e) => setEditForm(p => ({ ...p, description: e.target.value }))} className={inputClass} placeholder="Description" />
                    <select value={editForm.category} onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value }))} className={inputClass}>
                      <option value="wedding" className="bg-gray-900">Wedding</option>
                      <option value="party" className="bg-gray-900">Party</option>
                      <option value="corporate" className="bg-gray-900">Corporate</option>
                      <option value="stage" className="bg-gray-900">Stage</option>
                    </select>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(item.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-green-500/20 border border-green-500/30 hover:bg-green-500/30">Save</button>
                      <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center">
                      {item.image_url.startsWith('http') ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" /> : <Image className="h-8 w-8 text-gray-600" />}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                          <p className="text-gray-500 text-xs mt-1">{item.category}</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => { setEditing(item.id); setEditForm({ title: item.title, description: item.description || '', image_url: item.image_url, category: item.category }); }} className="p-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20">
                            <Pencil className="h-3.5 w-3.5 text-purple-400" />
                          </button>
                          <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20">
                            <Trash2 className="h-3.5 w-3.5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
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
              <button onClick={() => deleteItem(deleteConfirm)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500/20 border border-red-500/30 hover:bg-red-500/30">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
