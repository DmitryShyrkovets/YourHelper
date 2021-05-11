using System;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class MoodService<T>
    {
        private readonly IMood<Mood> _repository;
        private readonly IMapper _mapper;
        
        public MoodService(IMood<Mood> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        
        public async Task<T> GetMood(T obj, string user)
        {
            Mood mood = _mapper.Map<Mood>(obj);

            mood =  await _repository.GetMood(mood, user);
            
            return _mapper.Map<T>(mood);
        }

        public async Task<int> SetMood(T obj, string user)
        {
            Mood mood = _mapper.Map<Mood>(obj);

            return await _repository.SetMood(mood, user);
        }
    }
}