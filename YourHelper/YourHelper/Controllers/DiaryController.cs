using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using SelfHelperRE;
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
        public async Task AddEntry([FromBody] DiaryData data)
        {
            await _service.TryAddEntry(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("EditEntry")]
        public async Task EditEntry([FromBody] DiaryData data)
        {
            await _service.TryEditEntry(data);
        }
        
        [HttpPost]
        [Route("RemoveEntry")]
        public async Task RemoveEntry([FromBody] DiaryData data)
        {
            await _service.TryRemoveEntry(data);
        }

        [Route("GetDates")]
        public async Task<IEnumerable<DiaryData>> GetDates()
        {
            IEnumerable<DiaryData> result = await _service.TryGetDates(User.Identity.Name);
            
            return result.Distinct(new DiaryDateComparer());
        }
        
        [HttpPost]
        [Route("GetEntries")]
        public async Task<IEnumerable<DiaryData>> GetEntries([FromBody] DiaryData data)
        {
            return await _service.TryGetEntries(data, User.Identity.Name);
        }
        
    }
}