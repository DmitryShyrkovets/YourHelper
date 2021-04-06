using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingSchedule <T> : Profile
    {
        public MappingSchedule()
        {
            CreateMap<Schedule, T>();
            CreateMap<T, Schedule>();
        }
    }
}