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
    [Route("Skill")]
    public class SkillController: Controller
    {
        private readonly SkillService<SkillData> _service;

        public SkillController(IMapper mapper, ISkill<Skill> service)
        {
            _service = new SkillService<SkillData>(service, mapper);
        }
        
        [HttpGet]
        [Route("LoadCategories")]
        public async Task<IEnumerable<SkillData>> LoadCategories()
        {
            IEnumerable<SkillData> result = await _service.LoadCategories(User.Identity.Name);

            return result.Distinct(new SkillCategoryComparer());
        }
        
        [Route("GetDates")]
        public async Task<IEnumerable<SkillData>> GetDates()
        {
            IEnumerable<SkillData> result = await _service.LoadDates(User.Identity.Name);
            
            return result.Distinct(new SkillDateComparer());
        }

        [HttpPost]
        [Route("LoadSkills")]
        public async Task<List<SkillData>> LoadSkills([FromBody] SkillData data)
        {
            List<SkillData> skills = await _service.LoadSkills(data, User.Identity.Name);
            
            return skills;
        }
        
        [HttpPost]
        [Route("LoadProcessSkills")]
        public async Task<List<SkillData>> LoadProcessSkills([FromBody] SkillData data)
        {
            List<SkillData> skills = await _service.LoadProcessSkills(data, User.Identity.Name);
            
            return skills;
        }

        [HttpPost]
        [Route("AddSkill")]
        public async Task AddSkill([FromBody] SkillData data)
        {
            await _service.AddSkill(data);
        }
        
        [HttpPost]
        [Route("AddProcessSkill")]
        public async Task AddProcessSkill([FromBody] SkillData data)
        {
            await _service.AddProcessSkill(data, User.Identity.Name);
        }
        
        [HttpPost]
        [Route("EditSkill")]
        public async Task EditSkill([FromBody] SkillData data)
        {
            await _service.EditSkill(data);
        }

        [HttpPost]
        [Route("RemoveSkill")]
        public async Task RemoveSkill([FromBody] SkillData data)
        {
            await _service.RemoveSkill(data);
        }
        
    }
}