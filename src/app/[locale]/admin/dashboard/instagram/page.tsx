'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Instagram } from 'lucide-react';

export default function InstagramPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('instagram_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPosts(data);
      setLoading(false);
    });
  }, []);

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await (supabase.from('instagram_posts') as any).insert({
      post_url: postUrl,
      image_url: postUrl,
      is_active: true,
    });
    if (!error) {
      const { data } = await supabase.from('instagram_posts').select('*').order('created_at', { ascending: false });
      if (data) setPosts(data);
      setPostUrl('');
      setShowForm(false);
    }
  };

  const deletePost = async (id: string) => {
    await (supabase.from('instagram_posts') as any).delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : (
      <div className="space-y-6">
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
          {showForm ? 'Cancel' : '+ Add Instagram Post'}
        </button>

        {showForm && (
          <form onSubmit={addPost} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <p className="text-gray-400 text-xs">Paste any Instagram post or reel URL. It will be embedded directly on the site.</p>
            <input
              type="text"
              placeholder="https://www.instagram.com/reel/... or https://www.instagram.com/p/..."
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-purple-500/50 focus:outline-none"
            />
            <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Add Post</button>
          </form>
        )}

        {posts.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">No Instagram posts yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Instagram className="h-4 w-4 text-pink-400 flex-shrink-0" />
                    <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs truncate hover:text-white">
                      {post.post_url}
                    </a>
                  </div>
                  <button onClick={() => setDeleteConfirm(post.id)} className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 ml-2 flex-shrink-0">
                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                  </button>
                </div>
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
              <button onClick={() => deletePost(deleteConfirm)} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500/20 border border-red-500/30 hover:bg-red-500/30">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
