import { authRoles } from "app/auth";
import { lazy } from "react";

const CalendarApp = lazy(() => import("./CalendarApp"));

const CalendarAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: "apps/calendar",
      element: <CalendarApp />,
    },
  ],
};

export default CalendarAppConfig;
