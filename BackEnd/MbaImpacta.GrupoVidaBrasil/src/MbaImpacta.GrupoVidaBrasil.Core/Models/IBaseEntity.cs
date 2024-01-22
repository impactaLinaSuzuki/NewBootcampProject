namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    public interface IBaseEntity
    {
        public long Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedDate { get; set; }
    }
}
