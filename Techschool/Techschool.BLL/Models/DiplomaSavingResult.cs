using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class DiplomaSavingResult
    {
        public bool Successed { get; set; }
        public bool? IsSameNumberExist { get; set; }

        public DiplomaSavingResult()
        {
            Successed = true;
        }

        public DiplomaSavingResult(bool? isSameNumberExist = null)
        {
            Successed = false;
            IsSameNumberExist = isSameNumberExist;
        }
    }
}
