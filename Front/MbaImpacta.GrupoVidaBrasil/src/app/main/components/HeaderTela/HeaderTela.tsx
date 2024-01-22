import { ReactNode } from "react";
import { Typography } from "@mui/material";

import { Container } from "./styles";
import { useTitleToolbar } from "app/main/hooks";

interface HeaderTelaProps {
  descricaoTela?: string | ReactNode;
  subDescricaoTela?: string | ReactNode;
  noTitleToolbar?: boolean;
  children: ReactNode;
}

export function HeaderTela({
  descricaoTela,
  subDescricaoTela,
  noTitleToolbar,
  children,
}: HeaderTelaProps) {
  useTitleToolbar(descricaoTela, subDescricaoTela, !noTitleToolbar);

  return (
    <Container className="flex flex-1 justify-between items-center">
      <div>
        {noTitleToolbar && (
          <>
            <Typography variant="h5" className="titulo">
              {descricaoTela}
            </Typography>

            {subDescricaoTela && (
              <Typography className="subTitulo">{subDescricaoTela}</Typography>
            )}
          </>
        )}
      </div>

      {children}
    </Container>
  );
}
