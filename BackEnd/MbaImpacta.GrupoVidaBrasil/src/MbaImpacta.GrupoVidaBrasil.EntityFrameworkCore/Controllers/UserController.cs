using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Users.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepository;
        private IMapper _Mapper;

        public UserController(
            IUserRepository userRepository,
            IMapper mapper)
        {
            _UserRepository = userRepository;
            _Mapper = mapper;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> FindAll()
        {
            var users = await _UserRepository.FindAllAsync();

            IEnumerable<UserDto> usersDto = _Mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);

            return Ok(usersDto);
        }

        [HttpGet("Get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            User? user = await _UserRepository.FindById(id);

            UserDto userDto = _Mapper.Map<User, UserDto>(user);

            if (userDto == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }

        [HttpPost("Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateUserDto userInput)
        {
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

            userInput.Password = GetHash(userInput.Password);

            User createUser = _Mapper.Map<CreateUserDto, User>(userInput);
            createUser.CreatedDate = DateTime.Now;

            await _UserRepository.CreateAsync(createUser);
            User? createdUser = await _UserRepository.FindById(createUser.Id);

            UserDto userDto = _Mapper.Map<User, UserDto>(createdUser);

            if (userDto != null)
            {
                return Ok(userDto);
            }
            else
            {
                throw new Exception("Erro ao cadastrar");
            }
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(UpdateUserDto userInput)
        {
            User? userFound = _Mapper.Map<UpdateUserDto, User>(userInput);
         
            if (await _UserRepository.FindById(userFound.Id) == null)
            {
                return NotFound();
            }

            await _UserRepository.Update(userFound);

            UserDto userDto = _Mapper.Map<User, UserDto>(userFound);

            return Ok(userDto);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            User? user = await _UserRepository.FindById(id);

            if (user == null)
            {
                return NotFound();
            }

            await _UserRepository.Delete(user);

            return Ok();
        }
    }
}
