using System;

namespace Repository
{
    public class Finance
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Operation { get; set; }
        public Decimal Money { get; set; }
        public string Currency { get; set; }
        public DateTime Date { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
    }
}