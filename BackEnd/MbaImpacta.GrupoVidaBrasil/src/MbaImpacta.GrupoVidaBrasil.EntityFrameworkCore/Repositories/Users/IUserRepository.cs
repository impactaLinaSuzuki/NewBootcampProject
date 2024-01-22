using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> FindByIdPeople(long idPeople);
    }
}
