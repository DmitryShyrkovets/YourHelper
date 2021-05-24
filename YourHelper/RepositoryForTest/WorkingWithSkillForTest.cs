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

        public Task<int> AddProcessSkill(Skill obj, string user)
        {
            throw new NotImplementedException();
        }

        public async Task<int> AddSkill(Skill obj)
        {
            DateTime dateTime = DateTime.Now;
            
            Skill skill = context.Skills.FirstOrDefault(e => e.Id == obj.Id);

            if (skill != null)
            {
                try
                {
                    skill.Description = obj.Description;
                    skill.Category = obj.Category;
                    skill.Title = obj.Title;
                    skill.Date = dateTime;
                    skill.Status = "Completed";

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

        public Task<List<Skill>> GetProcessSkills(Skill obj, string user)
        {
            throw new NotImplementedException();
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