using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Profiles;
using MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Profile = MbaImpacta.GrupoVidaBrasil.Core.Models.Profile;

namespace MbaImpacta.GrupoVidaBrasil.Core.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileRepository _ProfileRepository;
        private IMapper _Mapper;

        public ProfileController(
            IProfileRepository profileRepository, 
            IMapper mapper)
        {
            _ProfileRepository = profileRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var profiles = await _ProfileRepository.FindAllAsync();
            IEnumerable<ProfileDto> profileListDto = _Mapper.Map<IEnumerable<Profile>, IEnumerable<ProfileDto>>(profiles);
            return Ok(profileListDto);
        }

        [HttpGet("DropDown")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DropDown()
        {
            var profiles = await _ProfileRepository.FindAllAsync();
            List<DropDown> profileListDto = _Mapper.Map<List<DropDown>>(profiles.ToList());
            return Ok(profileListDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            Profile? profile = await _ProfileRepository.FindById(id);
            ProfileDto profileDto = _Mapper.Map<Profile, ProfileDto>(profile);

            if (profileDto == null)
            {
                return NotFound();
            }

            return Ok(profileDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateProfileDto profileInput)
        {
            Profile createProfile = _Mapper.Map<CreateProfileDto, Profile>(profileInput);
            createProfile.CreatedDate = DateTime.Now;

            await _ProfileRepository.CreateAsync(createProfile);
            Profile? createdProfile = await _ProfileRepository.FindById(createProfile.Id);
            ProfileDto profileDto = _Mapper.Map<Profile, ProfileDto>(createdProfile);

            if(profileDto != null)
            {
                return Ok(profileDto);
            }
            else
            {
                throw new Exception("Erro ao criar profile");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateProfileDto profileInput)
        {
            Profile profile = _Mapper.Map<UpdateProfileDto, Profile>(profileInput);
           
            if (profile == null)
            {
                return NotFound();
            }
            
             await _ProfileRepository.Update(profile);

            ProfileDto profileDto = _Mapper.Map<Profile, ProfileDto>(profile);

            return Ok(profileDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            Profile? profile = await _ProfileRepository.FindById(id);

            if (profile == null)
            {
                return NotFound();
            }

            await _ProfileRepository.Delete(profile);

            return Ok();
        }
    }
}
