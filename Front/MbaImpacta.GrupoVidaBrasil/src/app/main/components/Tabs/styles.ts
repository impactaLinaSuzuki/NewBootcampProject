import { styled } from "@mui/material/styles";
import { Tabs, Tab, Badge } from "@mui/material";

export const Container = styled(Tabs)(() => ({
  padding: 0,
  margin: 0,
}));

export const Content = styled(Tab)(() => ({
  fontSize: 14,
  minHeight: "64px",
  minWidth: "100px",
  "&.MuiTab-labelIcon .MuiTab-wrapper > *:first-child": {
    marginBottom: "0px !important",
  },
  labelIcon: {
    padding: "2px 8px",
    minHeight: "48px",
  },
}));

export const Indicator = styled(Badge)(() => ({
  top: 6,
  right: -9,
  textAlign: "start",
  padding: 0,
  margin: 0,
  justifyContent: "start",
}));
