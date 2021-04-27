using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithFinance : IFinance<Finance>
    {
        private readonly ApplicationContext _context;

        public WorkingWithFinance(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddFinance(Finance obj, string user)
        {
            User user1 = _context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    _context.Finances.Add(new Finance
                    {
                        Title = obj.Title,
                        Category = obj.Category,
                        Currency = obj.Currency,
                        Date = obj.Date,
                        Money = obj.Money,
                        Operation = obj.Operation,
                        User = user1
                    });

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }
            }
            
            return -1;
        }

        public async Task<int> EditFinance(Finance obj)
        {
            Finance finance = _context.Finances.FirstOrDefault(e => e.Id == obj.Id);

            if (finance != null)
            {
                try
                {
                    finance.Title = obj.Title;
                    finance.Category = obj.Category;
                    finance.Currency = obj.Currency;
                    finance.Date = obj.Date;
                    finance.Money = obj.Money;
                    finance.Operation = obj.Operation;

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async Task<int> RemoveFinance(Finance obj)
        {
            Finance finance = _context.Finances.FirstOrDefault(e => e.Id == obj.Id);

            if (finance != null)
            {
                try
                {
                    _context.Finances.Remove(finance);

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async Task<List<Finance>> GetFinances(Finance obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd)
        {
            List<Finance> result;

            if (obj.Operation == "Прибыль")
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Category == obj.Category)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Category == obj.Category)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                }

            }
            else
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Operation == obj.Operation)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Category == obj.Category && e.Operation == obj.Operation)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Operation == obj.Operation)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        result = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Category == obj.Category && e.Operation == obj.Operation)
                            .Select(e => new Finance { Id = e.Id, Title = e.Title, Date = e.Date, Category = e.Category, Money = e.Money, Currency = e.Currency, Operation = e.Operation}).ToListAsync();

                    }
                }
            }

            return result;
        }

        public async Task<Finance> GetItog(Finance obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd, string currency, int id)
        {
            List<Finance> list;
            Decimal money = 0;
            
            if (obj.Operation == "Прибыль")
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                    else
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Category == obj.Category && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                    else
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Category == obj.Category && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                }

            }
            else
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Operation == obj.Operation && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();
                    }
                    else
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Operation == obj.Operation && e.Category == obj.Category && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();
                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Operation == obj.Operation && e.Currency == currency)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();
                    }
                    else
                    {
                        list = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Operation == obj.Operation && e.Category == obj.Category && e.Currency == currency) 
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();
                        
                    }
                }
            }
            
            foreach (var item in list)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    money -= item.Money;
                }
                else
                {
                    money += item.Money;
                }
            }

            Finance result = new Finance{Id = id, Money = money, Currency = currency};
            
            return result;
        }
        
        public async Task<List<Finance>> GetItogs(Finance obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd)
        {
            List<Finance> result = new List<Finance>();

            result.Add(await GetItog(obj, user, dateFilter, dateStart, dateEnd, "RUB", 0));
            result.Add(await GetItog(obj, user, dateFilter, dateStart, dateEnd, "BYN", 1));
            result.Add(await GetItog(obj, user, dateFilter, dateStart, dateEnd, "UAH", 2));
            result.Add(await GetItog(obj, user, dateFilter, dateStart, dateEnd, "USD", 3));
            result.Add(await GetItog(obj, user, dateFilter, dateStart, dateEnd, "EUR", 4));
            
            return result;
        }

        public async Task<List<Finance>> GetCategories(string user)
        {
            List<Finance> result = await _context.Finances.AsNoTracking().
                Where(e => e.User.Email == user).Select(e => new Finance { Id = e.Id, Category = e.Category }).ToListAsync();

            return result;
        }
    }
}