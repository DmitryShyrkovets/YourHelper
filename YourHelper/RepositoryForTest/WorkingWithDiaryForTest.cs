using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithDiaryForTest : IDiary<Diary>
    {
        AplicationContextForTest context;

        public WorkingWithDiaryForTest()
        {
            context = new AplicationContextForTest();
        }
        
        public async Task<int> AddEntry(Diary diary, string user)
        {
            try
            {
                User obj = context.Users.FirstOrDefault(u => u.Email == user);

                if (obj != null)
                {
                    diary.User = obj;
                    
                    context.Diaries.Add(diary);

                    return 1;
                }

                return -1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<List<Diary>> GetDates(string user)
        {
            var result = context.Diaries.
                Where(e => e.User.Email == user).Select(e => new Diary { DateTime = e.DateTime.Date }).ToList();

            return result;
        }
        
        public async Task<List<Diary>> GetEntries(Diary obj, string user)
        {
            var result = context.Diaries
                .Where(e => (e.DateTime.Date == obj.DateTime.Date && e.User.Email == user))
                .Select(e => new Diary { Text = e.Text, DateTime = e.DateTime, Id = e.Id }).ToList();

            return result;
        }
        
        public async Task<int> RemoveEntry(Diary obj)
        {
            try
            {
                Diary entry = context.Diaries.FirstOrDefault(u => u.Id == obj.Id);

                if (entry != null)
                {
                    context.Diaries.Remove(entry);

                    return 1;
                }
                
                return -1;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public async Task<int> EditEntry(Diary obj)
        {
            try
            {
                Diary entry = context.Diaries.FirstOrDefault(u => u.Id == obj.Id);

                if (entry != null)
                {
                    entry.Text = obj.Text;

                    return 1;
                }
                
                return -1;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}