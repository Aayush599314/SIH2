import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Bookmark,
  FileText,
  Database as DbIcon,
  Bell,
  Clock,
  LayoutDashboard,
  BookOpen,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { SavedResource } from '@/lib/types';
import { researchData, datasetsData } from '@/lib/data';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('saved_resources')
        .select('id, resource_id, resource_type, title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setSavedResources(data || []);
      setFetchLoading(false);
    })();
  }, [user]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><p className="text-navy-400">Loading...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const savedResearch = savedResources.filter((r) => r.resource_type === 'research');
  const savedDatasets = savedResources.filter((r) => r.resource_type === 'dataset');

  const notifications = [
    { id: 1, message: 'New research paper added: Climate Resilience and Land Governance', time: '2 days ago', icon: FileText },
    { id: 2, message: 'Dataset updated: District-Level Land Use Statistics (2024)', time: '5 days ago', icon: DbIcon },
    { id: 3, message: 'New policy innovation published: Agricultural Land Protection Zones', time: '1 week ago', icon: BookOpen },
  ];

  const handleRemove = async (resourceId: string, resourceType: string) => {
    await supabase
      .from('saved_resources')
      .delete()
      .match({ resource_id: resourceId, resource_type: resourceType, user_id: user.id });
    setSavedResources((prev) => prev.filter((r) => r.resource_id !== resourceId || r.resource_type !== resourceType));
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-forest-800 text-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-saffron-300 text-sm mb-2">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-cream-200">{user.email}</p>
          <span className="badge bg-forest-600/40 text-cream-200 ring-1 ring-forest-500/30 mt-3 capitalize">{user.role}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-forest-50">
              <FileText className="w-5 h-5 text-forest-700" />
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">{savedResearch.length}</p>
            <p className="text-xs text-navy-400">Saved Research</p>
          </div>
          <div className="card text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-saffron-50">
              <DbIcon className="w-5 h-5 text-saffron-700" />
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">{savedDatasets.length}</p>
            <p className="text-xs text-navy-400">Saved Datasets</p>
          </div>
          <div className="card text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
              <Bell className="w-5 h-5 text-navy-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">{notifications.length}</p>
            <p className="text-xs text-navy-400">Notifications</p>
          </div>
          <div className="card text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-forest-50">
              <Clock className="w-5 h-5 text-forest-700" />
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">{savedResources.length}</p>
            <p className="text-xs text-navy-400">Total Saved</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Saved resources */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved research */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-forest-600" /> Saved Research
              </h3>
              {fetchLoading ? (
                <p className="text-sm text-navy-400">Loading...</p>
              ) : savedResearch.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-10 h-10 text-forest-200 mx-auto mb-2" />
                  <p className="text-sm text-navy-400">No saved research yet</p>
                  <Link to="/research" className="text-xs text-forest-700 hover:underline mt-1 inline-block">Browse research</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedResearch.map((r) => {
                    const research = researchData.find((x) => x.id === r.resource_id);
                    return (
                      <div key={r.id} className="flex items-center justify-between rounded-lg border border-forest-900/10 p-3">
                        <Link to={`/research/${r.resource_id}`} className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{r.title}</p>
                          <p className="text-xs text-navy-400 mt-0.5">
                            {research ? `${research.authors[0]} · ${research.year}` : 'Research paper'}
                          </p>
                        </Link>
                        <button
                          onClick={() => handleRemove(r.resource_id, r.resource_type)}
                          className="text-navy-300 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Saved datasets */}
            <div className="card">
              <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-saffron-600" /> Saved Datasets
              </h3>
              {fetchLoading ? (
                <p className="text-sm text-navy-400">Loading...</p>
              ) : savedDatasets.length === 0 ? (
                <div className="text-center py-8">
                  <DbIcon className="w-10 h-10 text-saffron-200 mx-auto mb-2" />
                  <p className="text-sm text-navy-400">No saved datasets yet</p>
                  <Link to="/data" className="text-xs text-forest-700 hover:underline mt-1 inline-block">Browse datasets</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedDatasets.map((d) => {
                    const dataset = datasetsData.find((x) => x.id === d.resource_id);
                    return (
                      <div key={d.id} className="flex items-center justify-between rounded-lg border border-forest-900/10 p-3">
                        <Link to={`/data/${d.resource_id}`} className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{d.title}</p>
                          <p className="text-xs text-navy-400 mt-0.5">
                            {dataset ? `${dataset.source} · ${dataset.year}` : 'Dataset'}
                          </p>
                        </Link>
                        <button
                          onClick={() => handleRemove(d.resource_id, d.resource_type)}
                          className="text-navy-300 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Research (researcher role) */}
            {user.role === 'researcher' && (
              <div className="card">
                <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-forest-600" /> My Research
                </h3>
                <div className="text-center py-8">
                  <FileText className="w-10 h-10 text-forest-200 mx-auto mb-2" />
                  <p className="text-sm text-navy-400">You haven't submitted any research yet</p>
                  <p className="text-xs text-navy-400 mt-1">Research submission is a demo feature in this prototype</p>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="card h-fit sticky top-24">
            <h3 className="text-sm font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-navy-600" /> Recent Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id} className="flex items-start gap-3 rounded-lg p-3 bg-cream-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50">
                      <Icon className="w-4 h-4 text-forest-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-navy-700 leading-snug">{n.message}</p>
                      <p className="text-[10px] text-navy-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
