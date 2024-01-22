using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories.PeopleSpecialities
{
    public interface IPeopleSpecialitiesRepository : IBaseRepository<PeopleSpeciality>
    {
        IEnumerable<PeopleSpeciality> GetPeopleBySpeciality(long specialityId);

        IEnumerable<PeopleSpeciality> GetSpecialityByPeople(long peopleId);
    }
}
