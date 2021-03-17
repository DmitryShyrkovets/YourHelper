using System;
using System.Collections.Generic;
using YourHelper.Models;

namespace SelfHelperRE
{
    public class DiaryDateComparer : IEqualityComparer<DiaryData>
    {
        bool IEqualityComparer<DiaryData>.Equals(DiaryData x, DiaryData y)
        {
            if (Convert.ToDateTime(x.DateTime).Date == Convert.ToDateTime(y.DateTime).Date)
                return true;

            return false;
        }

        int IEqualityComparer<DiaryData>.GetHashCode(DiaryData obj)
        {
            return 0;
        }
    }
}
