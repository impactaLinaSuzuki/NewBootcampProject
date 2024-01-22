// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import Provider from "react-redux/es/components/Provider";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppContext from "./AppContext";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "./store";
import routes from "app/configs/routesConfig";
import { AtualizaConfiguracoes } from "./main/pages/AtualizaConfiguracoes";

const withAppProviders = (Component: React.ElementType) => (props?: any) => {
  const WrapperComponent = () => (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <AtualizaConfiguracoes />
            <Component {...props} />
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
