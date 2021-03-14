using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("Diary")]
    public class DiaryController: Controller
    {
        private readonly DiaryService<DiaryData> _service;

        public DiaryController(IMapper mapper, IDiary<Diary> service)
        {
            _service = new DiaryService<DiaryData>(service, mapper);
        }
        

        [HttpPost]
        [Route("AddEntry")]
        public async Task<IActionResult> AddEntry([FromBody] DiaryData data)
        {
            await _service.TryAddEntry(data, User.Identity.Name);

            return Ok();

        }
        
        [HttpPost]
        [Route("EditEntry")]
        public async Task<IActionResult> EditEntry([FromBody] DiaryData data)
        {
            await _service.TryEditEntry(data);

            return Ok();

        }
        
        [HttpPost]
        [Route("RemoveEntry")]
        public async Task<IActionResult> RemoveEntry([FromBody] DiaryData data)
        {
            await _service.TryRemoveEntry(data);

            return Ok();

        }
        
        [Route("GetDates")]
        public async Task<IEnumerable<DiaryData>> GetDates()
        {
            return await _service.TryGetDates(User.Identity.Name);
        }
        
        [HttpPost]
        [Route("GetEntries")]
        public async Task<IEnumerable<DiaryData>> GetEntries([FromBody] DiaryData data)
        {
            return await _service.TryGetEntries(data, User.Identity.Name);
        }
        
    }
}