import { lazy } from "react";
import { authRoles } from "app/auth";

const Perfils = lazy(() => import("./PerfilSPA"));

const perfilConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.user,
  routes: [
    {
      path: "/CADASTROS/PERFIL",
      element: <Perfils />,
    },
  ],
};

export default perfilConfig;
