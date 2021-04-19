using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbModels;
using Repository;

namespace Services
{
    public class NoteService<T>
    {
        private readonly INote<Note> _repository;
        private readonly IMapper _mapper;
        
        public NoteService(INote<Note> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        
        public async Task<List<T>> LoadCategories(string user)
        {
            List<Note> notes = await _repository.GetCategories(user);

            List<T> result = new List<T>();

            foreach (var item in notes)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }

        public async Task<List<T>> LoadNotes(T obj, string user)
        {
            Note note = _mapper.Map<Note>(obj);

            List<Note> notes = await _repository.GetNotes(note, user);

            List<T> result = new List<T>();

            foreach (var item in notes)
            {
                result.Add(_mapper.Map<T>(item));
            }

            return result;
        }

        public async Task<int> AddNote(T obj, string user)
        {
            Note note = _mapper.Map<Note>(obj);

            return await _repository.AddNote(note, user);
        }
        
        public async Task<int> EditNote(T obj)
        {
            Note note = _mapper.Map<Note>(obj);

            return await _repository.EditNote(note);
        }

        public async Task<int> RemoveNote(T obj)
        {
            Note note = _mapper.Map<Note>(obj);

            return await _repository.RemoveNote(note);
        }
    }
}