# .NET 8 API starter

The UI in this MVP is a standalone demo. The API project is a small, runnable .NET 8 shell (`/health` works; course lookup deliberately returns `501 Not Implemented`). There is no configured API authentication, database connection, Entra tenant, file store, or AI provider in this repository yet.

```text
backend/
  src/
    FactoryLearning.Api/          # HTTP, auth, OpenAPI, composition root
    FactoryLearning.Application/  # Use cases, DTOs, validation, ports
    FactoryLearning.Domain/       # Entities, value objects, domain rules
    FactoryLearning.Infrastructure/ # EF Core, PostgreSQL, Blob, Search, AI
  tests/
    FactoryLearning.UnitTests/
    FactoryLearning.IntegrationTests/
```

Keep infrastructure behind application interfaces. The API sample, contracts and migration starting point are in `docs/api.md` and `docs/database.sql`. Implementations must not claim Entra, document storage, search or AI capability until credentials, migrations, access policies and integration tests are in place.

## Suggested local startup

1. Install .NET 8 SDK and PostgreSQL 16+.
2. Create the API/Application/Domain/Infrastructure projects using the structure above.
3. Configure `ConnectionStrings:FactoryLearning` and Entra settings through user secrets or environment variables.
4. Apply reviewed EF Core migrations based on `docs/database.sql`.
5. Run the API shell with `dotnet run --project backend/src/FactoryLearning.Api`. It does not expose protected business data.
6. Run the Next.js frontend separately; configure its API base URL only after authentication and API routes are implemented.
