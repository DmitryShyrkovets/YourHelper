using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class FinanceService<T>
    {
        private readonly IFinance<Finance> _repository;
        private readonly IMapper _mapper;
        
        public FinanceService(IFinance<Finance> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        
        public async Task<List<T>> LoadCategories(string user)
        {
            List<Finance> finances = await _repository.GetCategories(user);

            List<T> result = new List<T>();

            foreach (var item in finances)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }

        public async Task<List<T>> LoadFinances(T obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd)
        {
            Finance finance = _mapper.Map<Finance>(obj);

            List<Finance> finances = await _repository.GetFinances(finance, user, dateFilter, dateStart, dateEnd);

            List<T> result = new List<T>();

            foreach (var item in finances)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }
        
        public async Task<List<T>> LoadItogs(T obj, string user, bool dateFilter, DateTime dateStart, DateTime dateEnd)
        {
            Finance finance = _mapper.Map<Finance>(obj);

            List<Finance> itogs = await _repository.GetItogs(finance, user, dateFilter, dateStart, dateEnd);

            List<T> result = new List<T>();

            foreach (var item in itogs)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }

        public async Task<int> AddFinance(T obj, string user)
        {
			try
			{
                
                Finance finance = _mapper.Map<Finance>(obj);

                return await _repository.AddFinance(finance, user);
            }
			catch (System.Exception ex)
			{

                return -1;
            }
        }
        
        public async Task<int> EditFinance(T obj)
        {
            Finance finance = _mapper.Map<Finance>(obj);

            return await _repository.EditFinance(finance);
        }

        public async Task<int> RemoveFinance(T obj)
        {
            Finance finance = _mapper.Map<Finance>(obj);

            return await _repository.RemoveFinance(finance);
        }
    }
}