using SelfHelperRE;
using System.Collections.Generic;
using YourHelper.Models;

namespace SelfHelper.Comparers
{
    public class SkillCategoryComparer : IEqualityComparer<SkillData>
    {
        bool IEqualityComparer<SkillData>.Equals(SkillData x, SkillData y)
        {
            if (x.Category == y.Category)
                return true;

            return false;
        }

        int IEqualityComparer<SkillData>.GetHashCode(SkillData obj)
        {
            return 0;
        }
    }
}
