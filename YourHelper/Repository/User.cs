
using System.Collections.Generic;

namespace Repository
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        
        public List<Diary> Diaries { get; set; }
        public List<Note> Notes { get; set; }
    }
}
