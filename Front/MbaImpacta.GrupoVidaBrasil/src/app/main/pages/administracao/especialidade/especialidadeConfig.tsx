import { lazy } from "react";
import { authRoles } from "app/auth";

const Especialidades = lazy(() => import("./EspecialidadeSPA"));

const especialidadeConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.user,
  routes: [
    {
      path: "/CADASTROS/ESPECIALIDADE",
      element: <Especialidades />,
    },
  ],
};

export default especialidadeConfig;
