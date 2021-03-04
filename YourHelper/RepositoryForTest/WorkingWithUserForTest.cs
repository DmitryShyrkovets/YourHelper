using System;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithUserForTest : IUser<User>
    {
        AplicationContextForTest context;

        public WorkingWithUserForTest()
        {
            context = new AplicationContextForTest();
        }
        
        public async Task<int> AddUser(User user)
        {
            try
            {
                user.Id = context.Users.Count;

                context.Users.Add(user);

                return 1;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public async Task<int> ChangePassword(User user)
        {
            try
            {
                User check =  context.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                check.Password = user.NewPassword;

                return 1;
            }
            catch (Exception)
            {
                return -1;
            }
        }

        public async Task<bool> CheckUser(User user, string param)
        {
            try
            {
                switch (param)
                {
                    case "login":
                        return context.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password) != null;
                    case "registration":
                        return context.Users.FirstOrDefault(u => u.Email == user.Email || u.Password == user.Password) != null;
                    case "email":
                        return context.Users.FirstOrDefault(u => u.Email == user.Email) != null;
                    case "change":
                        return context.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password) != null;
                }

                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<User> GetData(User user)
        {
            try
            {
                User result = context.Users.FirstOrDefault(u => u.Email == user.Email);

                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}