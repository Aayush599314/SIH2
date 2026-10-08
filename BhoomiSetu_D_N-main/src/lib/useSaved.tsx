import { useState, useCallback } from 'react';
import { supabase } from './supabase';
import { useAuth } from './auth';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export function useSavedResources() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchSaved = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('saved_resources')
      .select('id, resource_id, resource_type, title, created_at');
    if (data) {
      setSavedIds(new Set(data.map((r) => `${r.resource_type}:${r.resource_id}`)));
    }
  }, [user]);

  const toggleSave = useCallback(
    async (resourceId: string, resourceType: 'research' | 'dataset', title: string) => {
      if (!user) return { saved: false };
      const key = `${resourceType}:${resourceId}`;
      setLoading(true);

      if (savedIds.has(key)) {
        await supabase
          .from('saved_resources')
          .delete()
          .match({ resource_id: resourceId, resource_type: resourceType, user_id: user.id });
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        setLoading(false);
        return { saved: false };
      } else {
        await supabase.from('saved_resources').insert({
          resource_id: resourceId,
          resource_type: resourceType,
          title,
          user_id: user.id,
        });
        setSavedIds((prev) => new Set(prev).add(key));
        setLoading(false);
        return { saved: true };
      }
    },
    [user, savedIds, setLoading],
  );

  const isSaved = useCallback(
    (resourceId: string, resourceType: 'research' | 'dataset') =>
      savedIds.has(`${resourceType}:${resourceId}`),
    [savedIds],
  );

  return { savedIds, fetchSaved, toggleSave, isSaved, loading };
}

export function SaveButton({
  resourceId,
  resourceType,
  title,
}: {
  resourceId: string;
  resourceType: 'research' | 'dataset';
  title: string;
}) {
  const { user, toggleSave, isSaved } = useSavedResourcesWithInit();
  if (!user) return null;
  const saved = isSaved(resourceId, resourceType);

  return (
    <button
      onClick={() => toggleSave(resourceId, resourceType, title)}
      className={`btn-secondary ${saved ? 'text-forest-700' : ''}`}
    >
      {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}

function useSavedResourcesWithInit() {
  const result = useSavedResources();
  const { fetchSaved } = result;
  const { user } = useAuth();
  const [initialized, setInitialized] = useState(false);

  if (user && !initialized) {
    fetchSaved();
    setInitialized(true);
  }

  return { ...result, user };
}
