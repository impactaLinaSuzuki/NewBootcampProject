using MbaImpacta.GrupoVidaBrasil.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Users.Dto
{
    public class UserDto : BaseEntityDto
    {
        [Column("PeopleId")]
        public long PeopleId { get; set; }

        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("LastPassword")]
        public string? LastPassword { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }

        [Column("Token")]
        public string? Token { get; set; }
    }
}
