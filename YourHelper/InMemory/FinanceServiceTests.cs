using System;
using System.Threading.Tasks;
using NUnit.Framework;
using RepositoryForTest;
using Services;
using YourHelper.Models;
using AutoMapper;
using Mapping;
using System.Collections.Generic;

namespace InMemory
{
    [TestFixture]
    public class FinanceServiceTests
    {
        FinanceService<FinanceData> financeService;
        WorkingWithFinanceForTest workingWithFinanceForTest = new WorkingWithFinanceForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingFinance<FinanceData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            financeService = new FinanceService<FinanceData>(workingWithFinanceForTest, mapper);
        }

        [Test]
        public async Task Load_Note_Categories_Test()
        {
            string login = "zoldikds@mail.ru";

            List<FinanceData> result = await financeService.LoadCategories(login);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        [TestCase("Все", "Приход")]
        [TestCase("test-1", "Приход")]
        public async Task Load_Finances_Test(string topic, string operation)
        {
            FinanceData data = new FinanceData() { Category = topic, Operation = operation};
            
            DateTime dateStart = Convert.ToDateTime("01.01.2021");
            DateTime dateEnd = Convert.ToDateTime("05.01.2021");


            string login = "zoldikds@mail.ru";

            List<FinanceData> result = await financeService.LoadFinances(data, login, false, dateStart, dateEnd);

            Assert.AreNotEqual(0, result.Count);
        }
        
        [Test]
        [TestCase("Все", "Расход")]
        [TestCase("test-1", "Приход")]
        public async Task Load_Itogs_Test(string topic, string operation)
        {
            FinanceData data = new FinanceData() { Category = topic, Operation = operation};
            
            DateTime dateStart = Convert.ToDateTime("01.01.2021");
            DateTime dateEnd = Convert.ToDateTime("05.01.2021");


            string login = "zoldikds@mail.ru";

            List<FinanceData> result = await financeService.LoadItogs(data, login, false, dateStart, dateEnd);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        public async Task Add_Finance_Test()
        {
            FinanceData data = new FinanceData() { Category = "test", Title = "Title in test", Currency = "RUB", Date = "01.01.2021", Money = "20", Operation = "Приход"};

            string login = "zoldikds@mail.ru";

            Assert.AreEqual(1, await financeService.AddFinance(data, login));
        }
        
        [Test]
        public async Task Edit_Finance_Test()
        {
            FinanceData data = new FinanceData() {Id = "2", Category = "Topic in test for edit", Title = "Title in test for edit", Currency = "RUB", Date = "01.01.2021", Money = "20", Operation = "Приход"};

            Assert.AreEqual(1, await financeService.EditFinance(data));
        }
        
        [Test]
        public async Task Delete_Finance_Test()
        {
            FinanceData data = new FinanceData() { Id = "1" };

            Assert.AreEqual(1, await financeService.RemoveFinance(data));
        }
        
    }
}