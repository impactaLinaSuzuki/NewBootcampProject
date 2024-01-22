import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ClassicUnlockSessionPage = lazy(() =>
  import("./ClassicUnlockSessionPage")
);

const unlockSessionPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/authentication/unlock-session",
      children: [
        {
          path: "",
          element: <Navigate to="classic" />,
        },
        {
          path: "classic",
          element: <ClassicUnlockSessionPage />,
        },
      ],
    },
  ],
};

export default unlockSessionPagesConfig;
