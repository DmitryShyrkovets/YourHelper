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
    public class ScheduleServiceTests
    {
        ScheduleService<ScheduleData> scheduleService;
        WorkingWithScheduleForTest workingWithScheduleForTest = new WorkingWithScheduleForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingSchedule<ScheduleData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            scheduleService = new ScheduleService<ScheduleData>(workingWithScheduleForTest, mapper);
        }

        [Test]
        public async Task Load_Schedules_Test()
        {
            string login = "zoldikds@mail.ru";

            List<ScheduleData> result = await scheduleService.LoadSchedules(login);

            Assert.AreNotEqual(0, result.Count);
        }       
        
        [Test]
        public async Task Load_Schedules_Info_Test()
        {
            string login = "zoldikds@mail.ru";

            List<ScheduleData> result = await scheduleService.GetSchedulesInfo(login);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        public async Task Add_Schedules_Test()
        {
            ScheduleData data = new ScheduleData() {Text = "Text in test", TimeStart = "01.01.2021 19:00:00", TimeEnd = "01.01.2021 19:30:00" };

            string login = "zoldikds@mail.ru";

            Assert.AreEqual(1, await scheduleService.AddSchedule(data, login));
        }
        
        [Test]
        public async Task Edit_Schedules_Test()
        {
            ScheduleData data = new ScheduleData() {Id = "0", Text = "Text in test", TimeStart = "01.01.2021 09:00:00", TimeEnd = "01.01.2021 10:30:00" };

            Assert.AreEqual(1, await scheduleService.EditSchedule(data));
        }
        
        [Test]
        public async Task Delete_Schedules_Test()
        {
            ScheduleData data = new ScheduleData() {Id = "1"};

            Assert.AreEqual(1, await scheduleService.RemoveSchedule(data));
        }
        
    }
}