using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    public class DropDown
    {
        public long Id { get; }
        public string Text { get; }
        public long? Ordem { get; }
        public bool? Selected { get; }
        public string Grupo { get; }

        public DropDown(long id, string text, long? ordem = null, bool? selected = null, string grupo = null)
        {
            Id = id;
            Text = text;
            Ordem = ordem ?? 0; 
            Selected = selected ?? false; 
            Grupo = grupo ?? ""; 
        }
    }
}
