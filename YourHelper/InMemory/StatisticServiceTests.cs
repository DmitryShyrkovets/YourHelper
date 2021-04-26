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
    public class StatisticServiceTests
    {
        StatisticService<StatisticData> statisticService;
        WorkingWithStatisticForTest workingWithStatisticForTest = new WorkingWithStatisticForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingStatistic<StatisticData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            statisticService = new StatisticService<StatisticData>(workingWithStatisticForTest, mapper);
        }

        [Test]
        public async Task Load_Targets_Test()
        {
            StatisticData data = new StatisticData() { DateStart = "01.01.2021", DateEnd = "05.01.2021"};

            string login = "zoldikds@mail.ru";

            StatisticData result = await statisticService.LoadInfo(data, login);

            Assert.NotNull(result);
        }

    }
}