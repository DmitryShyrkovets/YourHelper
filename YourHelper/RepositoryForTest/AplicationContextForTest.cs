using System;
using System.Collections.Generic;
using Repository;

namespace RepositoryForTest
{
    public class AplicationContextForTest
    {
        public List<User> Users;
        public List<Diary> Diaries;
        public List<Note> Notes;

        public AplicationContextForTest()
        {
            Users = new List<User>{
                (new User { Id = 0, Email = "zoldikds@mail.ru", Password = "111111" }),
                (new User { Id = 1, Email = "zoldikds1@mail.ru", Password = "222222" }),
                (new User { Id = 2, Email = "zoldikds2@mail.ru", Password = "333333" })
            };
            
            Diaries = new List<Diary>{
                (new Diary { Id = 0, Text = "Text for test 1", DateTime = Convert.ToDateTime("01.01.2021 00:03:00"), User = Users[0]}),
                (new Diary { Id = 1, Text = "Text for test 2", DateTime = Convert.ToDateTime("02.01.2021 01:30:00"), User = Users[1] }),
                (new Diary { Id = 2, Text = "Text for test 3", DateTime = Convert.ToDateTime("03.01.2021 00:00:00"), User = Users[2] }),
                (new Diary { Id = 3, Text = "Text for test 4", DateTime = Convert.ToDateTime("01.01.2021 01:10:00"), User = Users[0] })
            };
            Notes = new List<Note>
            {
                new Note { Id = 0, Text = "Test note", Important = true, Title = "Test title", Category = "Test topic", DateTime = Convert.ToDateTime("01.01.2021 00:00:00"),  User = Users[0]},
                new Note { Id = 1, Text = "Test note 2", Important = true, Title = "Test title 2", Category = "Test topic 2", DateTime = Convert.ToDateTime("02.01.2021 00:01:00"), User = Users[1]},
                new Note { Id = 2, Text = "Test note 3", Important = false, Title = "Test title 3", Category = "Test topic 3", DateTime = Convert.ToDateTime("01.01.2021 00:02:00"), User = Users[2]},
                new Note { Id = 3, Text = "Test note 4", Important = false, Title = "Test title 4", Category = "Test topic 4",DateTime = Convert.ToDateTime("02.01.2021 00:03:00"),  User = Users[0]},
            }; 
        }
    }
}