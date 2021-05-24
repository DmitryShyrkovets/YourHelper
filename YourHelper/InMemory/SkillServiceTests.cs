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
    public class SkillServiceTests
    {
        SkillService<SkillData> skillService;
        WorkingWithSkillForTest workingWithSkillForTest = new WorkingWithSkillForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingSkill<SkillData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            skillService = new SkillService<SkillData>(workingWithSkillForTest, mapper);
        }

        [Test]
        [TestCase("Все")]
        public async Task Load_Skills_Test(string category)
        {
            SkillData data = new SkillData() { Category = category, Date = "01.01.2021 00:00:00"};

            string login = "zoldikds@mail.ru";

            List<SkillData> result = await skillService.LoadSkills(data, login);

            Assert.AreNotEqual(0, result.Count);
        }
        
        [Test]
        public async Task Load_Skill_Categories_Test()
        {
            string login = "zoldikds@mail.ru";

            List<SkillData> result = await skillService.LoadCategories(login);

            Assert.AreNotEqual(0, result.Count);
        }
        
        [Test]
        public async Task Load_Skill_Dates_Test()
        {
            string login = "zoldikds@mail.ru";

            List<SkillData> result = await skillService.LoadDates(login);

            Assert.AreNotEqual(0, result.Count);
        }

        /*[Test]
        public async Task Add_Skill_Test()
        {
            SkillData data = new SkillData { Description = "test", Title = "test", Category = "test" };

            string login = "zoldikds@mail.ru";

            Assert.AreEqual(1, await skillService.AddSkill(data, login));
        }*/
        
        [Test]
        public async Task Edit_Skill_Test()
        {
            SkillData data = new SkillData() {Id = "2", Description = "test 2", Title = "test 2", Category = "test 2" };

            Assert.AreEqual(1, await skillService.EditSkill(data));
        }
        
        [Test]
        public async Task Delete_Skill_Test()
        {
            SkillData data = new SkillData() { Id = "1" };

            Assert.AreEqual(1, await skillService.RemoveSkill(data));
        }
        
    }
}