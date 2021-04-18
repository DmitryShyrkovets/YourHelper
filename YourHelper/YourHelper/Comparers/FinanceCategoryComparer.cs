using SelfHelperRE;
using System.Collections.Generic;
using YourHelper.Models;

namespace SelfHelper.Comparers
{
    public class FinanceCategoryComparer : IEqualityComparer<FinanceData>
    {
        bool IEqualityComparer<FinanceData>.Equals(FinanceData x, FinanceData y)
        {
            if (x.Category == y.Category)
                return true;

            return false;
        }

        int IEqualityComparer<FinanceData>.GetHashCode(FinanceData obj)
        {
            return 0;
        }
    }
}
