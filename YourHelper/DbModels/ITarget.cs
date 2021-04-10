using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface ITarget<T>
    {
        public Task<List<T>> GetTargets(string user, T obj);
        public Task<int> AddTarget(T obj, string user);
        public Task<int> EditTarget(T obj);
        public Task<int> RemoveTarget(T obj);
    }
}