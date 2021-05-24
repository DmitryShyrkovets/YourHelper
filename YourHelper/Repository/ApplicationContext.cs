using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Diary> Diaries { get; set; }
        public DbSet<WellBeing> WellBeings { get; set; }
        public DbSet<Mood> Moods { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Target> Targets { get; set; }
        public DbSet<Finance> Finances { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=YourHelperdb;Trusted_Connection=True;");
        }

        public ApplicationContext()
        {
            //Database.EnsureDeleted(); 
            Database.EnsureCreated();
        }
    }
}
