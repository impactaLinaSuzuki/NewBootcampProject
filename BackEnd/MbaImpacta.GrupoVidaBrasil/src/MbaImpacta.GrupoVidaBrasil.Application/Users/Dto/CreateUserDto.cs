using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Users.Dto
{
    public class CreateUserDto
    {
        [Column("PeopleId")]
        public long PeopleId { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }
    }
}
