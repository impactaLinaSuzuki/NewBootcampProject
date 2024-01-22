import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ClassicResetPasswordPage = lazy(() =>
  import("./ClassicResetPasswordPage")
);

const resetPasswordPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/authentication/reset-password",
      children: [
        {
          path: "",
          element: <Navigate to="classic" />,
        },
        {
          path: "classic",
          element: <ClassicResetPasswordPage />,
        },
      ],
    },
  ],
};

export default resetPasswordPagesConfig;
