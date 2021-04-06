
using System;

namespace Repository
{
    public class Schedule
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
