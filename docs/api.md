# REST API contract (v1)

Base path: `/api/v1`. JSON uses camelCase. All routes except health and Entra's callback require a validated Entra access token with the API audience. The API derives `tenantId`, user ID and roles from the validated identity; clients may not choose another tenant by sending a body field. Admin routes require role-based policies in addition to tenant scope.

The routes below are a design contract, not live integrations. There is no running .NET host or database in this MVP.

## Core endpoints

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Liveness |
| GET | `/me` | Current profile, role and plant |
| GET | `/dashboard` | Counts, learning summary and recent activity |
| GET | `/learning-paths` | Published role-based pathways |
| GET | `/learning-paths/{pathId}` | Ordered levels and courses |
| GET | `/courses?category=&q=&cursor=` | Search/filter published courses |
| GET | `/courses/{courseId}` | Course detail and ordered lessons |
| POST | `/courses/{courseId}/enrollments` | Enroll current user (idempotent) |
| PUT | `/enrollments/{enrollmentId}/lessons/{lessonId}` | Save lesson position/completion |
| GET | `/courses/{courseId}/quizzes/{quizId}` | Quiz without answer keys |
| POST | `/quizzes/{quizId}/attempts` | Submit answers; server scores and records attempt |
| GET | `/me/certificates` | Current user's issued certificates |
| GET | `/documents?category=&tag=&q=&cursor=` | Search approved library documents |
| POST | `/documents` | Request upload; returns short-lived Blob upload URL |
| POST | `/documents/{id}/complete-upload` | Verify upload and start malware/review workflow |
| GET | `/documents/{id}/download` | Authorize then redirect/proxy with short-lived URL |
| PUT | `/me/bookmarks/{documentId}` | Save bookmark |
| DELETE | `/me/bookmarks/{documentId}` | Remove bookmark |
| GET | `/alarms?code=&equipment=&family=&q=` | Search published troubleshooting guides |
| GET | `/alarms/{alarmId}` | Guide with approved checks and actions |
| POST | `/cases` | Create case study draft (instructor/admin) |
| GET | `/cases?area=&q=` | Published case studies |
| POST | `/assistant/queries` | Grounded answer with citations and abstention status |
| GET | `/admin/content?status=&type=` | Admin content queue |
| POST | `/admin/courses` | Create course draft |
| PUT | `/admin/courses/{id}` | Update draft |
| POST | `/admin/courses/{id}/publish` | Publish after policy checks and audit |
| GET | `/admin/users?plant=&role=` | Tenant-scoped user/role administration |
| POST | `/admin/knowledge/reindex/{documentId}` | Enqueue approved document version for reindex |

Use cursor pagination with stable sorting. Return `400` for validation errors, `401` unauthenticated, `403` unauthorized, `404` for inaccessible or missing tenant-scoped resources, `409` for version/state conflicts, and `429` for rate limits. Errors follow `application/problem+json` (RFC 9457) and must not expose internal stack traces.

## Example assistant request/response

```json
POST /api/v1/assistant/queries
{
  "question": "What checks should I make for alarm AL.52 on an MR-J4?",
  "equipmentId": "c51f0c14-8f46-4afe-bfda-97e2b9aac721",
  "conversationId": null
}
```

```json
{
  "answer": "Verify the alarm definition and inspect the load and acceleration settings...",
  "status": "answered",
  "confidence": "medium",
  "citations": [
    { "documentId": "c51f0c14-8f46-4afe-bfda-97e2b9aac721", "title": "MR-J4 Manual", "page": 183, "section": "Alarm AL.52" }
  ],
  "safetyNotice": "Follow site isolation procedures and the approved equipment manual.",
  "requestId": "a16f...",
  "generatedAt": "2026-11-14T04:00:00Z"
}
```

The AI response is illustrative; the MVP does not return this from a live service. Production must abstain if authorized retrieval returns no adequate passages, filter retrieval by tenant/plant before prompting, cite the source version, redact secrets/PII, and log minimal metadata rather than sensitive prompts by default.

## Clean Architecture API example

```csharp
// API: HTTP adapter; production composition must add Entra JWT auth,
// tenant/role policies, validation, exception handling and persistence.
app.MapGet("/api/v1/courses/{slug}", async (
    string slug,
    ClaimsPrincipal principal,
    GetCourse useCase,
    CancellationToken ct) =>
{
    var tenantClaim = principal.FindFirst("tenant_id")?.Value;
    if (!Guid.TryParse(tenantClaim, out var tenantId))
        return Results.Forbid();

    var course = await useCase.ExecuteAsync(tenantId, slug, ct);
    return course is null ? Results.NotFound() : Results.Ok(course);
}).RequireAuthorization();
```

`GetCourse` depends on `ICourseRepository` in Application; the Domain `Course` entity owns publish-state rules. Infrastructure implements the repository with tenant-scoped PostgreSQL queries. Do not ship the example endpoint until authorization, DI registrations, repository, API host and tests are wired.
