using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.PeopleSpecialities;
using Microsoft.EntityFrameworkCore;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.PeopleSpecialities
{
    public class PeopleSpecialitiesRepository : BaseRepository<PeopleSpeciality>, IPeopleSpecialitiesRepository
    {
        private readonly GrupoVidaBrasilDbContext _DbContext;
        private readonly AutoMapper.IMapper _Mapper;

        public PeopleSpecialitiesRepository(
            AutoMapper.IMapper mapper,
            GrupoVidaBrasilDbContext repositoryContext) : base(repositoryContext)
        {
            _DbContext = repositoryContext;
            _Mapper = mapper;
        }

        public IEnumerable<PeopleSpeciality> GetPeopleBySpeciality(long specialityId)
        {
            var allPeopleSpecialities = _DbContext.PeopleSpecialities.Include("People").Include("Speciality")
                .Where(p => p.SpecialityId == specialityId);

            return allPeopleSpecialities;
        }

        public IEnumerable<PeopleSpeciality> GetSpecialityByPeople(long peopleId)
        {
            var allPeopleSpecialities = _DbContext.PeopleSpecialities.Include("People").Include("Speciality")
                .Where(ps => ps.PeopleId == peopleId);

            return allPeopleSpecialities;
        }

        public override async Task<IEnumerable<PeopleSpeciality>> FindAllAsync()
        {
            return await _Entity.Include("People").Include("Speciality").ToListAsync();
        }

        public override async Task<PeopleSpeciality?> FindById(long id)
        {
            return _Entity.Include("People").Include("Speciality").FirstOrDefault(e => e.Id == id && !e.IsDeleted);
        }

        public override async Task Delete(PeopleSpeciality entity)
        {
            var entityFound = _Entity.FirstOrDefault(e => e.Id == entity.Id);
            entityFound.IsDeleted = true;
            entityFound.DeletedDate = DateTime.Now;

            _RepositoryContext.Update(entityFound);
            await _RepositoryContext.SaveChangesAsync();
        }
    }
}
