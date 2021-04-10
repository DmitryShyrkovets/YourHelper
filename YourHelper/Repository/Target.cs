
using System;

namespace Repository
{
    public class Target
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Status { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
