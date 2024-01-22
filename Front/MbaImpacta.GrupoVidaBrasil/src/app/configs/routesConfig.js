import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import pagesConfigs from "../main/pages/pagesConfigs";

const routeConfigs = [...pagesConfigs, SignOutConfig, SignInConfig];
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: "/",
    element: <Navigate to="/apps/calendar" />,
  },
];

export default routes;
