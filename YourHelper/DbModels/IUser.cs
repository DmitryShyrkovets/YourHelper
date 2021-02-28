using System.Threading.Tasks;

namespace DbModels
{
    public interface IUser<T>
    {
        public Task<int> AddUser(T user);
        public Task<bool> CheckUser(T user, string param);
        public Task<T> GetData(T user);
    }
}
