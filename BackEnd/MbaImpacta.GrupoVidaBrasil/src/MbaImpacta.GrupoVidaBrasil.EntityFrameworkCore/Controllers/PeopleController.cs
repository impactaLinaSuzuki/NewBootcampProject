using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Users.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.PeopleSpecialities;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly IPeopleRepository _PeopleRepository;
        private readonly IUserRepository _UserRepository;
        private readonly IPeopleSpecialitiesRepository _PeopleSpecialityRepository;
        private IMapper _Mapper;

        public PeopleController(
            IPeopleRepository peopleRepository,
            IMapper mapper,
            IUserRepository userRepository,
            IPeopleSpecialitiesRepository peopleSpecialRepository)
        {
            _PeopleRepository = peopleRepository;
            _Mapper = mapper;
            _UserRepository = userRepository;
            _PeopleSpecialityRepository = peopleSpecialRepository;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var peoples = await _PeopleRepository.FindAllAsync();
            IEnumerable<PeopleDto> profileListDto = _Mapper.Map<IEnumerable<People>, IEnumerable<PeopleDto>>(peoples);
            return Ok(profileListDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            People? people = await _PeopleRepository.FindById(id);

            PeopleDto peopleDto = _Mapper.Map<People, PeopleDto>(people);

            if (peopleDto == null)
            {
                return NotFound();
            }

            return Ok(peopleDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreatePeopleDto peopleInput)
        {
            People createPeople = _Mapper.Map<CreatePeopleDto, People>(peopleInput);
            createPeople.CreatedDate = DateTime.Now;
            createPeople.CellPhone = RemoveSpecialCharacters(createPeople.CellPhone);
            createPeople.Telephone = RemoveSpecialCharacters(createPeople.Telephone ?? "");
            createPeople.IsDeleted = false;

            await _PeopleRepository.CreateAsync(createPeople);
            People? createdPeople = await _PeopleRepository.FindById(createPeople.Id);
            PeopleDto peopleDto = _Mapper.Map<People, PeopleDto>(createdPeople);
            peopleInput.Password = GetHash(peopleInput.Password);

            User usr = new User(){ PeopleId = peopleDto.Id, Password = peopleInput.Password, CreatedDate = DateTime.Now};
            await _UserRepository.CreateAsync(usr);
            User? createdUser = await _UserRepository.FindById(usr.Id);

            if (peopleInput.Specialities?.Count() > 0)
            {
                PeopleSpeciality peopleSpeciality = new PeopleSpeciality() { PeopleId = createdPeople.Id, CreatedDate = DateTime.Now};

                foreach(var s in  peopleInput.Specialities)
                {
                    peopleSpeciality.SpecialityId = s;
                    await _PeopleSpecialityRepository.CreateAsync(peopleSpeciality);
                }
            }

            if (peopleDto != null && createdUser != null)
            {
                return Ok(peopleDto);
            }
            else
            {
                throw new Exception("Erro ao realizar cadastro!");
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
        public async Task<IActionResult> Update(UpdatePeopleDto peopleInput)
        {
            People? peopleFound = _Mapper.Map<UpdatePeopleDto, People>(peopleInput);
         
            if (await _PeopleRepository.FindById(peopleFound.Id) == null)
            {
                return NotFound();
            }

            await _PeopleRepository.Update(peopleFound);

            PeopleDto peopleDto = _Mapper.Map<People, PeopleDto>(peopleFound);

            return Ok(peopleDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            People? people = await _PeopleRepository.FindById(id);

            if (people == null)
            {
                return NotFound();
            }

            await _PeopleRepository.Delete(people);

            return Ok();
        }

        static string GetHash(string input)
        {
            byte[] array = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < array.Length; i++)
            {
                stringBuilder.Append(array[i].ToString("x2"));
            }

            return stringBuilder.ToString();
        }
    }
}
