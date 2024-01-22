using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly GrupoVidaBrasilDbContext _RepositoryContext;
        protected readonly DbSet<T> _Entity;


        public BaseRepository(
            GrupoVidaBrasilDbContext repositoryContext)
        {
            _RepositoryContext = repositoryContext;
            _Entity = _RepositoryContext.Set<T>();
        }

        public virtual async Task<IEnumerable<T>> FindAllAsync()
        {
            var entity = await _Entity.ToListAsync();
            var entityAreNotDeleted = _RepositoryContext.Set<T>().Where(entity => !entity.IsDeleted);
            return entityAreNotDeleted;
        }

        public virtual async Task<T?> FindById(long id)
        {
            return await _RepositoryContext.Set<T>().FirstOrDefaultAsync(entity =>
           entity.Id == id && !entity.IsDeleted);
        }

        public virtual async Task CreateAsync(T entity)
        {
            await _RepositoryContext.AddAsync(entity);
            await _RepositoryContext.SaveChangesAsync();
        }

        public virtual async Task Update(T entity)
        {
            _RepositoryContext.Update(entity);
            await _RepositoryContext.SaveChangesAsync();
        }

        public virtual async Task Delete(T entity)
        {
            var entityFound = _RepositoryContext.Entry<T>(entity).Entity;
            entityFound.IsDeleted = true;
            entityFound.DeletedDate = DateTime.Now;

            _RepositoryContext.Update(entityFound);
            await _RepositoryContext.SaveChangesAsync();
        }
    }
}
