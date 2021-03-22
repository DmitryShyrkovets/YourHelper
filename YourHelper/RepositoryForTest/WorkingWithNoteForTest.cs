using System;
using System.Collections.Generic;
using System.Linq;
using Repository;
using DbModels;
using System.Threading.Tasks;

namespace RepositoryForTest
{
    public class WorkingWithNoteForTest : INote<Note>
    {
        AplicationContextForTest context;

        public WorkingWithNoteForTest()
        {
            context = new AplicationContextForTest();
        }

        public async Task<int> AddNote(Note obj, string user)
        {
            User user1 = context.Users.FirstOrDefault(e => e.Email == user);

            if (user1 != null)
            {
                try
                {
                    obj.Id = context.Notes.Count();
                    
                    obj.User = user1;

                    context.Notes.Add(obj);

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
            Note note = context.Notes.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    note.Text = obj.Text;
                    note.Category = obj.Category;
                    note.Title = obj.Title;
                    note.Important = obj.Important;

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
            Note note = context.Notes.FirstOrDefault(e => e.Id == obj.Id);

            if (note != null)
            {
                try
                {
                    context.Notes.Remove(note);

                    return 1;
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return -1;
        }

        public async Task<List<Note>> GetNotes(Note obj, string user)
        {
            List<Note> result;

            if (obj.Category == "Все")
            {
                if (obj.Important == false)
                {
                    result = context.Notes
                        .Where(e => e.User.Email == user)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToList();   
                }
                else
                {
                    result = context.Notes
                        .Where(e => e.User.Email == user && e.Important == true)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToList();
                }
            }
            else
            {
                if (obj.Important == false)
                {
                    result = context.Notes
                        .Where(e => e.User.Email == user && e.Category == obj.Category)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToList();   
                }
                else
                {
                    result = context.Notes
                        .Where(e => e.User.Email == user && e.Important == true && e.Category == obj.Category)
                        .Select(e => new Note { Text = e.Text, Title = e.Title, Id = e.Id, Category = e.Category, Important = e.Important }).ToList();
                }
            }

            return result;
        }

        public async Task<List<Note>> GetCategories(string user)
        {
            List<Note> result = context.Notes.
                Where(e => e.User.Email == user).Select(e => new Note { Id = e.Id, Category = e.Category }).ToList();

            return result;
        }
    }
}