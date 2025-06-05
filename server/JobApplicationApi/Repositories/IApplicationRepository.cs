using JobApplicationApi.Models;

namespace JobApplicationApi.Repositories
{
    public interface IApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAll(int page, int size);
        Task<JobApplication> Get(int id);
        Task Post(JobApplication jobApplication);
        Task Put(int id, JobApplication jobApplication);
        Task<int> Count();
        bool Exists(int id);
    }
}
