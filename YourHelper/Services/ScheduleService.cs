using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class ScheduleService<T>
    {
        private readonly ISchedule<Schedule> _repository;
        private readonly IMapper _mapper;
        
        public ScheduleService(ISchedule<Schedule> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<T>> LoadSchedules(string user)
        {
            List<Schedule> schedules = await _repository.GetSchedules(user);

            List<T> result = new List<T>();

            foreach (var item in schedules)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<List<T>> GetSchedulesInfo(string user)
        {
            List<Schedule> schedulesInfo = await _repository.GetSchedulesInfo(user);
            
            List<T> result = new List<T>();

            foreach (var item in schedulesInfo)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        public async Task<int> AddSchedule(T obj, string user)
        {
            Schedule schedule = _mapper.Map<Schedule>(obj);

            return await _repository.AddSchedule(schedule, user);
        }
        
        public async Task<int> EditSchedule(T obj)
        {
            Schedule schedule = _mapper.Map<Schedule>(obj);

            return await _repository.EditSchedule(schedule);
        }

        public async Task<int> RemoveSchedule(T obj)
        {
            Schedule schedule = _mapper.Map<Schedule>(obj);

            return await _repository.RemoveSchedule(schedule);
        }
    }
}