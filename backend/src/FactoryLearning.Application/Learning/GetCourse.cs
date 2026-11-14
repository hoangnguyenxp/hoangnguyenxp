namespace FactoryLearning.Application.Learning;

public sealed record CourseDetail(Guid Id, string Slug, string Title, string Summary);

public sealed class GetCourse(ICourseRepository courses)
{
    public async Task<CourseDetail?> ExecuteAsync(Guid tenantId, string slug, CancellationToken cancellationToken)
    {
        var course = await courses.FindPublishedAsync(tenantId, slug, cancellationToken);
        return course is null ? null : new CourseDetail(course.Id, course.Slug, course.Title, course.Summary);
    }
}
