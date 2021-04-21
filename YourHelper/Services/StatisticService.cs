using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class StatisticService<T>
    {
        private readonly IStatistic<Statistic> _repository;
        private readonly IMapper _mapper;
        
        public StatisticService(IStatistic<Statistic> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<T> LoadInfo(T obj, string user)
        {
            Statistic statistic = _mapper.Map<Statistic>(obj);

            return _mapper.Map<T>(await _repository.GetInfo(statistic, user));
        }
    }
}