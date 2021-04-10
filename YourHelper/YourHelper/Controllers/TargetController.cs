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
    [Route("Target")]
    public class TargetController: Controller
    {
        private readonly TargetService<TargetData> _service;

        public TargetController(IMapper mapper, ITarget<Target> service)
        {
            _service = new TargetService<TargetData>(service, mapper);
        }
        
        [HttpPost]
        [Route("LoadTargets")]
        public async Task<List<TargetData>> LoadSchedules([FromBody] TargetData data)
        {
            List<TargetData> targets = await _service.LoadTargets(User.Identity.Name, data);

            return targets;
        }

        [HttpPost]
        [Route("AddTarget")]
        public async Task AddSchedule([FromBody] TargetData data)
        {
            await _service.AddTarget(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("EditTarget")]
        public async Task EditSchedule([FromBody] TargetData data)
        {
            await _service.EditTarget(data);
        }

        [HttpPost]
        [Route("RemoveTarget")]
        public async Task RemoveSchedule([FromBody] TargetData data)
        {
            await _service.RemoveTarget(data);
        }
        
    }
}