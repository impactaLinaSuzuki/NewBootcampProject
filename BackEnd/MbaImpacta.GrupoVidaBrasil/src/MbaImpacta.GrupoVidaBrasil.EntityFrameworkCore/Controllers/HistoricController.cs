using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Histories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class HistoricController : ControllerBase
    {
        private readonly IMedicalRecordRepository _HistoricRepository;
        private readonly GrupoVidaBrasilDbContext _DbContext;
        private IMapper _Mapper;

        public HistoricController(
            IMedicalRecordRepository historicRepository,
            GrupoVidaBrasilDbContext dbContext, 
            IMapper mapper)
        {
            _HistoricRepository = historicRepository;
            _DbContext = dbContext;
            _Mapper = mapper;
        }

        [HttpGet("GetAllByPatient/{pacienteId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAlByPatientl(long pacienteId)
        {
            var historics = await _HistoricRepository.FindByIdPeople(pacienteId);

            IEnumerable<MedicalRecordDto> historicsDto = _Mapper.Map<IEnumerable<MedicalRecord>, IEnumerable<MedicalRecordDto>>(historics);

            return Ok(historicsDto);
        }

        [HttpGet("Get/{historicId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long historicId)
        {
            MedicalRecord? historic = await _HistoricRepository.FindById(historicId);

            MedicalRecordDto historicDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(historic);

            if (historicDto == null)
            {
                return NotFound();
            }

            return Ok(historicDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateMedicalRecordDto HistoricDto)
        {
            MedicalRecord createHistoric = _Mapper.Map<CreateMedicalRecordDto, MedicalRecord>(HistoricDto);
            createHistoric.CreatedDate = DateTime.Now;

            await _HistoricRepository.CreateAsync(createHistoric);
            MedicalRecord? createdHistoric = await _HistoricRepository.FindById(createHistoric.Id);

            MedicalRecordDto historicDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(createdHistoric);

            if (historicDto != null)
            {
                return Ok(historicDto);
            }
            else
            {
                throw new Exception("Erro ao adicionar novo histórico. Tente novamente!");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateMedicalRecordDto HistoricInput)
        {
            MedicalRecord? historicFound = _Mapper.Map<UpdateMedicalRecordDto, MedicalRecord>(HistoricInput);

            MedicalRecord? historicoDb = await _HistoricRepository.FindById(historicFound.Id);

            if (historicoDb == null)
            {
                return NotFound();
            }
            historicFound.CreatedDate = historicoDb.CreatedDate;

            await _HistoricRepository.Update(historicFound);

            MedicalRecordDto historicDto = _Mapper.Map<MedicalRecord, MedicalRecordDto>(historicFound);

            return Ok(historicDto);
        }

        [HttpDelete("Delete/{historicId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long historicId)
        {
            MedicalRecord? Historic = await _HistoricRepository.FindById(historicId);

            if (Historic == null)
            {
                return NotFound();
            }

            await _HistoricRepository.Delete(Historic);

            return Ok();
        }
    }
}
