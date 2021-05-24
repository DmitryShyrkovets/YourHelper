using System;

namespace Repository
{
    public class Statistic
    {
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int DiaryEntries { get; set; }
        public int DiaryDays { get; set; }
        public int NotesCount { get; set; }
        public int NotesImportant { get; set; }
        public int NotesCategories { get; set; }
        public int TargetsCount { get; set; }
        public int TargetsCompleted { get; set; }
        public int TargetsFailed { get; set; }
        public int TargetsProcess { get; set; }
        public int SkillsCount { get; set; }
        public int SkillsCategories { get; set; }
        public int SkillsProcess { get; set; }
        public int SkillsComplete { get; set; }
        public int SkillsDays  { get; set; }
        public int SchedulesCount { get; set; }
        public int SchedulesDays  { get; set; }
        public int FinancesСount { get; set; }
        public int FinancesComing { get; set; }
        public int FinancesConsumption { get; set; }
        public int FinancesCategories  { get; set; }
    }
}