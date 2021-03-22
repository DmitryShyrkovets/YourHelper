using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbModels;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class WorkingWithNote : INote<Note>
    {
        private readonly ApplicationContext _context;

        public WorkingWithNote(ApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<int> AddNote(Note obj, string user)
        {
            DateTime dateTime = DateTime.Now;

            User user1 = _context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    _context.Notes.Add(new Note
                    {
                        Text = obj.Text,
                        DateTime = dateTime,
                        User = user1,
                        Title = obj.Title,
                        Category = obj.Category,
                        Important = obj.Important
                    });

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return -1;
        }

        public async Task<int> EditNote(Note obj)
        {
            Note note = _context.Notes.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    note.Text = obj.Text;
                    note.Category = obj.Category;
                    note.Title = obj.Title;
                    note.Important = obj.Important;

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async Task<int> RemoveNote(Note obj)
        {
            Note note = _context.Notes.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    _context.Notes.Remove(note);

                    await _context.SaveChangesAsync();

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }

            }

            return -1;
        }

        public async  Task<List<Note>> GetNotes(Note obj, string user)
        {
            List<Note> result;

            if (obj.Category == "Все")
            {
                if (obj.Important == false)
                {
                    result = await _context.Notes.AsNoTracking()
                        .Where(e => e.User.Email == user)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToListAsync();   
                }
                else
                {
                    result = await _context.Notes.AsNoTracking()
                        .Where(e => e.User.Email == user && e.Important == true)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToListAsync();
                }
            }
            else
            {
                if (obj.Important == false)
                {
                    result = await _context.Notes.AsNoTracking()
                        .Where(e => e.User.Email == user && e.Category == obj.Category)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToListAsync();   
                }
                else
                {
                    result = await _context.Notes.AsNoTracking()
                        .Where(e => e.User.Email == user && e.Important == true && e.Category == obj.Category)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToListAsync();
                }
            }

            return result;
        }

        public async Task<List<Note>> GetCategories(string user)
        {
            List<Note> result = await _context.Notes.AsNoTracking().
                Where(e => e.User.Email == user).Select(e => new Note { Id = e.Id, Category = e.Category }).ToListAsync();

            return result;
        }
    }
}