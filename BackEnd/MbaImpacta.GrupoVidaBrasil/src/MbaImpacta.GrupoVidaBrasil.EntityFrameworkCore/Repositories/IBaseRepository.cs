using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories
{
    public interface IBaseRepository<T> where T : IBaseEntity
    {
        Task<IEnumerable<T>> FindAllAsync();
        Task<T?> FindById(long id);
        Task CreateAsync(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}