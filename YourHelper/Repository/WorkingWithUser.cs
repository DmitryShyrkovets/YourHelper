using DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Repository
{
    public class WorkingWithUser : IUser<User>
    {
        private readonly ApplicationContext _context;

        public WorkingWithUser(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddUser(User user)
        {
            try
            {
                if (user != null)
                {
                    _context.Users.Add(user);

                    await _context.SaveChangesAsync();
                }

                return -1;
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
                        return await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password) != null;
                    case "registration":
                        return await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email || u.Password == user.Password) != null;
                    case "email":
                        return await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email) != null;
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<User> GetData(User user)
        {
            try
            {
                User result = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
