using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithTargetForTest : ITarget<Target>
    {
        AplicationContextForTest context;

        public WorkingWithTargetForTest()
        {
            context = new AplicationContextForTest();
        }

        public async Task<List<Target>> GetTargets(string user, Target obj)
        {
            List<Target> result;

            switch (obj.Status)
            {
                case "Все":
                    result = context.Targets.OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user)
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();
                    break;
                case "Выполненные":
                    result =  context.Targets.OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "Выполнена")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();
                    break;
                case "В процессе":
                    result =  context.Targets.OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "В процессе")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();
                    break;
                case "Проваленные":
                    result =  context.Targets.OrderBy(e => e.TimeStart)
                        .Where(e => e.User.Email == user && e.Status == "Провалена")
                        .Select(e => new Target { Id = e.Id, Text = e.Text, Status = e.Status, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();
                    break;
                default:
                    result = null;
                    break;
            }
            
            return result;
        }

        public async Task<int> AddTarget(Target obj, string user)
        {
            User user1 = context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    context.Targets.Add(new Target
                    {
                        Text = obj.Text,
                        Status = obj.Status,
                        TimeStart = obj.TimeStart,
                        TimeEnd = obj.TimeEnd,
                        User = user1
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

        public async Task<int> EditTarget(Target obj)
        {
            Target target = context.Targets.FirstOrDefault(e => e.Id == obj.Id);

            if (target != null)
            {
                try
                {
                    target.Text = obj.Text;
                    target.Status = obj.Status;
                    target.TimeStart = obj.TimeStart;
                    target.TimeEnd = obj.TimeEnd;

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
            Target target = context.Targets.FirstOrDefault(e => e.Id == obj.Id);

            if (target != null)
            {
                try
                {
                    context.Targets.Remove(target);

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }
    }
}