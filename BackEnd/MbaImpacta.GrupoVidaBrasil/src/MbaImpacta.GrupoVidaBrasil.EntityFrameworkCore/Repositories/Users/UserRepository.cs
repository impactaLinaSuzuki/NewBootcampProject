using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users;
using Microsoft.EntityFrameworkCore;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Users
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public UserRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

        public async Task<User?> FindByIdPeople(long idPeople)
        {
            return await _Entity.FirstOrDefaultAsync(e => e.PeopleId == idPeople && !e.IsDeleted);
        }
    }
}
