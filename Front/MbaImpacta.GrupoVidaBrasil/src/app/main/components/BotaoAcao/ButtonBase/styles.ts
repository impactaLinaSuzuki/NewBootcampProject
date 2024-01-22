import { Colors } from "app/utils/Utils";
import { styled, alpha } from "@mui/material/styles";

export const Container = styled("div")(() => ({
  "& .botao": {
    padding: "3px 6px",
    fontSize: "1.4rem",
    fontWeight: 500,
  },
  "& .info": {
    color: "#fff",
    backgroundColor: Colors.info,
    "&:hover": {
      backgroundColor: alpha(Colors.info, 0.3),
    },
  },
  "& .success": {
    color: "#fff",
    backgroundColor: Colors.success,
    "&:hover": {
      backgroundColor: alpha(Colors.success, 0.3),
    },
  },
  "& .warning": {
    color: "#fff",
    backgroundColor: Colors.warning,
    "&:hover": {
      backgroundColor: alpha(Colors.warning, 0.3),
    },
  },
  "& .waiting": {
    color: "#fff",
    backgroundColor: Colors.waiting,
    "&:hover": {
      backgroundColor: alpha(Colors.waiting, 0.3),
    },
  },
  "& .default": {
    color: "#fff",
    backgroundColor: Colors.default,
    "&:hover": {
      backgroundColor: alpha(Colors.default, 0.3),
    },
  },
  "& .fechar": {
    color: "#000",
    backgroundColor: "#fff",
  },
}));
