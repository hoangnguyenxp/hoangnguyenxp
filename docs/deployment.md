# Azure production deployment plan

This is a deployment plan, not an active Azure setup. No cloud resources, identity tenant, secrets, or integrations are provisioned by this repository.

## Target environment

- **Web:** Azure Static Web Apps (if the selected Next.js rendering mode is supported by the target plan) or Azure App Service/container hosting for the Next.js Node server.
- **API and ingestion worker:** Azure Container Apps or App Service, deployed as separately scaled workloads from the same solution.
- **Database:** Azure Database for PostgreSQL Flexible Server with private networking, zone redundancy where available, automated backups and point-in-time restore.
- **Files:** Azure Blob Storage private containers with malware scanning, immutable versioned originals, short-lived user-scoped upload/download SAS tokens.
- **Retrieval and generation:** Azure AI Search with tenant/plant filterable metadata; Azure OpenAI deployed in an approved region with content safety and quotas.
- **Identity:** Microsoft Entra ID app registrations for SPA/web and protected API; OAuth 2.0 authorization-code flow with PKCE; app roles for learner, instructor, content admin and tenant admin.
- **Operations:** Key Vault, managed identities, Application Insights, Azure Monitor alerts, private endpoints, WAF/front door as required by organizational policy.

## Release sequence

1. **Foundation:** select region/data residency, threat model, tenant model, DNS, private network, Key Vault, dev/test/prod subscriptions and least-privilege managed identities.
2. **Identity/API:** register web and API applications, configure issuer/audience/scopes and app roles, enforce authorization and tenant scope in API integration tests.
3. **Data:** provision PostgreSQL, apply reviewed migrations from `database.sql`, configure TLS/private access, backups, restore drills, connection pooling and migration ownership.
4. **Documents:** provision private Blob containers; implement signed uploads, MIME/size allowlists, malware scanning, approval/versioning and deletion/retention workflows.
5. **RAG:** parse approved documents in an isolated worker, preserve page/section and version metadata, chunk and index with tenant/plant filters, then evaluate citation correctness, abstention, prompt injection, access isolation and safety wording before enabling users.
6. **Delivery:** build immutable web/API/worker images in CI, scan dependencies/images, deploy to staging, run migrations as a controlled release step, smoke test, then promote using slots/revisions and rollback.
7. **Operations:** establish SLOs, dashboards, alerting, audit retention, incident procedures, capacity limits, model cost limits and periodic access/restore/security reviews.

## Required production gates

- Entra login and role authorization verified for each role; deny-by-default and cross-tenant negative tests pass.
- No production secrets in code, browser bundles, logs or CI artifacts; Azure services use managed identity where supported.
- DB backup restore, migration rollback/forward strategy and data retention/deletion are tested.
- Upload scanning and document approval occur before indexing; search results and citations are tenant/plant filtered.
- RAG safety and groundedness evaluation passes domain-owner review; model output never bypasses LOTO, safety interlocks or approved SOPs.
- Accessibility, responsive layout, load/performance, dependency/image scanning, observability and disaster recovery are approved before general release.

## MVP versus production

The Next.js app currently uses fixed demo datasets. It has no authentication flow, live API calls, PostgreSQL, file upload/download, document preview, Azure AI Search or Azure OpenAI integration. Buttons that imply unsupported operations show a demo notice. Replace demo adapters only after their service and security gates are ready.
