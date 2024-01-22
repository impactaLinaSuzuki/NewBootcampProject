using MbaImpacta.GrupoVidaBrasil.Core.Models;
using Microsoft.EntityFrameworkCore;
using Profile = MbaImpacta.GrupoVidaBrasil.Core.Models.Profile;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore
{
    public class GrupoVidaBrasilDbContext : DbContext
    {
        public GrupoVidaBrasilDbContext(DbContextOptions<GrupoVidaBrasilDbContext> options) : base(options)
        {
        }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<People> Peoples { get; set; }

        public DbSet<Patient> Patients { get; set; }
        
        public DbSet<Speciality> Specialities { get; set; }
        
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        
        public DbSet<ServiceStatus> ServiceStatuses { get; set; }
        
        public DbSet<User> Users { get; set; }
        
        public DbSet<PeopleSpeciality> PeopleSpecialities { get; set; }
    }
}
