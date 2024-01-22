using MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Patients.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.ServiceStatuses.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Users.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.ProfileMappings
{
    public class EntityMapping : AutoMapper.Profile
    {
        public EntityMapping() 
        {
            CreateMap<Profile, ProfileDto>();
            CreateMap<CreateProfileDto, Profile>();
            CreateMap<UpdateProfileDto, Profile>();

            CreateMap<People, PeopleDto>();
            CreateMap<CreatePeopleDto, People>();
            CreateMap<UpdatePeopleDto, People>();

            CreateMap<Patient, PatientDto>();
            CreateMap<CreatePatientDto, Patient>();
            CreateMap<UpdatePatientDto, Patient>();

            CreateMap<Speciality, SpecialityDto>();
            CreateMap<CreateSpecialityDto, Speciality>();
            CreateMap<UpdateSpecialityDto, Speciality>();

            CreateMap<MedicalRecord, MedicalRecordDto>();
            CreateMap<CreateMedicalRecordDto, MedicalRecord>();
            CreateMap<UpdateMedicalRecordDto, MedicalRecord>();

            CreateMap<ServiceStatus, ServiceStatusDto>();
            CreateMap<CreateServiceStatusDto, ServiceStatus>();
            CreateMap<UpdateServiceStatusDto, ServiceStatus>();

            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();

            CreateMap<PeopleSpeciality, PeopleSpecialityDto>();
            CreateMap<CreatePeopleSpecialityDto, PeopleSpeciality>();
            CreateMap<UpdatePeopleSpecialityDto, PeopleSpeciality>();

            CreateMap<Profile, DropDown>()
            .ConstructUsing((source, _) => new DropDown(source.Id, source.Name));

            CreateMap<Speciality, DropDown>()
            .ConstructUsing((source, _) => new DropDown(source.Id, source.Name));
        }
    }
}
