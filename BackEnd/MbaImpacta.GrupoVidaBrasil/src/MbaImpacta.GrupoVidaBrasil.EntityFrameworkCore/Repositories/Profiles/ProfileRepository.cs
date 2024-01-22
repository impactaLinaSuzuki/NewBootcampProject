using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Profiles;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Profiles
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public ProfileRepository(
            GrupoVidaBrasilDbContext repositoryContext,
            AutoMapper.IMapper mapper) : base(repositoryContext)
        {
            _Mapper = mapper;
        }
    }
}
