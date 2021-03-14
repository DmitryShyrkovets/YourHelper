using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface IDiary<T>
    {
        public Task<int> AddEntry(T diary, string user);
        public Task<int> EditEntry(T obj);
        public Task<int> RemoveEntry(T obj);
        public Task<List<T>> GetDates(string user);
        public Task<List<T>> GetEntries(T obj, string user);
    }
}