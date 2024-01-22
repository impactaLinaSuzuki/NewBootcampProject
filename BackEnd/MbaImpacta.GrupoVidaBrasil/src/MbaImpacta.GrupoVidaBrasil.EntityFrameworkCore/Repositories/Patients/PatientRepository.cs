using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Patientes;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Patients
{
    public class PatientRepository : BaseRepository<Patient>, IPatientRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public PatientRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

    }
}
