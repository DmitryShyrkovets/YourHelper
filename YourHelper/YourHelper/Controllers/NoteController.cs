using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using SelfHelper.Comparers;
using Services;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("Note")]
    public class NoteController: Controller
    {
        private readonly NoteService<NoteData> _service;

        public NoteController(IMapper mapper, INote<Note> service)
        {
            _service = new NoteService<NoteData>(service, mapper);
        }
        
        [HttpGet]
        [Route("LoadCategories")]
        public async Task<IEnumerable<NoteData>> LoadCategories()
        {
            IEnumerable<NoteData> result = await _service.LoadCategories(User.Identity.Name);

            return result.Distinct(new NoteCategoryComparer());
        }

        [HttpPost]
        [Route("LoadNotes")]
        public async Task<List<NoteData>> LoadNotes([FromBody] NoteData data)
        {
            List<NoteData> notes = await _service.LoadNotes(data, User.Identity.Name);

            foreach (var item in notes)
            {
                item.Important = item.Important.ToLower();
            }
            
            return notes;
        }

        [HttpPost]
        [Route("AddNote")]
        public async Task AddNote([FromBody] NoteData data)
        {
            await _service.AddNote(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("EditNote")]
        public async Task EditNote([FromBody] NoteData data)
        {
            await _service.EditNote(data);
        }

        [HttpPost]
        [Route("RemoveNote")]
        public async Task RemoveNote([FromBody] NoteData data)
        {
            await _service.RemoveNote(data);
        }
        
    }
}