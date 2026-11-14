# ForgeLearn architecture

## System architecture

```mermaid
flowchart LR
  Staff[Factory learners and admins] --> Web[Next.js 15 web app]
  Web --> Login[Microsoft Entra ID]
  Web --> API[.NET 8 REST API]
  API --> Auth[JWT validation and role policies]
  API --> PG[(Azure Database for PostgreSQL)]
  API --> Blob[Azure Blob Storage]
  API --> Search[Azure AI Search]
  API --> AOAI[Azure OpenAI]
  Blob --> Ingest[Document ingestion worker]
  Ingest --> Search
  Search --> AOAI
  API --> Telemetry[Application Insights]
  Ingest --> Telemetry
```

**Trust boundary:** Entra authenticates the user. The API authorizes tenant, plant, role and resource access on every request. Browser code must never hold database, Blob, Search or OpenAI credentials. Uploaded documents pass malware scanning and approval before indexing. RAG retrieval filters to the caller's authorized tenant/plant before any passages reach the model.

## Entity relationship diagram

```mermaid
erDiagram
  TENANT ||--o{ USER_PROFILE : contains
  TENANT ||--o{ LEARNING_PATH : owns
  LEARNING_PATH ||--|{ PATH_LEVEL : sequences
  PATH_LEVEL ||--o{ COURSE : groups
  COURSE ||--|{ LESSON : contains
  USER_PROFILE ||--o{ ENROLLMENT : tracks
  COURSE ||--o{ ENROLLMENT : has
  ENROLLMENT ||--o{ LESSON_PROGRESS : records
  LESSON ||--o{ LESSON_PROGRESS : tracks
  COURSE ||--o{ QUIZ : assesses
  QUIZ ||--o{ QUIZ_QUESTION : includes
  USER_PROFILE ||--o{ QUIZ_ATTEMPT : takes
  TENANT ||--o{ EQUIPMENT : operates
  EQUIPMENT ||--o{ ALARM_GUIDE : documents
  TENANT ||--o{ TECH_DOCUMENT : curates
  TECH_DOCUMENT ||--o{ DOCUMENT_TAG : tagged
  TECH_DOCUMENT ||--o{ KNOWLEDGE_CHUNK : indexes
  TENANT ||--o{ CASE_STUDY : shares
  USER_PROFILE ||--o{ DOCUMENT_BOOKMARK : saves
```

## Web experience

```text
app/
  page.tsx                 dashboard
  landing/page.tsx         academy landing
  roadmap/page.tsx         five-level learning journey
  lesson/page.tsx          PLC lesson with safety, wiring reference and knowledge check
  quiz/page.tsx             locally scored quiz prototype
  library/page.tsx         searchable technical resource cards
  troubleshooting/page.tsx alarm search, filters and guide detail
  assistant/page.tsx      clearly labeled RAG assistant prototype
  admin/page.tsx          content and academy management prototype
components/                navigation, shared UI and feedback primitives
lib/data.ts                fixed demo datasets, not production persistence
backend/                   .NET Clean Architecture sample boundaries
docs/                      ERD, SQL, API, wireframes and deployment plan
```

The frontend uses Next.js App Router, TypeScript, TailwindCSS and custom accessible component primitives with a Shadcn-inspired visual language. The data in `lib/data.ts` is static and illustrative. Search, category/file-type filters, sorting, bookmarks, tabs, theme toggle and quiz scoring work locally; state resets on refresh. Authentication, API persistence, upload/download, PDF preview, quiz progress and certificates are not implemented.

## Operational architecture decisions

- Start as a modular monolith API with separate ingestion worker; split services only when scale or ownership requires it.
- Use PostgreSQL as the source of truth; Blob Storage holds original files; Azure AI Search holds derived chunks and filters.
- Carry `tenant_id` on tenant-scoped data and include it in unique keys, queries, audit events and search filters.
- Keep tenant isolation in API authorization and optionally enforce PostgreSQL row-level security as defense in depth.
- Store Entra object IDs, not passwords. Use managed identities for service-to-service Azure access.
- Use versioned, idempotent ingestion keyed by document/version; retain source page/section metadata for citations.
- Return AI answers with citations and a no-answer state. Never treat model text as approved safety instructions.
