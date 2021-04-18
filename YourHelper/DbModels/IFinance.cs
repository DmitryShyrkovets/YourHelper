using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface IFinance<T>
    {
        public Task<int> AddFinance(T obj, string user);
        public Task<int> EditFinance(T obj);
        public Task<int> RemoveFinance(T obj);
        public Task<List<T>> GetFinances(T obj, string user,  bool dateFilter, DateTime dateStart, DateTime dateEnd);
        public Task<List<T>> GetItogs(T obj, string user,  bool dateFilter, DateTime dateStart, DateTime dateEnd);
        public Task<List<T>> GetCategories(string user);
    }
}