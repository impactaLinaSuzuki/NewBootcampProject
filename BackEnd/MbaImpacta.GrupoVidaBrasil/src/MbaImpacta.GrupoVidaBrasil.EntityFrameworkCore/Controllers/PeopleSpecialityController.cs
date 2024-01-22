using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.PeopleSpecialities;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Specialities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PeopleSpecialityController : ControllerBase
    {
        private readonly IPeopleSpecialitiesRepository _PeopleSpecialityRepository;
        private readonly IPeopleRepository _PeopleRepository;
        private readonly ISpecialityRepository _SpecialityRepository;
        private IMapper _Mapper;

        public PeopleSpecialityController(
            IPeopleSpecialitiesRepository peopleSpecialityRepository,
            IPeopleRepository peopleRepository,
            ISpecialityRepository specialityRepository,
            IMapper mapper)
        {
            _PeopleSpecialityRepository = peopleSpecialityRepository;
            _PeopleRepository = peopleRepository;
            _SpecialityRepository = specialityRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var peopleSpecialities = await _PeopleSpecialityRepository.FindAllAsync();
            IEnumerable<PeopleSpecialityDto> peopleSpecialityListDto = _Mapper.Map<IEnumerable<PeopleSpeciality>, IEnumerable<PeopleSpecialityDto>>(peopleSpecialities);
            return Ok(peopleSpecialityListDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            PeopleSpeciality? peopleSpeciality = await _PeopleSpecialityRepository.FindById(id);
            PeopleSpecialityDto peopleSpecialityDto = _Mapper.Map<PeopleSpeciality, PeopleSpecialityDto>(peopleSpeciality);

            if (peopleSpecialityDto == null)
            {
                return NotFound();
            }

            return Ok(peopleSpecialityDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreatePeopleSpecialityDto peopleSpecialityInput)
        {
            PeopleSpeciality createPeopleSpeciality = _Mapper.Map<CreatePeopleSpecialityDto, PeopleSpeciality>(peopleSpecialityInput);
            createPeopleSpeciality.CreatedDate = DateTime.Now;

            await _PeopleSpecialityRepository.CreateAsync(createPeopleSpeciality);
            PeopleSpeciality? createdPeopleSpeciality = await _PeopleSpecialityRepository.FindById(createPeopleSpeciality.Id);
            PeopleSpecialityDto peopleSpecialityDto = _Mapper.Map<PeopleSpeciality, PeopleSpecialityDto>(createdPeopleSpeciality);

            if (peopleSpecialityDto != null)
            {
                return Ok(peopleSpecialityDto);
            }
            else
            {
                throw new Exception("Erro ao criar PeopleSpeciality");
            }
        }

        //[HttpPut("Update")]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ProducesResponseType(StatusCodes.Status204NoContent)]
        [NonAction]
        public async Task<IActionResult> Update(UpdatePeopleSpecialityDto peopleSpecialityInput)
        {
            PeopleSpeciality? PeopleSpecialityFound = _Mapper.Map<UpdatePeopleSpecialityDto, PeopleSpeciality>(peopleSpecialityInput);

            if (PeopleSpecialityFound == null)
            {
                return NotFound();
            }

            await _PeopleSpecialityRepository.Update(PeopleSpecialityFound);

            PeopleSpecialityDto PeopleSpecialityDto = _Mapper.Map<PeopleSpeciality, PeopleSpecialityDto>(PeopleSpecialityFound);

            return Ok(PeopleSpecialityDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            PeopleSpeciality? PeopleSpeciality = await _PeopleSpecialityRepository.FindById(id);

            if (PeopleSpeciality == null)
            {
                return NotFound();
            }

            await _PeopleSpecialityRepository.Delete(PeopleSpeciality);

            return Ok();
        }

        [HttpGet("GetPeopleBySpeciality/{specialityId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPeoplesBySpeciality(long specialityId)
        {
            var peoplesBySpeciality = _PeopleSpecialityRepository.GetPeopleBySpeciality(specialityId);
            IEnumerable<PeopleSpecialityDto> peoplesBySpecialityDto = _Mapper.Map<IEnumerable<PeopleSpeciality>, IEnumerable<PeopleSpecialityDto>>(peoplesBySpeciality);

            return Ok(peoplesBySpecialityDto);
        }


        [HttpGet("GetSpecialityByPeople/{poepleId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSpecialitiesByPeople(long poepleId)
        {
            var peoplesBySpeciality = _PeopleSpecialityRepository.GetSpecialityByPeople(poepleId);
            IEnumerable<PeopleSpecialityDto> peoplesBySpecialityDto = _Mapper.Map<IEnumerable<PeopleSpeciality>, IEnumerable<PeopleSpecialityDto>>(peoplesBySpeciality);

            return Ok(peoplesBySpecialityDto);
        }
    }
}
