-- BrightPath — Row-Level Security policy examples (sanitized)
--
-- Source: real policies from BrightPath's private repo,
--   supabase/migrations/20260117000004_consolidated_policies.sql
--   supabase/migrations/20260117000006_optimized_policies.sql
--
-- Table names in this file are realistic (matching the same conventions used
-- in the live schema) but no business-specific table, column, or role name
-- is included that would expose proprietary data model details beyond what
-- the public showcase ERD already shows.
--
-- The two patterns below — (1) admin-or-tenant unified SELECT, and (2) write
-- restricted to admins — together cover the majority of the 1,026 policies
-- in the live schema. Specific tables vary, but the shape is the same.

-- ──────────────────────────────────────────────────────────────────
-- Pattern 1 — Unified SELECT: platform admins OR tenant members
-- ──────────────────────────────────────────────────────────────────
-- Replaces an older two-policy pattern (separate admin + tenant policies)
-- with a single OR'd policy that PostgreSQL can plan once. The (SELECT auth.uid())
-- subquery wrapping is a Supabase RLS perf pattern: it lets PostgreSQL cache
-- the auth.uid() result for the duration of the query, avoiding per-row calls.

CREATE POLICY "contract_overrides_select" ON "public"."contract_overrides"
  FOR SELECT
  USING (
      ( -- Admin branch
        EXISTS (
          SELECT 1 FROM "public"."user_roles" ur
          WHERE ur.user_id = (SELECT auth.uid())
          AND ur.role IN ('platform_admin', 'super_admin')
        )
      )
      OR
      ( -- Tenant branch
        tenant_id IN (
          SELECT tenant_id FROM "public"."users"
          WHERE id = (SELECT auth.uid())
        )
      )
  );

-- ──────────────────────────────────────────────────────────────────
-- Pattern 2 — Write restricted to org admins of the owning org
-- ──────────────────────────────────────────────────────────────────
-- Two-condition USING clause: (a) the user belongs to the row's organization,
-- AND (b) the user has an admin-level role. Both must be true.

CREATE POLICY "Org admins can manage policy_templates"
  ON "public"."policy_templates"
  FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM "public"."org_users"
      WHERE user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM "public"."user_roles" ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('admin', 'super_admin', 'owner')
    )
  );

-- ──────────────────────────────────────────────────────────────────
-- Notes
-- ──────────────────────────────────────────────────────────────────
-- • Across the live schema, 4,198 column references to `tenant_id` are
--   gated by some variant of the above patterns.
-- • 40 migration files apply tenant-scoped RLS to specific table groups.
-- • `tenant_id` is never sent by the client — it is always derived
--   server-side from the authenticated user's row in `public.users`.
-- • Policies are applied per-action (SELECT / INSERT / UPDATE / DELETE / ALL)
--   so read and write surfaces can have different rules.
