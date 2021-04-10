using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class TargetService<T>
    {
        private readonly ITarget<Target> _service;
        private readonly IMapper _mapper;
        
        public TargetService(ITarget<Target> service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public async Task<List<T>> LoadTargets(string user, T obj)
        {
            Target target = _mapper.Map<Target>(obj);
            
            List<Target> targets = await _service.GetTargets(user, target);

            List<T> result = new List<T>();

            foreach (var item in targets)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<int> AddTarget(T obj, string user)
        {
            Target target = _mapper.Map<Target>(obj);

            return await _service.AddTarget(target, user);
        }
        
        public async Task<int> EditTarget(T obj)
        {
            Target target = _mapper.Map<Target>(obj);

            return await _service.EditTarget(target);
        }

        public async Task<int> RemoveTarget(T obj)
        {
            Target target = _mapper.Map<Target>(obj);

            return await _service.RemoveTarget(target);
        }
    }
}