using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingSkill <T> : Profile
    {
        public MappingSkill()
        {
            CreateMap<Skill, T>();
            CreateMap<T, Skill>();
        }
    }
}