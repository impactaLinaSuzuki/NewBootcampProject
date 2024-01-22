using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Histories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MedicalRecordController : ControllerBase
    {
        private readonly IMedicalRecordRepository _MedicalRecordRepository;
        private IMapper _Mapper;

        public MedicalRecordController(
            IMedicalRecordRepository medicalRecordRepository, 
            IMapper mapper)
        {
            _MedicalRecordRepository = medicalRecordRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        { 
            var medicalRecords = await _MedicalRecordRepository.FindAllAsync();

            IEnumerable<MedicalRecordDto> medicalRecordsDto = _Mapper.Map<IEnumerable<MedicalRecord>, IEnumerable<MedicalRecordDto>>(medicalRecords);

            return Ok(medicalRecordsDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            MedicalRecord? medicalRecord = await _MedicalRecordRepository.FindById(id);

            MedicalRecordDto medicalRecordDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(medicalRecord);

            if (medicalRecordDto == null)
            {
                return NotFound();
            }

            return Ok(medicalRecordDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateMedicalRecordDto medialRecordDto)
        {
            MedicalRecord createMedicalRecord = _Mapper.Map<CreateMedicalRecordDto, MedicalRecord>(medialRecordDto);
            createMedicalRecord.CreatedDate = DateTime.Now;

            await _MedicalRecordRepository.CreateAsync(createMedicalRecord);
            MedicalRecord? createdMedicalRecord = await _MedicalRecordRepository.FindById(createMedicalRecord.Id);

            MedicalRecordDto medicalRecordDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(createdMedicalRecord);

            if (medicalRecordDto != null)
            {
                return Ok(medicalRecordDto);
            }
            else
            {
                throw new Exception("Erro ao cadastrar");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateMedicalRecordDto medicalRecordInput)
        {
            MedicalRecord? medicalRecordFound = _Mapper.Map<UpdateMedicalRecordDto, MedicalRecord>(medicalRecordInput);
         
            if (await _MedicalRecordRepository.FindById(medicalRecordFound.Id) == null)
            {
                return NotFound();
            }

            await _MedicalRecordRepository.Update(medicalRecordFound);

            MedicalRecordDto medicalRecordDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(medicalRecordFound);

            return Ok(medicalRecordDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            MedicalRecord? medicalRecord = await _MedicalRecordRepository.FindById(id);

            if (medicalRecord == null)
            {
                return NotFound();
            }

            await _MedicalRecordRepository.Delete(medicalRecord);

            return Ok();
        }
    }
}
