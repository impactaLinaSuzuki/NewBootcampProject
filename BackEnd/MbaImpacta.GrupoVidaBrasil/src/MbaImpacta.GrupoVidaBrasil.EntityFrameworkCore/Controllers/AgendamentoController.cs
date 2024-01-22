using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Agendamento.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AgendamentoController : ControllerBase
    {
        private readonly IBaseRepository<Agendamento> _AgendamentoRepository;
        private readonly GrupoVidaBrasilDbContext _DbContext;
        private IMapper _Mapper;

        public AgendamentoController(
            IBaseRepository<Agendamento> AgendamentoRepository,
            GrupoVidaBrasilDbContext dbContext, 
            IMapper mapper)
        {
            _AgendamentoRepository = AgendamentoRepository;
            _DbContext = dbContext;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var Agendamento = await _AgendamentoRepository.FindAllAsync();

            IEnumerable<AgendamentoDto> AgendamentoDto = _Mapper.Map<IEnumerable<Agendamento>, IEnumerable<AgendamentoDto>>(Agendamento);

            return Ok(AgendamentoDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            Agendamento? Agendamento = await _AgendamentoRepository.FindById(id);

            AgendamentoDto patientDto = _Mapper.Map<Agendamento, AgendamentoDto>(Agendamento);

            if (patientDto == null)
            {
                return NotFound();
            }

            return Ok(patientDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateAgendamentoDto AgendamentoDto)
        {
            Agendamento createAgendamento = _Mapper.Map<CreateAgendamentoDto, Agendamento>(AgendamentoDto);
            createAgendamento.CreatedDate = DateTime.Now;
            createAgendamento.IsDeleted = false;

            await _AgendamentoRepository.CreateAsync(createAgendamento);
            Agendamento? createdAgendamento = await _AgendamentoRepository.FindById(createAgendamento.Id);

            AgendamentoDto agendamentoDto = _Mapper.Map<Agendamento, AgendamentoDto>(createAgendamento);

            if (agendamentoDto != null)
            {
                return Ok(agendamentoDto);
            }
            else
            {
                throw new Exception("Erro ao cadastrar");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateAgendamentoDto agendamentoInput)
        {
            Agendamento? agendamentoFound = _Mapper.Map<UpdateAgendamentoDto, Agendamento>(agendamentoInput);
         
            if (await _AgendamentoRepository.FindById(agendamentoFound.Id) == null)
            {
                return NotFound();
            }

            await _AgendamentoRepository.Update(agendamentoFound);

            AgendamentoDto agendamentoDto = _Mapper.Map<Agendamento, AgendamentoDto>(agendamentoFound);

            return Ok(agendamentoDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            Agendamento? agendamento = await _AgendamentoRepository.FindById(id);

            if (agendamento == null)
            {
                return NotFound();
            };

            await _AgendamentoRepository.Delete(agendamento);

            return Ok();
        }
    }
}
