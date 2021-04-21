using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingStatistic <T> : Profile
    {
        public MappingStatistic()
        {
            CreateMap<Statistic, T>();
            CreateMap<T, Statistic>();
        }
    }
}