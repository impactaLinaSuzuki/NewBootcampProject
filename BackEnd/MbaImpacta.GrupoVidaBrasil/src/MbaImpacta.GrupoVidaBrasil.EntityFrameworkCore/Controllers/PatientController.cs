using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Patients.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Patientes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _PatientRepository;
        private IMapper _Mapper;

        public PatientController(
            IPatientRepository patientRepository,
            IMapper mapper)
        {
            _PatientRepository = patientRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var patients = await _PatientRepository.FindAllAsync();

            IEnumerable<PatientDto> patientsDto = _Mapper.Map<IEnumerable<Patient>, IEnumerable<PatientDto>>(patients);

            return Ok(patientsDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            Patient? patient = await _PatientRepository.FindById(id);

            PatientDto patientDto = _Mapper.Map<Patient, PatientDto>(patient);

            if (patientDto == null)
            {
                return NotFound();
            }

            return Ok(patientDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreatePatientDto PatientDto)
        {
            Patient createPatient = _Mapper.Map<CreatePatientDto, Patient>(PatientDto);
            createPatient.CellPhone = RemoveSpecialCharacters(createPatient.CellPhone);
            createPatient.Telephone = RemoveSpecialCharacters(createPatient.Telephone ?? "");
            createPatient.CreatedDate = DateTime.Now;
            createPatient.IsDeleted = false;

            await _PatientRepository.CreateAsync(createPatient);
            Patient? createdPatient = await _PatientRepository.FindById(createPatient.Id);

            PatientDto patientDto = _Mapper.Map<Patient, PatientDto>(createdPatient);

            if (patientDto != null)
            {
                return Ok(patientDto);
            }
            else
            {
                throw new Exception("Erro ao cadastrar");
            }

            static string RemoveSpecialCharacters(string text)
            {
                if (string.IsNullOrWhiteSpace(text))
                {
                    return string.Empty;
                }

                return Regex.Replace(text, "[^0-9a-zA-ZãÃéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄçÇ]+?", string.Empty);
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdatePatientDto PatientInput)
        {
            Patient? patientFound = _Mapper.Map<UpdatePatientDto, Patient>(PatientInput);
         
            if (await _PatientRepository.FindById(patientFound.Id) == null)
            {
                return NotFound();
            }

            await _PatientRepository.Update(patientFound);

            PatientDto patientDto = _Mapper.Map<Patient, PatientDto>(patientFound);

            return Ok(patientDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            Patient? Patient = await _PatientRepository.FindById(id);

            if (Patient == null)
            {
                return NotFound();
            }

            await _PatientRepository.Delete(Patient);

            return Ok();
        }
    }
}
