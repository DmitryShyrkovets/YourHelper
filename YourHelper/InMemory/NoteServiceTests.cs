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
    public class NoteServiceTests
    {
        NoteService<NoteData> noteService;
        WorkingWithNoteForTest workingWithNoteForTest = new WorkingWithNoteForTest();
        
        [SetUp]
        public void Setup()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingNote<NoteData>());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            
            noteService = new NoteService<NoteData>(workingWithNoteForTest, mapper);
        }

        [Test]
        public async Task Load_Note_Categories_Test()
        {
            string login = "zoldikds@mail.ru";

            List<NoteData> result = await noteService.LoadCategories(login);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        [TestCase("Все")]
        [TestCase("Test topic")]
        public async Task Load_Notes_Test(string topic)
        {
            NoteData data = new NoteData() { Category = topic };

            string login = "zoldikds@mail.ru";

            List<NoteData> result = await noteService.LoadNotes(data,login);

            Assert.AreNotEqual(0, result.Count);
        }
        
        [Test]
        [TestCase("Все", "true")]
        [TestCase("Все", "false")]
        [TestCase("Test topic", "true")]
        [TestCase("Test topic 4", "false")]
        public async Task Load_Important_Notes_Test(string topic, string important)
        {
            NoteData data = new NoteData() { Category = topic, Important = important};

            string login = "zoldikds@mail.ru";

            List<NoteData> result = await noteService.LoadNotes(data,login);

            Assert.AreNotEqual(0, result.Count);
        }

        [Test]
        [TestCase("true")]
        [TestCase("false")]
        public async Task Add_Note_Test(string important)
        {
            NoteData data = new NoteData() { Category = "Topic in test", Title = "Title in test", Text = "Text in test", Important = important };

            string login = "zoldikds@mail.ru";

            Assert.AreEqual(1, await noteService.AddNote(data, login));
        }
        
        [Test]
        [TestCase("true")]
        [TestCase("false")]
        public async Task Edit_Note_Test(string important)
        {
            NoteData data = new NoteData() {Id = "2", Category = "Topic in test for edit", Title = "Title in test for edit", Text = "Text in test for edit", Important = important };

            Assert.AreEqual(1, await noteService.EditNote(data));
        }
        
        [Test]
        public async Task Delete_Note_Test()
        {
            NoteData data = new NoteData() { Id = "1" };

            Assert.AreEqual(1, await noteService.RemoveNote(data));
        }
        
    }
}