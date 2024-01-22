import { CircularProgress, CircularProgressProps } from "@mui/material";
import Grid from "app/main/components/Grid";
import clsx from "clsx";

interface CarregandoProps extends CircularProgressProps {
  tooSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  classDiv?: string;
  grid?: boolean;
}

export function Carregando({
  grid,
  tooSmall,
  small,
  medium,
  classDiv,
  ...rest
}: CarregandoProps) {
  const RetornoDiv = (
    <div
      className={clsx(
        "h-full w-full flex justify-center items-center",
        classDiv
      )}
    >
      <CircularProgress
        color="inherit"
        size={tooSmall ? 10 : small ? 20 : medium ? 30 : 40}
        {...rest}
      />
    </div>
  );

  return grid ? <Grid item>{RetornoDiv}</Grid> : RetornoDiv;
}
