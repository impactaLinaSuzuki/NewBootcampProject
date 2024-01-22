using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples;
using Microsoft.EntityFrameworkCore;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Peoples
{
    public class PeopleRepository : BaseRepository<People>, IPeopleRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public PeopleRepository(
            GrupoVidaBrasilDbContext repositoryContext,
            AutoMapper.IMapper mapper) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

        public override async Task<People?> FindById(long id)
        {
            return await _Entity.Include("Profile").FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        }

        public async Task<People?> FindByCpf(string cpf)
        {
            return await _Entity.FirstOrDefaultAsync(e => e.Cpf == cpf && !e.IsDeleted);
        }

        public override async Task<IEnumerable<People>> FindAllAsync()
        {
            return await _Entity.Include("Profile").ToListAsync();
        }
    }
}
