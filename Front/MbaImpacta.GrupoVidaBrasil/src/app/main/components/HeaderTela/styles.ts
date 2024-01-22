import { styled } from "@mui/material/styles";

export const Container = styled("div")(({ theme }) => ({
  "& .titulo": {
    color: theme.palette.primary.main,
  },
  "& .subTitulo": {
    color: theme.palette.primary.main,
    padding: 5,
    fontSize: 14,
    marginTop: -4,
  },
}));
