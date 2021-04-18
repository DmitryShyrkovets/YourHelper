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

        public async Task<List<Finance>> GetItogs(Finance obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd)
        {
            List<Finance> result = new List<Finance>();
            
            List<Finance> rub;
            List<Finance> byn;
            List<Finance> uah;
            List<Finance> usd;
            List<Finance> eur;

            Decimal rubs = 0;
            Decimal byns = 0;
            Decimal uahs = 0;
            Decimal usds = 0;
            Decimal eurs = 0;
            
            if (obj.Operation == "Прибыль")
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "RUB")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "BYN")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "UAH")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "USD")
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "EUR")
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "RUB" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "BYN" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "UAH" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "USD" && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "EUR" && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "RUB")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "BYN")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "UAH")
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "USD")
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "EUR")
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                    }
                    else
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "RUB" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "BYN" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "UAH" && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Operation = e.Operation}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "USD" && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "EUR" && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Operation = e.Operation}).ToListAsync();
                    }
                }

            }
            else
            {
                if (!dateFilter)
                {
                    if (obj.Category == "Все")
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "RUB" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "BYN" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "UAH" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "USD" && e.Operation == obj.Operation)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "EUR" && e.Operation == obj.Operation)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                    }
                    else
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "RUB" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "BYN" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "UAH" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "USD" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Date >= dateStart && e.Date <= dateEnd && e.Currency == "EUR" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                    }
                }
                else
                {
                    if (obj.Category == "Все")
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "RUB" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user&& e.Currency == "BYN" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "UAH" && e.Operation == obj.Operation)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "USD" && e.Operation == obj.Operation)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "EUR" && e.Operation == obj.Operation)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                    }
                    else
                    {
                        rub = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "RUB" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        byn = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user&& e.Currency == "BYN" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        uah = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "UAH" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance { Money = e.Money, Currency = e.Currency}).ToListAsync();

                        usd = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "USD" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();

                        eur = await _context.Finances.AsNoTracking()
                            .Where(e => e.User.Email == user && e.Currency == "EUR" && e.Operation == obj.Operation && e.Category == obj.Category)
                            .Select(e => new Finance {Money = e.Money, Currency = e.Currency}).ToListAsync();
                    }
                }
            }

            foreach (var item in rub)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    rubs -= item.Money;
                }
                else
                {
                    rubs += item.Money;
                }
            }
            
            foreach (var item in byn)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    byns -= item.Money;
                }
                else
                {
                    byns += item.Money;
                }
            }
            
            foreach (var item in uah)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    uahs -= item.Money;
                }
                else
                {
                    uahs += item.Money;
                }
            }
            
            foreach (var item in usd)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    usds -= item.Money;
                }
                else
                {
                    usds += item.Money;
                }
            }
            
            foreach (var item in eur)
            {
                if (obj.Operation == "Прибыль" && item.Operation == "Расход")
                {
                    eurs -= item.Money;
                }
                else
                {
                    eurs += item.Money;
                }
            }
            
            result.Add(new Finance{Id = 0, Money = rubs, Currency = "RUB"});
            result.Add(new Finance{Id = 1, Money = byns, Currency = "BYN"});
            result.Add(new Finance{Id = 2, Money = uahs, Currency = "UAH"});
            result.Add(new Finance{Id = 3, Money = usds, Currency = "USD"});
            result.Add(new Finance{Id = 4, Money = eurs, Currency = "EUR"});
            
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