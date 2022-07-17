import express from "express";
const {
  validateRegistrationBody,
  validateLoginBody,
  validate,
} = require("./util/validation");
import authController from "./controllers/auth.controller";
import userController from "./controllers/users.controller";
import authManager from "./util/auth";

export default function setRoutes(app: any) {
  const router = express.Router();

  //UserRoute

  router
    .route("/register")
    .post(validateRegistrationBody(), validate, authController.register);
  router
    .route("/login")
    .post(validateLoginBody(), validate, authController.login);
  router.route("/users").get(authManager.verifyToken, userController.getAll);

  app.use("/", router);
}
