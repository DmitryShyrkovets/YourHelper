using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithDiary : IDiary<Diary>
    {
        private readonly ApplicationContext _context;

        public WorkingWithDiary(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddEntry(Diary diary, string user)
        {
            try
            {
                User obj = await _context.Users.FirstOrDefaultAsync(u => u.Email == user);

                if (obj != null)
                {
                    diary.User = obj;
                    
                    _context.Diaries.Add(diary);

                    await _context.SaveChangesAsync();

                    return 1;
                }

                return -1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        
        public async Task<int> EditEntry(Diary obj)
        {
            try
            {
                Diary entry = await _context.Diaries.FirstOrDefaultAsync(u => u.Id == obj.Id);

                if (entry != null)
                {
                    entry.Text = obj.Text;

                    await _context.SaveChangesAsync();

                    return 1;
                }
                
                return -1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        
        public async Task<int> RemoveEntry(Diary obj)
        {
            try
            {
                Diary entry = await _context.Diaries.FirstOrDefaultAsync(u => u.Id == obj.Id);

                if (entry != null)
                {
                    _context.Remove(entry);

                    await _context.SaveChangesAsync();

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
            var result = await _context.Diaries.AsNoTracking().
                Where(e => e.User.Email == user).Select(e => new Diary { DateTime = e.DateTime.Date }).ToListAsync();

            return result;
        }
        
        public async Task<List<Diary>> GetEntries(Diary obj, string user)
        {
            var result = await _context.Diaries.AsNoTracking()
                .Where(e => (e.DateTime.Date == obj.DateTime.Date && e.User.Email == user))
                .Select(e => new Diary { Text = e.Text, DateTime = e.DateTime, Id = e.Id }).ToListAsync();

            return result;
        }
        
    }
}