using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingWellBeing <T> : Profile
    {
        public MappingWellBeing()
        {
            CreateMap<WellBeing, T>();
            CreateMap<T, WellBeing>();
        }
    }
}