namespace FactoryLearning.Domain.Learning;

public sealed class Course
{
    private Course() { }

    public Course(Guid id, Guid tenantId, string slug, string title, string summary)
    {
        if (string.IsNullOrWhiteSpace(slug)) throw new ArgumentException("A course slug is required.", nameof(slug));
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("A course title is required.", nameof(title));
        Id = id;
        TenantId = tenantId;
        Slug = slug.Trim();
        Title = title.Trim();
        Summary = summary.Trim();
        Status = CourseStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; private set; }
    public Guid TenantId { get; private set; }
    public string Slug { get; private set; } = "";
    public string Title { get; private set; } = "";
    public string Summary { get; private set; } = "";
    public CourseStatus Status { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    public void Publish()
    {
        if (Status != CourseStatus.Draft)
            throw new InvalidOperationException("Only a draft course can be published.");
        Status = CourseStatus.Published;
    }
}

public enum CourseStatus { Draft, Published, Archived }
