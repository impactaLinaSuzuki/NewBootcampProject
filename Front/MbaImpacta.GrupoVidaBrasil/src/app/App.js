import * as React from "react";
//import "@mock-api";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import settingsConfig from "app/configs/settingsConfig";
import withAppProviders from "./withAppProviders.tsx";
import { AuthProvider } from "./auth/AuthContext";
import { ToastContainer } from "./main/components/Toast";

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = "https://localhost:7222/";
axios.defaults.headers.common["Content-Type"] = "application/json";

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const user = useSelector(selectUser);

  const { i18n } = useTranslation();

  const langDirection = i18n.dir(i18n.language);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/*  <CssBaseline /> */}
        <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
          {/*   <FuseTheme theme={mainTheme} direction={langDirection}> */}
          <AuthProvider>
            <BrowserRouter>
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
              >
                <ToastContainer />

                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  classes={{
                    containerRoot:
                      "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
          {/*  </FuseTheme> */}
        </CacheProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default withAppProviders(App)();
