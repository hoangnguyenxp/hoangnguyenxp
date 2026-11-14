var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok", mode = "scaffold" }));
app.MapGet("/api/v1/courses/{slug}", (string slug) =>
    Results.Problem(
        title: "Course API is not configured",
        detail: $"Course lookup for '{slug}' requires Entra authorization and a configured repository.",
        statusCode: StatusCodes.Status501NotImplemented));

app.Run();
