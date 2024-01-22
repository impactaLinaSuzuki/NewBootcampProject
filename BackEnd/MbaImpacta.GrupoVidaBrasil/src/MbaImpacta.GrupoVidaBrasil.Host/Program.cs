using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.ProfileMappings;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Histories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Patientes;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.PeopleSpecialities;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Profiles;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.ServiceStatuses;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Specialities;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.MedicalRecords;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Patients;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Peoples;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.PeopleSpecialities;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Profiles;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.ServiceStatuses;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Repositories.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace MbaImpacta.GrupoVidaBrasil.Host
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            string connectionMysql = builder.Configuration.GetConnectionString("Default");

            builder.Services.AddDbContext<GrupoVidaBrasilDbContext>(
                options =>
                {
                    options.UseMySql(connectionMysql, ServerVersion.AutoDetect(connectionMysql));
                    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                });
                    
             
            builder.Services.AddControllers();
            //builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            builder.Services.AddScoped<IBaseRepository<Profile>, BaseRepository<Profile>>();
            builder.Services.AddScoped<IBaseRepository<People>, BaseRepository<People>>();
            builder.Services.AddScoped<IBaseRepository<Patient>, BaseRepository<Patient>>();
            builder.Services.AddScoped<IBaseRepository<Speciality>, BaseRepository<Speciality>>();
            builder.Services.AddScoped<IBaseRepository<MedicalRecord>, BaseRepository<MedicalRecord>>();
            builder.Services.AddScoped<IBaseRepository<ServiceStatus>, BaseRepository<ServiceStatus>>();
            builder.Services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            builder.Services.AddScoped<IBaseRepository<PeopleSpeciality>, BaseRepository<PeopleSpeciality>>();

            builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
            builder.Services.AddScoped<IPeopleRepository, PeopleRepository>();
            builder.Services.AddScoped<IPatientRepository, PatientRepository>();
            builder.Services.AddScoped<ISpecialityRepository, SpecialityRepository>();
            builder.Services.AddScoped<IMedicalRecordRepository, MedicalRecordRepository>();
            builder.Services.AddScoped<IServiceStatusRepository, ServiceStatusRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IPeopleSpecialitiesRepository, PeopleSpecialitiesRepository>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options => 
                options.SwaggerDoc("V1", new OpenApiInfo 
                                    { 
                                        Title = "Grupo Vida Brasil - API", Description = "Impacta Bootcamp", Version = "v1"
                                    })
                );

            builder.Services.AddAutoMapper(typeof(Program));
            builder.Services.AddAutoMapper(typeof(EntityMapping));

            var app = builder.Build();

            // Configurar a política de CORS
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyHeader();
                options.AllowAnyMethod();
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/V1/swagger.json", "Grupo Vida Brasil - API v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}