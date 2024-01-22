using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Authentication.Dto
{
    public class AuthenticationDto
    {
        public string Cpf { get; set; }

        public string Password { get; set; } = string.Empty;
    }
}
