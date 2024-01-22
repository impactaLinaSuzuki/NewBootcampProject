import { ReactNode, MouseEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";

import { Confirmar, Cancelar } from "app/main/components/BotaoAcao";

interface ModalConfirmarProps {
  titulo?: string;
  descricao?: string;
  descricaoComponent?: ReactNode;
  loading?: boolean;
  onCancelar: (e: MouseEvent<HTMLButtonElement>) => void;
  onConfirmar: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ModalConfirmar({
  titulo,
  descricao,
  descricaoComponent,
  onCancelar,
  onConfirmar,
  loading,
  ...rest
}: ModalConfirmarProps) {
  const mainTheme = useSelector(selectMainTheme);

  return (
    <ThemeProvider theme={mainTheme}>
      <Dialog
        open
        onClose={onCancelar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        {...rest}
      >
        <DialogTitle id="alert-dialog-title">
          {titulo || "Confirma?"}
        </DialogTitle>
        <DialogContent>
          {descricaoComponent || (
            <Typography variant="body1">
              {descricao || "Confirmar ação"}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Cancelar onClick={onCancelar} loading={loading} />
          <Confirmar onClick={onConfirmar} loading={loading} />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
