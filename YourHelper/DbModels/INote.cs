using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbModels
{
    public interface INote<T>
    {
        public Task<int> AddNote(T obj, string user);
        public Task<int> EditNote(T obj);
        public Task<int> RemoveNote(T obj);
        public Task<List<T>> GetNotes(T obj, string user);
        public Task<List<T>> GetCategories(string user);
    }
}