using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingMood <T> : Profile
    {
        public MappingMood()
        {
            CreateMap<Mood, T>();
            CreateMap<T, Mood>();
        }
    }
}