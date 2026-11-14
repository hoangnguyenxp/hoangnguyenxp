# ForgeLearn · Factory Academy

A demo-first learning and knowledge platform for electronics manufacturing teams. The frontend is a responsive Next.js 15 + TypeScript + TailwindCSS application with a custom Fluent/Shadcn-inspired UI. Sample data is local and deliberately marked as demo content; there is no configured API, database, Entra ID, Azure storage, or AI integration.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To check types and make a production build:

```bash
npm run typecheck
npm run build
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Learner dashboard, progress, courses, streak, recent lessons and cases |
| `/landing` | Factory Academy landing page |
| `/roadmap` | Five-level role-based learning pathway and certificate preview |
| `/lesson` | Sample PLC lesson with principle, wiring reference, safe practice and knowledge-check entry |
| `/quiz` | Interactive local quiz with score and retry flow |
| `/library` | Searchable/filterable sample technical resource catalog and local bookmarks |
| `/troubleshooting` | Filtered alarm records, safety-first checks and corrective guidance |
| `/assistant` | AI assistant conversation prototype with explicit no-live-RAG notice |
| `/admin` | Academy content, learner and knowledge-base administration prototype |

## Supporting design

- [Architecture and ERD](docs/architecture.md)
- [PostgreSQL schema starting point](docs/database.sql)
- [API contracts and Clean Architecture sample](docs/api.md)
- [Wireframes](docs/wireframes.md)
- [Azure deployment plan](docs/deployment.md)
- [.NET 8 starter notes](backend/README.md)

The .NET code under `backend/src` demonstrates domain and application boundaries only; it is not a runnable API. Follow the production plan and security gates before connecting real identities, documents or AI.
