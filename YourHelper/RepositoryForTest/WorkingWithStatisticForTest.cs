using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithStatisticForTest : IStatistic<Statistic>
    {
        AplicationContextForTest context;

        public WorkingWithStatisticForTest()
        {
            context = new AplicationContextForTest();
        }


 public async Task<Statistic> GetInfo(Statistic obj, string user)
        {
            obj.DiaryEntries = await GetDiaryEntries(user, obj.DateStart, obj.DateEnd);
            obj.DiaryDays = await GetDiaryDays(user, obj.DateStart, obj.DateEnd);
            obj.NotesCount = await GetNotesCount(user, obj.DateStart, obj.DateEnd);
            obj.NotesImportant = await GetNotesImportant(user, obj.DateStart, obj.DateEnd);
            obj.NotesCategories = await GetNotesCategory(user, obj.DateStart, obj.DateEnd);
            obj.TargetsCount = await GetTargetsCount(user, obj.DateStart, obj.DateEnd);
            obj.TargetsCompleted = await GetTargetsCompleted(user, obj.DateStart, obj.DateEnd);
            obj.TargetsFailed = await GetTargetsFailed(user, obj.DateStart, obj.DateEnd);
            obj.TargetsProcess = await GetTargetsProcess(user, obj.DateStart, obj.DateEnd);
            obj.SkillsCount = await GetSkillsCount(user, obj.DateStart, obj.DateEnd);
            obj.SkillsCategories = await GetSkillsCategories(user, obj.DateStart, obj.DateEnd);
            obj.SkillsDays = await GetSkillsDays(user, obj.DateStart, obj.DateEnd);
            obj.FinancesComing = await GetFinancesComing(user, obj.DateStart, obj.DateEnd);
            obj.FinancesConsumption = await GetFinancesConsumption(user, obj.DateStart, obj.DateEnd);
            obj.FinancesCategories = await GetFinancesCategories(user, obj.DateStart, obj.DateEnd);

            return obj;
        }
 
        public async Task<int> GetDiaryEntries(string user, DateTime start, DateTime end)
        {
            List<Diary> result = context.Diaries
                .Where(e => (e.DateTime.Date >= start.Date && e.DateTime.Date <= end.Date && e.User.Email == user))
                .Select(e => new Diary { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }
            
            return result.Count;
        }
        
        public async Task<int> GetDiaryDays(string user, DateTime start, DateTime end)
        {
            List<Diary> result = context.Diaries
                .Where(e => (e.DateTime.Date >= start.Date && e.DateTime.Date <= end.Date && e.User.Email == user))
                .Select(e => new Diary { DateTime = e.DateTime.Date }).ToList();
           
            if (result == null)
            {
                return 0;
            }

            return result.GroupBy(x => x.DateTime.Date).Select(x => x.First()).Count();
        }
        
        public async Task<int> GetNotesCount(string user, DateTime start, DateTime end)
        {
            List<Note> result = context.Notes
                .Where(e => (e.DateTime.Date >= start.Date && e.DateTime.Date <= end.Date && e.User.Email == user))
                .Select(e => new Note { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetNotesImportant(string user, DateTime start, DateTime end)
        {
            List<Note> result = context.Notes
                .Where(e => (e.DateTime.Date >= start.Date && e.DateTime.Date <= end.Date && e.User.Email == user && e.Important == true))
                .Select(e => new Note { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetNotesCategory(string user, DateTime start, DateTime end)
        {
            List<Note> result = context.Notes
                .Where(e => (e.DateTime.Date >= start.Date && e.DateTime.Date <= end.Date && e.User.Email == user))
                .Select(e => new Note { Category = e.Category }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetTargetsCount(string user, DateTime start, DateTime end)
        {
            List<Target> result = context.Targets
                .Where(e => (((e.TimeStart.Date <= start.Date || e.TimeStart.Date <= end.Date) && (e.TimeEnd.Date >= start.Date || e.TimeEnd.Date >= end.Date)) && e.User.Email == user))
                .Select(e => new Target { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetTargetsCompleted(string user, DateTime start, DateTime end)
        {
            List<Target> result = context.Targets
                .Where(e => (((e.TimeStart.Date <= start.Date || e.TimeStart.Date <= end.Date) && (e.TimeEnd.Date >= start.Date || e.TimeEnd.Date >= end.Date)) && e.User.Email == user && e.Status == "Выполнена"))
                .Select(e => new Target { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetTargetsFailed(string user, DateTime start, DateTime end)
        {
            List<Target> result = context.Targets
                .Where(e => (((e.TimeStart.Date <= start.Date || e.TimeStart.Date <= end.Date) && (e.TimeEnd.Date >= start.Date || e.TimeEnd.Date >= end.Date)) && e.User.Email == user && e.Status == "Провалена"))
                .Select(e => new Target { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetTargetsProcess(string user, DateTime start, DateTime end)
        {
            List<Target> result = context.Targets
                .Where(e => (((e.TimeStart.Date <= start.Date || e.TimeStart.Date <= end.Date) && (e.TimeEnd.Date >= start.Date || e.TimeEnd.Date >= end.Date)) && e.User.Email == user && e.Status == "В процессе"))
                .Select(e => new Target { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetSkillsCount(string user, DateTime start, DateTime end)
        {
            List<Skill> result = context.Skills
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user))
                .Select(e => new Skill { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetSkillsCategories(string user, DateTime start, DateTime end)
        {
            List<Skill> result = context.Skills
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user))
                .Select(e => new Skill { Category = e.Category }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.GroupBy(x => x.Category).Select(x => x.First()).Count();
        }
        
        public async Task<int> GetSkillsDays(string user, DateTime start, DateTime end)
        {
            List<Skill> result = context.Skills
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user))
                .Select(e => new Skill { Date = e.Date }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.GroupBy(x => x.Date.Date).Select(x => x.First()).Count();
        }
        
        public async Task<int> GetFinancesComing(string user, DateTime start, DateTime end)
        {
            List<Finance> result = context.Finances
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user && e.Operation == "Приход"))
                .Select(e => new Finance { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetFinancesConsumption(string user, DateTime start, DateTime end)
        {
            List<Finance> result = context.Finances
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user && e.Operation == "Расход"))
                .Select(e => new Finance { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.Count;
        }
        
        public async Task<int> GetFinancesCategories(string user, DateTime start, DateTime end)
        {
            List<Finance> result = context.Finances
                .Where(e => (e.Date.Date >= start.Date && e.Date.Date <= end.Date && e.User.Email == user))
                .Select(e => new Finance { Id = e.Id }).ToList();

            if (result == null)
            {
                return 0;
            }

            return result.GroupBy(x => x.Category).Select(x => x.First()).Count();
        }
    }
}