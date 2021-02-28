using AutoMapper;
using DbModels;
using Repository;
using System.Threading.Tasks;

namespace Services
{
    public class UserService<T>
    {
        private readonly IUser<User> _service;
        private readonly IMapper _mapper;
        public UserService(IUser<User> service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public async Task<int> TryAddUser(T obj)
        {
            try
            {
                User user = _mapper.Map<User>(obj);

                return await _service.AddUser(user);
            }
            catch (System.Exception)
            {
                return -1;
            }
        }
        public async Task<bool> CheckUser(T obj, string param)
        {
            try
            {
                User user = _mapper.Map<User>(obj);

                return await _service.CheckUser(user, param);
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<T> TryGetData(T obj)
        {

            User user = _mapper.Map<User>(obj);

            user = await _service.GetData(user);

            return _mapper.Map<T>(user);

        }
    }
}
