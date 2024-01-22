using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Profiles;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Specialities;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.ServiceStatuses
{
    public class SpecialityRepository : BaseRepository<Speciality>, ISpecialityRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public SpecialityRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

    }
}
