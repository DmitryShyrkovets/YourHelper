using System.Collections.Generic;
using Repository;

namespace RepositoryForTest
{
    public class AplicationContextForTest
    {
        public List<User> Users;

        public AplicationContextForTest()
        {
            Users = new List<User>{
                (new User { Id = 0, Email = "zoldikds@mail.ru", Password = "111111" }),
                (new User { Id = 1, Email = "zoldikds1@mail.ru", Password = "222222" }),
                (new User { Id = 2, Email = "zoldikds2@mail.ru", Password = "333333" })
            };
        }
    }
}