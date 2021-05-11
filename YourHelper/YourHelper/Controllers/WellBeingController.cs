using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("WellBeing")]
    public class WellBeingController: Controller
    {
        private readonly WellBeingService<WellBeingData> _service;

        public WellBeingController(IMapper mapper, IWellBeing<WellBeing> service)
        {
            _service = new WellBeingService<WellBeingData>(service, mapper);
        }

        [HttpPost]
        [Route("GetWellBeing")]
        public async Task<WellBeingData> GetWellBeing([FromBody] WellBeingData data)
        {
            return await _service.GetWellBeing(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("SetWellBeing")]
        public async Task SetWellBeing([FromBody] WellBeingData data)
        {
            await _service.SetWellBeing(data, User.Identity.Name);
        }

    }
}