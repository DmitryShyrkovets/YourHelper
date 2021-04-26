using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithSkillForTest : ISkill<Skill>
    {
        AplicationContextForTest context;

        public WorkingWithSkillForTest()
        {
            context = new AplicationContextForTest();
        }
        
        public async Task<int> AddSkill(Skill obj, string user)
        {
            DateTime dateTime = DateTime.Now;

            User user1 = context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    context.Skills.Add(new Skill
                    {
                        Description = obj.Description,
                        Date = dateTime,
                        User = user1,
                        Title = obj.Title,
                        Category = obj.Category
                    });

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
            Skill note = context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    note.Description = obj.Description;
                    note.Category = obj.Category;
                    note.Title = obj.Title;

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
            Skill skill = context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (skill != null)
            {
                try
                {
                    context.Skills.Remove(skill);

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
                result = context.Skills
                    .Where(e => e.User.Email == user && e.Date.Date == obj.Date.Date)
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToList();   

            }
            else
            {
                result = context.Skills
                    .Where(e => e.User.Email == user && e.Category == obj.Category && e.Date.Date == obj.Date.Date)
                    .Select(e => new Skill { Description = e.Description, Title = e.Title, Id = e.Id, Category = e.Category }).ToList();   
                
            }

            return result;
        }

        public async Task<List<Skill>> GetCategories(string user)
        {
            List<Skill> result = context.Skills.
                Where(e => e.User.Email == user).Select(e => new Skill { Id = e.Id, Category = e.Category }).ToList();

            return result;
        }

        public async Task<List<Skill>> GetDates(string user)
        {
            var result = context.Skills.
                Where(e => e.User.Email == user).Select(e => new Skill() { Date = e.Date.Date }).ToList();

            return result;
        }
    }
}