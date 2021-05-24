using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithSkill : ISkill<Skill>
    {
        private readonly ApplicationContext _context;

        public WorkingWithSkill(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddProcessSkill(Skill obj, string user)
        {
            User user1 = _context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    _context.Skills.Add(new Skill
                    {
                        Description = obj.Description,
                        Category = obj.Category,
                        Title = obj.Title,
                        User = user1,
                        Status = "Process"
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

        public async Task<int> AddSkill(Skill obj)
        {
            DateTime dateTime = DateTime.Now;

            Skill skill = _context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (skill != null)
            {
                try
                {
                    skill.Date = dateTime;
                    skill.Status = "Completed";

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

        public async Task<int> EditSkill(Skill obj)
        {
            Skill note = _context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    note.Description = obj.Description;
                    note.Category = obj.Category;
                    note.Title = obj.Title;

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

        public async Task<int> RemoveSkill(Skill obj)
        {
            Skill skill = _context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (skill != null)
            {
                try
                {
                    _context.Skills.Remove(skill);

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

        public async Task<List<Skill>> GetSkills(Skill obj, string user)
        {
            List<Skill> result;

            if (obj.Category == "Все")
            {
                result = await _context.Skills.AsNoTracking()
                    .Where(e => e.User.Email == user && e.Date.Date == obj.Date.Date && e.Status == "Completed")
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToListAsync();   

            }
            else
            {
                result = await _context.Skills.AsNoTracking()
                    .Where(e => e.User.Email == user && e.Status == "Completed" && e.Category == obj.Category && e.Date.Date == obj.Date.Date)
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToListAsync();   
                
            }

            return result;
        }

        public async Task<List<Skill>> GetProcessSkills(Skill obj, string user)
        {
            List<Skill> result;

            if (obj.Category == "Все")
            {
                result = await _context.Skills.AsNoTracking()
                    .Where(e => e.User.Email == user && e.Status == "Process")
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToListAsync();   

            }
            else
            {
                result = await _context.Skills.AsNoTracking()
                    .Where(e => e.User.Email == user && e.Status == "Process" && e.Category == obj.Category)
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToListAsync();   
                
            }

            return result;
        }

        public async Task<List<Skill>> GetCategories(string user)
        {
            List<Skill> result = await _context.Skills.AsNoTracking().
                Where(e => e.User.Email == user).Select(e => new Skill { Id = e.Id, Category = e.Category }).ToListAsync();

            return result;
        }

        public async Task<List<Skill>> GetDates(string user)
        {
            var result = await _context.Skills.AsNoTracking().
                Where(e => e.User.Email == user).Select(e => new Skill() { Date = e.Date.Date }).ToListAsync();

            return result;
        }
    }
}