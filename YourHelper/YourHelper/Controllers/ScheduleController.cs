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
    [Route("Schedule")]
    public class ScheduleController: Controller
    {
        private readonly ScheduleService<ScheduleData> _service;

        public ScheduleController(IMapper mapper, ISchedule<Schedule> service)
        {
            _service = new ScheduleService<ScheduleData>(service, mapper);
        }
        
        [HttpGet]
        [Route("LoadSchedules")]
        public async Task<List<ScheduleData>> LoadSchedules()
        {
            List<ScheduleData> schedules = await _service.LoadSchedules(User.Identity.Name);

            return schedules;
        }
        
        [HttpGet]
        [Route("LoadSchedulesInfo")]
        public async Task<List<ScheduleData>> LoadSchedulesInfo()
        {
            List<ScheduleData> schedulesInfo = await _service.GetSchedulesInfo(User.Identity.Name);

            return schedulesInfo;
        }
        
        [HttpPost]
        [Route("AddSchedule")]
        public async Task<IActionResult> AddSchedule([FromBody] ScheduleData data)
        {
            if (await _service.AddSchedule(data, User.Identity.Name) == 1)
            {
                return Json(new { type = "ok" });
            }
            else
            {
                return Json(new { error = "Выбранный период времени уже занят", type = "bad" });
            }
            
        }
        
        [HttpPost]
        [Route("EditSchedule")]
        public async Task<IActionResult> EditSchedule([FromBody] ScheduleData data)
        {
            if (await _service.EditSchedule(data) == 1)
            {
                return Json(new { type = "ok" });
            }
            else
            {
                return Json(new { error = "Выбранный период времени уже занят", type = "bad" });
            }
        }

        [HttpPost]
        [Route("RemoveSchedule")]
        public async Task RemoveSchedule([FromBody] ScheduleData data)
        {
            await _service.RemoveSchedule(data);
        }
        
    }
}