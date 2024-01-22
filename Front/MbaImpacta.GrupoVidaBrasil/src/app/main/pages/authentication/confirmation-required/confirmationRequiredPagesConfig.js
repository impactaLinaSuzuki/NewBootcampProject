import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ClassicConfirmationRequiredPage = lazy(() =>
  import("./ClassicConfirmationRequiredPage")
);

const confirmationRequiredPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/authentication/confirmation-required",
      children: [
        {
          path: "",
          element: <Navigate to="classic" />,
        },
        {
          path: "classic",
          element: <ClassicConfirmationRequiredPage />,
        },
      ],
    },
  ],
};

export default confirmationRequiredPagesConfig;
