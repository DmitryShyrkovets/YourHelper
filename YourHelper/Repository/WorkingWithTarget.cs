using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Repository
{
    public class WorkingWithTarget : ITarget<Target>
    {
        private readonly ApplicationContext _context;

        public WorkingWithTarget(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddTarget(Target obj, string user)
        {
            User user1 = _context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    _context.Targets.Add(new Target
                    {
                        Text = obj.Text,
                        Status = obj.Status,
                        TimeStart = obj.TimeStart,
                        TimeEnd = obj.TimeEnd,
                        User = user1
                    });

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return -1;
        }

        public async Task<int> EditTarget(Target obj)
        {
            Target target = _context.Targets.FirstOrDefault(e => e.Id == obj.Id);

            if (target != null)
            {
                try
                {
                    target.Text = obj.Text;
                    target.Status = obj.Status;
                    target.TimeStart = obj.TimeStart;
                    target.TimeEnd = obj.TimeEnd;

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async Task<int> RemoveTarget(Target obj)
        {
            Target target = _context.Targets.FirstOrDefault(e => e.Id == obj.Id);

            if (target != null)
            {
                try
                {
                    _context.Targets.Remove(target);

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }
        
        public async Task<List<Target>> GetTargets(string user, Target obj)
        {
            List<Target> result;

            switch (obj.Status)
            {
                case "Все":
                result = await _context.Targets.AsNoTracking().OrderBy(e => e.TimeStart)
                    .Where(e => e.User.Email == user)
                    .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToListAsync();
                break;
                case "Выполненные":
                    result = await _context.Targets.AsNoTracking().OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "Выполнена")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToListAsync();
                    break;
                case "В процессе":
                    result = await _context.Targets.AsNoTracking().OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "В процессе")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToListAsync();
                    break;
                case "Проваленные":
                    result = await _context.Targets.AsNoTracking().OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "Провалена")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToListAsync();
                    break;
                default:
                    result = null;
                    break;
            }
            
            return result;
        }

    }
}