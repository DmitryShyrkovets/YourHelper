using System;

namespace Repository
{
    public class Mood
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
    }
}