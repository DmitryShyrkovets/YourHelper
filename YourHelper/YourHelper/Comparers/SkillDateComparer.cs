using System;
using System.Collections.Generic;
using YourHelper.Models;

namespace SelfHelperRE
{
    public class SkillDateComparer : IEqualityComparer<SkillData>
    {
        bool IEqualityComparer<SkillData>.Equals(SkillData x, SkillData y)
        {
            if (Convert.ToDateTime(x.Date).Date == Convert.ToDateTime(y.Date).Date)
                return true;

            return false;
        }

        int IEqualityComparer<SkillData>.GetHashCode(SkillData obj)
        {
            return 0;
        }
    }
}
