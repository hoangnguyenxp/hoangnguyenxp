using FactoryLearning.Domain.Learning;

namespace FactoryLearning.Application.Learning;

public interface ICourseRepository
{
    Task<Course?> FindPublishedAsync(Guid tenantId, string slug, CancellationToken cancellationToken);
}
