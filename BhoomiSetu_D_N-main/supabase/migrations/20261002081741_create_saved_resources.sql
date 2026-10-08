/*
# Create saved_resources table

1. New Tables
- `saved_resources`: Stores research papers and datasets that users bookmark for later reference.
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to authenticated user, references auth.users)
  - `resource_id` (text, not null) — the demo data ID of the research/dataset
  - `resource_type` (text, not null) — either 'research' or 'dataset'
  - `title` (text, not null) — denormalized title for quick display
  - `created_at` (timestamptz, default now())
  - Unique constraint on (user_id, resource_id, resource_type) to prevent duplicate saves.

2. Security
- Enable RLS on `saved_resources`.
- Owner-scoped CRUD: each authenticated user can only access rows they own.
- SELECT, INSERT, UPDATE, DELETE policies scoped to auth.uid() = user_id.
*/

CREATE TABLE IF NOT EXISTS saved_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id text NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN ('research', 'dataset')),
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, resource_id, resource_type)
);

ALTER TABLE saved_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_saved" ON saved_resources;
CREATE POLICY "select_own_saved"
ON saved_resources FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved" ON saved_resources;
CREATE POLICY "insert_own_saved"
ON saved_resources FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_saved" ON saved_resources;
CREATE POLICY "update_own_saved"
ON saved_resources FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved" ON saved_resources;
CREATE POLICY "delete_own_saved"
ON saved_resources FOR DELETE
TO authenticated USING (auth.uid() = user_id);
