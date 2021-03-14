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
    public class DiaryServiceTests
    {
        DiaryService<DiaryData> diaryService;
        WorkingWithDiaryForTest workingWithDiaryForTest = new WorkingWithDiaryForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingDiary<DiaryData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            diaryService = new DiaryService<DiaryData>(workingWithDiaryForTest, mapper);
        }

        [Test]
        public async Task Add_Entry_Test()
        {
            string email = "zoldikds@mail.ru";

            DiaryData diaryData = new DiaryData { Text = "Test from test" };

            Assert.AreEqual(1, await diaryService.TryAddEntry(diaryData, email));
        }
        
        [Test]
        public async Task Edit_Entry_Test()
        {
            DiaryData diaryData = new DiaryData { Id = "3", Text = "12313", DateTime = "01.01.2021 00:00:00" };

            Assert.AreEqual(1, await diaryService.TryEditEntry(diaryData));
        }
        
        [Test]
        public async Task Remove_Entry_Test()
        {
            DiaryData diaryData = new DiaryData { Id = "2",};

            Assert.AreEqual(1, await diaryService.TryRemoveEntry(diaryData));
        }
        

        [Test]
        public async Task Get_Entries_Test()
        {
            string email = "zoldikds@mail.ru";

            DiaryData diaryData = new DiaryData { DateTime = "01.01.2021 00:00:00" };

            List<DiaryData>  test = await diaryService.TryGetEntries(diaryData, email);
            
            Assert.AreNotEqual(0, test.Count);
        }
        
    }
}