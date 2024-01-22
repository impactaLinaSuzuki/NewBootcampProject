using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Histories;
using Microsoft.EntityFrameworkCore;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.MedicalRecords
{
    public class MedicalRecordRepository : BaseRepository<MedicalRecord>, IMedicalRecordRepository
    {
        private readonly AutoMapper.IMapper _Mapper;

        public MedicalRecordRepository(
            IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _Mapper = mapper;
        }

        public async Task<List<MedicalRecord>> FindByIdPeople(long idPatient)
        {
            return await _Entity.Where(e => e.PatientId == idPatient && !e.IsDeleted).ToListAsync();
        }
    }
}
