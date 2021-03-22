using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingNote <T> : Profile
    {
        public MappingNote()
        {
            CreateMap<Note, T>();
            CreateMap<T, Note>();
        }
    }
}