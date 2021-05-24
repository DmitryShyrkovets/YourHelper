using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class SkillService<T>
    {
        private readonly ISkill<Skill> _repository;
        private readonly IMapper _mapper;
        
        public SkillService(ISkill<Skill> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        
        public async Task<List<T>> LoadCategories(string user)
        {
            List<Skill> skills = await _repository.GetCategories(user);

            List<T> result = new List<T>();

            foreach (var item in skills)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<List<T>> LoadDates(string user)
        {
            try
            {
                List<Skill> skills = await _repository.GetDates(user);

                List<T> result = new List<T>();

                foreach (var item in skills)
                {
                    result.Add(_mapper.Map<T>(item));
                }

                return result;
            }
            catch (System.Exception)
            {
                return null;
            }
        }

        public async Task<List<T>> LoadSkills(T obj, string user)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            List<Skill> skills = await _repository.GetSkills(skill, user);

            List<T> result = new List<T>();

            foreach (var item in skills)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<List<T>> LoadProcessSkills(T obj, string user)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            List<Skill> skills = await _repository.GetProcessSkills(skill, user);

            List<T> result = new List<T>();

            foreach (var item in skills)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }

        public async Task<int> AddSkill(T obj)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            return await _repository.AddSkill(skill);
        }
        
        public async Task<int> AddProcessSkill(T obj, string user)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            return await _repository.AddProcessSkill(skill, user);
        }
        
        public async Task<int> EditSkill(T obj)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            return await _repository.EditSkill(skill);
        }

        public async Task<int> RemoveSkill(T obj)
        {
            Skill skill = _mapper.Map<Skill>(obj);

            return await _repository.RemoveSkill(skill);
        }
    }
}