using System;
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
    [Route("Finance")]
    public class FinanceController: Controller
    {
        private readonly FinanceService<FinanceData> _service;

        public FinanceController(IMapper mapper, IFinance<Finance> service)
        {
            _service = new FinanceService<FinanceData>(service, mapper);
        }
        
        [HttpGet]
        [Route("LoadCategories")]
        public async Task<IEnumerable<FinanceData>> LoadCategories()
        {
            IEnumerable<FinanceData> result = await _service.LoadCategories(User.Identity.Name);

            return result.Distinct(new FinanceCategoryComparer());
        }

        [HttpPost]
        [Route("LoadFinances")]
        public async Task<List<FinanceData>> LoadFinances([FromBody] FinanceCatcher data)
        {
            FinanceData obj = new FinanceData { Category = data.Category, Operation = data.Operation};

            bool dateFilter = Convert.ToBoolean(data.DateFilter);
            DateTime dateStart = Convert.ToDateTime(data.DateStart);
            DateTime dateEnd = Convert.ToDateTime(data.DateEnd);
            
            List<FinanceData> finances = await _service.LoadFinances(obj, User.Identity.Name, dateFilter, dateStart, dateEnd);

            return finances;
        }
        
        [HttpPost]
        [Route("LoadItogs")]
        public async Task<List<FinanceData>> LoadItogs([FromBody] FinanceCatcher data)
        {
            FinanceData obj = new FinanceData { Category = data.Category, Operation = data.Operation};

            bool dateFilter = Convert.ToBoolean(data.DateFilter);
            DateTime dateStart = Convert.ToDateTime(data.DateStart);
            DateTime dateEnd = Convert.ToDateTime(data.DateEnd);
            
            List<FinanceData> finances = await _service.LoadItogs(obj, User.Identity.Name, dateFilter, dateStart, dateEnd);

            return finances;
        }

        [HttpPost]
        [Route("AddFinance")]
        public async Task AddFinance([FromBody] FinanceData data)
        {
            data.Money = data.Money.Replace('.', ',');
            await _service.AddFinance(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("EditFinance")]
        public async Task EditFinance([FromBody] FinanceData data)
        {
            data.Money = data.Money.Replace('.', ',');
            await _service.EditFinance(data);
        }

        [HttpPost]
        [Route("RemoveFinance")]
        public async Task RemoveFinance([FromBody] FinanceData data)
        {
            await _service.RemoveFinance(data);
        }
        
    }
}