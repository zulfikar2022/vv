import express from "express";
import { userRoute } from "./modules/user/user.route.js";
import { urlRoutes } from "./modules/url/url.route.js";
import { webRoutes } from "./web/routes.js";

const allRoutes = [
  {
    path: "/api",
    route: userRoute,
  },
  {
    path: "/api/users",
    route: urlRoutes,
  },
  {
    path: "/web",
    route: webRoutes,
  },
];
const router = express.Router();
allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
