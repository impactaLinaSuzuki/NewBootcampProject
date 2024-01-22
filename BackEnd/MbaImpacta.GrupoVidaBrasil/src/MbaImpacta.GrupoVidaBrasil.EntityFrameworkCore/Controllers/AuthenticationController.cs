using AutoMapper;
using MbaImpacta.GrupoVidaBrasil.Application.Authentication.Dto;
using MbaImpacta.GrupoVidaBrasil.Application.Users.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples;
using MbaImpacta.GrupoVidaBrasil.Core.Repositories.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepository _UserRepository;
        private readonly IPeopleRepository _PeopleRepository;
        private readonly GrupoVidaBrasilDbContext _DbContext;
        private IMapper _Mapper;

        public AuthenticationController(
            IUserRepository userRepository,
            IPeopleRepository peopleRepository,
            GrupoVidaBrasilDbContext dbContext,
            IMapper mapper)
        {
            _UserRepository = userRepository;
            _PeopleRepository = peopleRepository;
            _DbContext = dbContext;
            _Mapper = mapper;
        }

        public static class SigningConfigurations
        {
            public static SecurityKey Key { get; private set; }
            public static SigningCredentials SigningCredentials { get; private set; }

            public static void BuidCredentials()
            {
                Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ImP-3aUWu76dhVOwk4P5NA_IMPACTA_611b8040-f9a5-13ed-be56-0282ac5623302"));
                SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Auth(AuthenticationDto auth)
        {
            People? people = await _PeopleRepository.FindByCpf(auth.Cpf);

            if (people != null)
            {
                User? user = await _UserRepository.FindByIdPeople(people.Id);

                if (user != null)
                {
                    if (user.IsActive == false)
                    {
                        return NotFound("Usuário inativo");
                    }

                    var senhaValidada = VerifyHash(auth.Password, user.Password);

                    if (senhaValidada)
                    {
                        user.Token = GenerateToken();

                        await _UserRepository.Update(user);

                        UserDto userDto = _Mapper.Map<User, UserDto>(user);

                        if (userDto != null)
                        {
                            var handler = new JwtSecurityTokenHandler();

                            SigningConfigurations.BuidCredentials();

                            var dataCriacao = DateTime.UtcNow;
                            var dataExpiracao = dataCriacao.AddMinutes(20);

                            var identity = new ClaimsIdentity(new GenericIdentity(user.Id.ToString(), "Login"));

                            identity.AddClaim(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")));
                            identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, people.Id.ToString()));
                            identity.AddClaim(new Claim(JwtRegisteredClaimNames.Email, people.Email));
                            identity.AddClaim(new Claim(JwtRegisteredClaimNames.GivenName, people.Name));
                            identity.AddClaim(new Claim("id_pessoa", people.Id.ToString()));

                            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                            {
                                SigningCredentials = SigningConfigurations.SigningCredentials,
                                Subject = identity,
                                NotBefore = dataCriacao,
                                Expires = dataExpiracao
                            });

                            userDto.Token = handler.WriteToken(securityToken);

                            return Ok(userDto);
                        }
                        else
                        {
                            return BadRequest("Erro ao autenticar");
                        }
                    }
                    else
                    {
                        return BadRequest("Senha inválida");
                    }
                }
                else
                {
                    return NotFound("Usuário não encontrado");
                }

            }
            else
            {
                return NotFound("Pessoa não encontrada");
            }

            static bool VerifyHash(string input, string hash)
            {
                string hash2 = GetHash(input);
                return StringComparer.OrdinalIgnoreCase.Compare(hash2, hash) == 0;
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

            static string GenerateToken()
            {
                var data = DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:ss", CultureInfo.InvariantCulture);
                var guid = Guid.NewGuid().ToString().Replace("-", string.Empty);
                var guid1 = Guid.NewGuid().ToString().Replace("-", string.Empty);

                var plainTextBytes = Encoding.UTF8.GetBytes(guid + "|" + data + "|" + guid1);
                return Convert.ToBase64String(plainTextBytes);
            }
        }
    }
}
