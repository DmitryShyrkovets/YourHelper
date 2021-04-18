using System;
using AutoMapper;
using Repository;

namespace Mapping
{
    public class MappingFinance <T> : Profile
    {
        public MappingFinance()
        {
            CreateMap<Finance, T>();
            CreateMap<T, Finance>();
        }
    }
}