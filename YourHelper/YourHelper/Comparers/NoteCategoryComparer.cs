using SelfHelperRE;
using System.Collections.Generic;
using YourHelper.Models;

namespace SelfHelper.Comparers
{
    public class NoteCategoryComparer : IEqualityComparer<NoteData>
    {
        bool IEqualityComparer<NoteData>.Equals(NoteData x, NoteData y)
        {
            if (x.Category == y.Category)
                return true;

            return false;
        }

        int IEqualityComparer<NoteData>.GetHashCode(NoteData obj)
        {
            return 0;
        }
    }
}
