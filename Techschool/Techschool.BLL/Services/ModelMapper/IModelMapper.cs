namespace Techschool.BLL.Services
{
    public interface IModelMapper
    {
        OUT MapTo<IN, OUT>(IN innerModel);
    }
}
