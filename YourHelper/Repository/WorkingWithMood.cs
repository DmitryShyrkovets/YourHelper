using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithMood : IMood<Mood>
    {
        private readonly ApplicationContext _context;

        public WorkingWithMood(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Mood> GetMood(Mood obj, string login)
        {
            Mood result = await _context.Moods.AsNoTracking().FirstOrDefaultAsync(e => e.User.Email == login && e.Date.Date == obj.Date.Date);

            if (result == null)
            {
                return new Mood { Status = ""};
            }
            
            return result;
        }

        public async Task<int> SetMood(Mood obj, string login)
        {
            try
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login);

                if (user != null)
                {
                    Mood mood = await _context.Moods.FirstOrDefaultAsync(e => e.User == user && e.Date.Date == obj.Date.Date);

                    if (mood != null)
                    {
                        mood.Status = obj.Status;
                    }
                    else
                    {
                        obj.User = user;
                        _context.Moods.Add(obj);
                    }

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
    }
}