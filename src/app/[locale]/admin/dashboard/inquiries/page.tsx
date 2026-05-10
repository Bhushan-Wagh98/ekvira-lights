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
    supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setInquiries(data);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await (supabase.from('inquiries') as any).update({ status }).eq('id', id);
    setInquiries(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
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
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-500">
              No inquiries yet.
            </div>
          ) : (
            inquiries.map(inq => (
              <div
                key={inq.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-white">{inq.name}</h3>
                    <p className="text-sm text-gray-400">{inq.phone}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {(() => {
                        const lines = inq.message
                          ? inq.message
                              .split('\n')
                              .filter((l: string) => l.trim())
                          : [];
                        const dateLine = lines.find(
                          (l: string) =>
                            l.includes('Event Date') || l.includes('📅')
                        );
                        const detailsLine = lines.find(
                          (l: string) =>
                            l.includes('Event Details') || l.includes('📝')
                        );
                        const lightsLine = lines.find(
                          (l: string) =>
                            (l.includes('Lights') || l.includes('🎯')) &&
                            !l.includes('Event')
                        );
                        const otherLines = lines.filter(
                          (l: string) =>
                            l !== dateLine &&
                            l !== detailsLine &&
                            l !== lightsLine
                        );
                        const ordered = [
                          dateLine,
                          detailsLine,
                          lightsLine,
                          ...otherLines,
                        ].filter(Boolean);
                        return ordered.map((line: string, i: number) => {
                          const hasLabel =
                            line.startsWith('🎯') ||
                            line.startsWith('📅') ||
                            line.startsWith('📝') ||
                            line.startsWith('Lights:') ||
                            line.startsWith('Event Date:') ||
                            line.startsWith('Event Details:');
                          return (
                            <span key={i}>
                              {hasLabel ? (
                                <>
                                  <span className="font-semibold text-purple-400">
                                    {line.split(':')[0]}:
                                  </span>
                                  {line.split(':').slice(1).join(':')}
                                </>
                              ) : (
                                <>
                                  <span className="font-semibold text-purple-400">
                                    Event Details:
                                  </span>{' '}
                                  {line}
                                </>
                              )}
                              {i < ordered.length - 1 && (
                                <span className="text-gray-600">
                                  {' '}
                                  &nbsp;•&nbsp;{' '}
                                </span>
                              )}
                            </span>
                          );
                        });
                      })()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(inq.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={inq.status}
                      onChange={e => updateStatus(inq.id, e.target.value)}
                      className={`cursor-pointer rounded-full border px-2.5 py-1.5 text-xs font-semibold focus:outline-none ${
                        inq.status === 'new'
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                          : inq.status === 'in_progress'
                            ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                            : inq.status === 'completed'
                              ? 'border-green-500/30 bg-green-500/10 text-green-400'
                              : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
                      }`}
                    >
                      <option value="new" className="bg-gray-900">
                        New
                      </option>
                      <option value="in_progress" className="bg-gray-900">
                        In Progress
                      </option>
                      <option value="completed" className="bg-gray-900">
                        Completed
                      </option>
                      <option value="closed" className="bg-gray-900">
                        Closed
                      </option>
                    </select>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=नमस्कार ${inq.name}, तुमची चौकशी मिळाली. एकवीरा लाइट्स कडून.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-green-500/30 bg-green-500/10 p-2 transition-all hover:bg-green-500/20"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-green-400" />
                    </a>
                    <button
                      onClick={() => setDeleteConfirm(inq.id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 transition-all hover:bg-red-500/20"
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
                onClick={() => deleteInquiry(deleteConfirm)}
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
