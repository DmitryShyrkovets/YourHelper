using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithWellBeing : IWellBeing<WellBeing>
    {
        private readonly ApplicationContext _context;

        public WorkingWithWellBeing(ApplicationContext context)
        {
            _context = context;
        }


        public async Task<WellBeing> GetWellBeing(WellBeing obj, string login)
        {
            WellBeing result = await _context.WellBeings.AsNoTracking().FirstOrDefaultAsync(e => e.User.Email == login && e.Date.Date == obj.Date.Date);

            if (result == null)
            {
                return new WellBeing { Status = ""};
            }
            
            return result;
        }

        public async Task<int> SetWellBeing(WellBeing obj, string login)
        {
            try
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login);

                if (user != null)
                {
                    WellBeing wellBeing = await _context.WellBeings.FirstOrDefaultAsync(e => e.User == user && e.Date.Date == obj.Date.Date);

                    if (wellBeing != null)
                    {
                        wellBeing.Status = obj.Status;
                    }
                    else
                    {
                        obj.User = user;
                        _context.WellBeings.Add(obj);
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