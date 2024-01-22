using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories
{
    public class AgendamentoRepository : BaseRepository<Agendamento>, IAgendamentoRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public AgendamentoRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

    }
}
