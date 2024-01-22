import Grid, { GridProps } from "@mui/material/Grid";

/*
	Componente criado para aplicar como padrão as configurações de responsividade em celular
	Qualquer alteração neste componente deve-se alinhar com a equipe
*/

function GridPersonalizado({ children, item, ...rest }: GridProps) {
  return item ? (
    <Grid item {...rest} xs={12} sm={12}>
      {children}
    </Grid>
  ) : (
    <Grid spacing={1} {...rest}>
      {children}
    </Grid>
  );
}

export default GridPersonalizado;
