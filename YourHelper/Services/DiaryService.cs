using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class DiaryService<T>
    {
        private readonly IDiary<Diary> _service;
        private readonly IMapper _mapper;
        
        public DiaryService(IDiary<Diary> service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        
        public async Task<int> TryAddEntry(T obj, string user)
        {
            try
            {
                Diary diary = _mapper.Map<Diary>(obj);

                return await _service.AddEntry(diary, user);
                
            }
            catch (System.Exception ex)
            {
                return -1;
            }
        }
        
        public async Task<List<T>> TryGetDates(string user)
        {
            try
            {
                List<Diary> diary = await _service.GetDates(user);

                List<T> result = new List<T>();

                foreach (var item in diary)
                {
                    result.Add(_mapper.Map<T>(item));
                }

                return result;
            }
            catch (System.Exception)
            {
                return null;
            }
        }
        
        public async Task<List<T>> TryGetEntries(T obj, string user)
        {
            try
            {
                Diary diary = _mapper.Map<Diary>(obj);

                List<Diary> diaryList = await _service.GetEntries(diary, user);

                List<T> result = new List<T>();

                foreach (var item in diaryList)
                {
                    result.Add(_mapper.Map<T>(item));
                }

                return result;
            }
            catch (System.Exception ex)
            {
                return null;
            }
        }
        
        public async Task<int> TryRemoveEntry(T obj)
        {
            try
            {
                Diary diary = _mapper.Map<Diary>(obj);

                return await _service.RemoveEntry(diary);

            }
            catch (System.Exception ex)
            {
                return -1;
            }
        }
        
        public async Task<int> TryEditEntry(T obj)
        {
            try
            {
                Diary diary = _mapper.Map<Diary>(obj);

                return await _service.EditEntry(diary);

            }
            catch (System.Exception ex)
            {
                return -1;
            }
        }
    }
}