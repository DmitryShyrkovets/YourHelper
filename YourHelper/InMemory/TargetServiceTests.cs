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
    public class TargetServiceTests
    {
        TargetService<TargetData> targetService;
        WorkingWithTargetForTest workingWithTargetForTest = new WorkingWithTargetForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingTarget<TargetData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            targetService = new TargetService<TargetData>(workingWithTargetForTest, mapper);
        }

        [Test]
        [TestCase("Все")]
        [TestCase("Выполненные")]
        [TestCase("Проваленные")]
        public async Task Load_Targets_Test(string status)
        {
            TargetData data = new TargetData() { Status = status };

            string login = "zoldikds@mail.ru";

            List<TargetData> result = await targetService.LoadTargets(login, data);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        public async Task Add_Target_Test()
        {
            TargetData data = new TargetData() { Text = "Text in test", Status = "В процессе", TimeStart = "01.01.2021 19:00:00", TimeEnd = "01.01.2021 19:30:00" };

            string login = "zoldikds@mail.ru";

            Assert.AreEqual(1, await targetService.AddTarget(data, login));
        }
        
        [Test]
        [TestCase("Выполнена")]
        [TestCase("Провалена")]
        [TestCase("В процессе")]
        public async Task Edit_Target_Test(string status)
        {
            TargetData data = new TargetData() {Id = "2", Text = "Text in test", Status = "Выполнена", TimeStart = "01.01.2021 19:00:00", TimeEnd = "01.01.2021 19:30:00" };

            Assert.AreEqual(1, await targetService.EditTarget(data));
        }
        
        [Test]
        public async Task Delete_Target_Test()
        {
            TargetData data = new TargetData() { Id = "1" };

            Assert.AreEqual(1, await targetService.RemoveTarget(data));
        }
        
    }
}