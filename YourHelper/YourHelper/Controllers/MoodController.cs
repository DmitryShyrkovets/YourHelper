using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Services;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("Mood")]
    public class MoodController: Controller
    {
        private readonly MoodService<MoodData> _service;

        public MoodController(IMapper mapper, IMood<Mood> service)
        {
            _service = new MoodService<MoodData>(service, mapper);
        }

        [HttpPost]
        [Route("GetMood")]
        public async Task<MoodData> GetMood([FromBody] MoodData data)
        {
            return await _service.GetMood(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("SetMood")]
        public async Task SetMood([FromBody] MoodData data)
        {
            await _service.SetMood(data, User.Identity.Name);
        }

    }
}