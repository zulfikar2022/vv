import express from "express";
import { userRoute } from "./modules/user/user.route.js";
import { urlRoutes } from "./modules/url/url.route.js";

const allRoutes = [
  {
    path: "/api",
    route: userRoute,
  },
  {
    path: "/api/users",
    route: urlRoutes,
  },
];
const router = express.Router();
allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
