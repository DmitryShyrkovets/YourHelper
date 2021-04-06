using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class ScheduleService<T>
    {
        private readonly ISchedule<Schedule> _service;
        private readonly IMapper _mapper;
        
        public ScheduleService(ISchedule<Schedule> service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public async Task<List<T>> LoadSchedules(string user)
        {
            List<Schedule> notes = await _service.GetSchedules(user);

            List<T> result = new List<T>();

            foreach (var item in notes)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<List<T>> GetSchedulesInfo(string user)
        {
            List<Schedule> schedulesInfo = await _service.GetSchedulesInfo(user);
            
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

            return await _service.AddSchedule(schedule, user);
        }
        
        public async Task<int> EditSchedule(T obj)
        {
            Schedule schedule = _mapper.Map<Schedule>(obj);

            return await _service.EditSchedule(schedule);
        }

        public async Task<int> RemoveSchedule(T obj)
        {
            Schedule schedule = _mapper.Map<Schedule>(obj);

            return await _service.RemoveSchedule(schedule);
        }
    }
}