using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface ISkill<T>
    {
        public Task<int> AddProcessSkill(T obj, string user);
        public Task<int> AddSkill(T obj);
        public Task<int> EditSkill(T obj);
        public Task<int> RemoveSkill(T obj);
        public Task<List<T>> GetSkills(T obj, string user);
        public Task<List<T>> GetProcessSkills(T obj, string user);
        public Task<List<T>> GetCategories(string user);
        public Task<List<T>> GetDates(string user);
    }
}