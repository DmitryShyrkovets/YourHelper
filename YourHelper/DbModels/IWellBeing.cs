using System.Threading.Tasks;

namespace DbModels
{
    public interface IWellBeing<T>
    {
        public Task<T> GetWellBeing(T obj, string user);
        public Task<int> SetWellBeing(T obj, string user);
    }
}