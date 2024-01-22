using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Specialities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SpecialityController : ControllerBase
    {
        private readonly ISpecialityRepository _SpecialityRepository;
        private IMapper _Mapper;

        public SpecialityController(
            ISpecialityRepository SpecialityRepository,
            IMapper mapper)
        {
            _SpecialityRepository = SpecialityRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var specialitys = await _SpecialityRepository.FindAllAsync();

            IEnumerable<SpecialityDto> profileListDto = _Mapper.Map<IEnumerable<Speciality>, IEnumerable<SpecialityDto>>(specialitys);

            return Ok(profileListDto);
        }

        [HttpGet("DropDown")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DropDown()
        {
            var specialities = await _SpecialityRepository.FindAllAsync();
            List<DropDown> specialityListDto = _Mapper.Map<List<DropDown>>(specialities.ToList());
            return Ok(specialityListDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            Speciality? speciality = await _SpecialityRepository.FindById(id);

            SpecialityDto specialityDto = _Mapper.Map<Speciality, SpecialityDto>(speciality);

            if (specialityDto == null)
            {
                return NotFound();
            }

            return Ok(specialityDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateSpecialityDto specialityInput)
        {
            Speciality createSpeciality = _Mapper.Map<CreateSpecialityDto, Speciality>(specialityInput);
            createSpeciality.CreatedDate = DateTime.Now;

            await _SpecialityRepository.CreateAsync(createSpeciality);
            Speciality? createdSpeciality = await _SpecialityRepository.FindById(createSpeciality.Id);

            SpecialityDto specialityDto = _Mapper.Map<Speciality, SpecialityDto>(createdSpeciality);

            if (specialityDto != null)
            {
                return Ok(specialityDto);
            }
            else
            {
                throw new Exception("Erro ao cadastrar");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateSpecialityDto specialityInput)
        {
            Speciality? specialityFound = _Mapper.Map<UpdateSpecialityDto, Speciality>(specialityInput);
         
            if (await _SpecialityRepository.FindById(specialityFound.Id) == null)
            {
                return NotFound();
            }

            await _SpecialityRepository.Update(specialityFound);

            SpecialityDto specialityDto = _Mapper.Map<Speciality, SpecialityDto>(specialityFound);

            return Ok(specialityDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            Speciality? Speciality = await _SpecialityRepository.FindById(id);

            if (Speciality == null)
            {
                return NotFound();
            }

            await _SpecialityRepository.Delete(Speciality);

            return Ok();
        }
    }
}
