import { lazy } from "react";
import { authRoles } from "app/auth";

const Pacientes = lazy(() => import("./PacienteSPA"));

const pacienteConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.user,
  routes: [
    {
      path: "/CADASTROS/PACIENTE",
      element: <Pacientes />,
    },
  ],
};

export default pacienteConfig;
