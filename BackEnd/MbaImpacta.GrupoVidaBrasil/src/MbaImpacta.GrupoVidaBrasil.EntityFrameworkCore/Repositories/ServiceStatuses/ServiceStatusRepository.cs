using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.ServiceStatuses;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.ServiceStatuses
{
    public class ServiceStatusRepository : BaseRepository<ServiceStatus>, IServiceStatusRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public ServiceStatusRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

    }
}
