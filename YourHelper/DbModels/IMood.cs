using System.Threading.Tasks;

namespace DbModels
{
    public interface IMood<T>
    {
        public Task<T> GetMood(T obj, string user);
        public Task<int> SetMood(T obj, string user);
    }
}