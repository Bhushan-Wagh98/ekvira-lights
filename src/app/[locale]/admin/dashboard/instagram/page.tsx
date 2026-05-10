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
    supabase
      .from('instagram_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
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
      const { data } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('created_at', { ascending: false });
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
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          >
            {showForm ? 'Cancel' : '+ Add Instagram Post'}
          </button>

          {showForm && (
            <form
              onSubmit={addPost}
              className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs text-gray-400">
                Paste any Instagram post or reel URL. It will be embedded
                directly on the site.
              </p>
              <input
                type="text"
                placeholder="https://www.instagram.com/reel/... or https://www.instagram.com/p/..."
                value={postUrl}
                onChange={e => setPostUrl(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-purple-500/50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                }}
              >
                Add Post
              </button>
            </form>
          )}

          {posts.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-500">
              No Instagram posts yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex min-w-0 items-center space-x-2">
                      <Instagram className="h-4 w-4 flex-shrink-0 text-pink-400" />
                      <a
                        href={post.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-xs text-gray-300 hover:text-white"
                      >
                        {post.post_url}
                      </a>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(post.id)}
                      className="ml-2 flex-shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 p-1.5 hover:bg-red-500/20"
                    >
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
          <div className="mx-4 max-w-sm space-y-4 rounded-2xl border border-white/10 bg-gray-900 p-6">
            <h3 className="text-lg font-bold text-white">Confirm Delete</h3>
            <p className="text-sm text-gray-400">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(deleteConfirm)}
                className="rounded-xl border border-red-500/30 bg-red-500/20 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
