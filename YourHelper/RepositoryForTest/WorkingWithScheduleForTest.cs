using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithScheduleForTest : ISchedule<Schedule>
    {
        AplicationContextForTest context;

        public WorkingWithScheduleForTest()
        {
            context = new AplicationContextForTest();
        }

        public async Task<List<Schedule>> GetSchedules(string user)
        {
            List<Schedule> result = context.Schedules.OrderBy(e => e.TimeStart.TimeOfDay).
                Where(e => e.User.Email == user).Select(e => new Schedule { Id = e.Id, Text = e.Text, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();

            return result;
        }

        public List<Schedule> CreateScheduleInfo(List<Schedule> schedules)
        {
            
            List<Schedule> schedulesInfo = new List<Schedule>();
            
            if (schedules.Count == 0)
            {
                schedulesInfo.Add(new Schedule
                {
                    Id = 0,
                    TimeStart = Convert.ToDateTime("01.01.2021 00:00:00"),
                    TimeEnd = Convert.ToDateTime("01.01.2021 23:59:00")
                });

                return schedulesInfo;
            }
            
            if (schedules[0].TimeStart.TimeOfDay.ToString() != "00:00:00")
            {
                schedulesInfo.Add(new Schedule
                {
                    Id = 0, TimeStart = Convert.ToDateTime("01.01.2021 00:00:00"),
                    TimeEnd = Convert.ToDateTime(schedules[0].TimeStart.AddMinutes(-1).TimeOfDay.ToString())
                });
            }

            for (int i = 0; i < schedules.Count; i++)
            {
                if (i != (schedules.Count - 1))
                {
                    if (schedules[i].TimeEnd.AddMinutes(+1).TimeOfDay.ToString() != schedules[i+1].TimeStart.TimeOfDay.ToString())
                    {
                        schedulesInfo.Add(new Schedule
                        {
                            Id = i + 1, TimeStart = Convert.ToDateTime(schedules[i].TimeEnd.AddMinutes(+1).TimeOfDay.ToString()),
                            TimeEnd = Convert.ToDateTime(schedules[i+1].TimeStart.AddMinutes(-1).TimeOfDay.ToString())
                        });
                    }
                }
            }
            
            if ( schedules[schedules.Count - 1].TimeEnd.TimeOfDay.ToString() != "23:59:00")
            {
                schedulesInfo.Add(new Schedule
                {
                    Id = schedules.Count + 1, TimeStart = Convert.ToDateTime(schedules[schedules.Count - 1].TimeEnd.AddMinutes(+1).TimeOfDay.ToString()),
                    TimeEnd = Convert.ToDateTime("01.01.2021 23:59:00")
                });
            }

            return schedulesInfo;
        }
        
        public async Task<bool> CheckSchedule(Schedule obj, Schedule edit = null)
        {
            List<Schedule> schedules = context.Schedules.OrderBy(e => e.TimeStart.TimeOfDay).
                Where(e => e.User.Email == obj.User.Email).Select(e => new Schedule {TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();

            if (edit != null)
            {
                Schedule remove = schedules.FirstOrDefault(e => e.TimeStart.TimeOfDay == edit.TimeStart.TimeOfDay && e.TimeEnd.TimeOfDay == edit.TimeEnd.TimeOfDay);

                schedules.Remove(remove);
            }

            List<Schedule> scheduleInfo = CreateScheduleInfo(schedules);

            foreach (var item in scheduleInfo)
            {
                if (item.TimeStart.TimeOfDay <= obj.TimeStart.TimeOfDay && item.TimeEnd.TimeOfDay >= obj.TimeEnd.TimeOfDay)
                {
                    return true;
                }
            }
            
            return false;
        }
        
        public async Task<List<Schedule>> GetSchedulesInfo(string user)
        {
            List<Schedule> schedules = context.Schedules.OrderBy(e => e.TimeStart.TimeOfDay).
                Where(e => e.User.Email == user).Select(e => new Schedule { Id = e.Id, Text = e.Text, TimeStart = e.TimeStart, TimeEnd = e.TimeEnd}).ToList();
            
            return CreateScheduleInfo(schedules);
        }

        public async Task<int> AddSchedule(Schedule obj, string user)
        {
            User user1 = context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    obj.User = user1;
                    if (await CheckSchedule(obj))
                    {
                        context.Schedules.Add(new Schedule
                        {
                            Text = obj.Text,
                            TimeStart = obj.TimeStart,
                            TimeEnd = obj.TimeEnd,
                            User = user1
                        
                        });

                        return 1;
                    }

                    return 2;
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return -1;
        }

        public async Task<int> EditSchedule(Schedule obj)
        {
            Schedule schedule = context.Schedules.FirstOrDefault(e => e.Id == obj.Id);

            if (schedule != null)
            {
                try
                {
                    User user1 = context.Users.FirstOrDefault(e => e.Id == schedule.UserId);
                    obj.User = user1;
                    schedule.User = user1;

                    if (await CheckSchedule(obj, schedule))
                    {
                        schedule.Text = obj.Text;
                        schedule.TimeStart = obj.TimeStart;
                        schedule.TimeEnd = obj.TimeEnd;
                        
                        
                        return 1;
                    }

                    return 2;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async Task<int> RemoveSchedule(Schedule obj)
        {
            Schedule schedule = context.Schedules.FirstOrDefault(e => e.Id == obj.Id);

            if (schedule != null)
            {
                try
                {
                    context.Schedules.Remove(schedule);

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