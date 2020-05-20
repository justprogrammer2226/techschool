using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class SavingResult<T>
    {
        public bool Successed { get; set; }
        public bool IsExist { get; set; }
        public T Saved { get; set; }

        public SavingResult(T saved)
        {
            Successed = true;
            Saved = saved;
        }

        public SavingResult(bool isExist)
        {
            Successed = !isExist;
            IsExist = isExist;
        }
    }
}
