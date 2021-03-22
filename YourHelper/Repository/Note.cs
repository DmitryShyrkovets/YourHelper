﻿using System;

namespace Repository
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Text { get; set; }
        public bool Important { get; set; }
        public DateTime DateTime { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}