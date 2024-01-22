import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ClassicForgotPasswordPage = lazy(() =>
  import("./ClassicForgotPasswordPage")
);

const forgotPasswordPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/authentication/forgot-password",
      children: [
        {
          path: "",
          element: <Navigate to="classic" />,
        },
        {
          path: "classic",
          element: <ClassicForgotPasswordPage />,
        },
      ],
    },
  ],
};

export default forgotPasswordPagesConfig;
