using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Microsoft.AspNetCore.Mvc;
using Repository;
using SelfHelper.Comparers;
using SelfHelperRE;
using Services;
using YourHelper.Models;

namespace YourHelper.Controllers
{
    [Route("Statistic")]
    public class StatisticController: Controller
    {
        private readonly StatisticService<StatisticData> _service;

        public StatisticController(IMapper mapper, IStatistic<Statistic> service)
        {
            _service = new StatisticService<StatisticData>(service, mapper);
        }
        
        [HttpPost]
        [Route("LoadInfo")]
        public async Task<StatisticData> LoadInfo([FromBody] StatisticData data)
        {
            StatisticData result = await _service.LoadInfo(data, User.Identity.Name);

            return result;
        }
        
    }
}