import express from "express";
const {
  validateProductBody,
  validateOrderBody,
  validate,
} = require("./util/validation");

import ProductController from "./controllers/product.controller";
import OrderController from "./controllers/order.controller";

//import authManager from './util/auth';
export default function setRoutes(app: any) {
  const router = express.Router();

  //productRoute
  router
    .route("/product")
    .post(validateProductBody(), validate, ProductController.create);
  router.route("/product").get(ProductController.getAll);
  router.route("/product/:id").get(ProductController.get);
  router
    .route("/product/:id")
    .put(validateProductBody(), validate, ProductController.put);
  router.route("/product/:id").delete(ProductController.delete);
  router
    .route("/orders")
    .post(validateOrderBody(), validate, OrderController.create);

  app.use("/", router);
}
