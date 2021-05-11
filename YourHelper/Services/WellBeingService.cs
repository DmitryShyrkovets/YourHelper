using System;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class WellBeingService<T>
    {
        private readonly IWellBeing<WellBeing> _repository;
        private readonly IMapper _mapper;
        
        public WellBeingService(IWellBeing<WellBeing> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        
        public async Task<T> GetWellBeing(T obj, string user)
        {
            WellBeing wellBeing = _mapper.Map<WellBeing>(obj);

            wellBeing =  await _repository.GetWellBeing(wellBeing, user);
            
            return _mapper.Map<T>(wellBeing);
        }

        public async Task<int> SetWellBeing(T obj, string user)
        {
            WellBeing wellBeing = _mapper.Map<WellBeing>(obj);

            return await _repository.SetWellBeing(wellBeing, user);
        }
    }
}