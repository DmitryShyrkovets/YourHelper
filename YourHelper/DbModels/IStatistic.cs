using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface IStatistic<T>
    {
        public Task<T> GetInfo(T obj, string user);
    }
}