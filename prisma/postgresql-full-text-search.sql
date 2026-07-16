-- Phase 3 optional production migration for PostgreSQL.
-- Do not run while prisma/schema.prisma uses the SQLite provider.
CREATE INDEX IF NOT EXISTS postitem_search_idx ON "PostItem"
USING GIN (
  to_tsvector(
    'simple',
    coalesce("title", '') || ' ' || coalesce("titleHindi", '') || ' ' ||
    coalesce("excerpt", '') || ' ' || coalesce("excerptHindi", '') || ' ' ||
    coalesce("content", '') || ' ' || coalesce("contentHindi", '') || ' ' ||
    coalesce("organization", '')
  )
);
