using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface ISchedule<T>
    {
        public Task<List<T>> GetSchedules(string user);
        public Task<List<T>> GetSchedulesInfo(string user);
        public Task<int> AddSchedule(T obj, string user);
        public Task<int> EditSchedule(T obj);
        public Task<int> RemoveSchedule(T obj);
    }
}