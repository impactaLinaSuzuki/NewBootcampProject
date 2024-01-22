import { lazy } from "react";
import { authRoles } from "app/auth";

const Users = lazy(() => import("./UserSPA"));

const userConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.user,
  routes: [
    {
      path: "/CADASTROS/USUARIO",
      element: <Users />,
    },
  ],
};

export default userConfig;
