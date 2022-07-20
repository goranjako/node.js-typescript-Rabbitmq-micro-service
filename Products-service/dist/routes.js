"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { validateProductBody, validateOrderBody, validate, } = require("./util/validation");
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const order_controller_1 = __importDefault(require("./controllers/order.controller"));
//import authManager from './util/auth';
function setRoutes(app) {
    const router = express_1.default.Router();
    //productRoute
    router
        .route("/product")
        .post(validateProductBody(), validate, product_controller_1.default.create);
    router.route("/product").get(product_controller_1.default.getAll);
    router.route("/product/:id").get(product_controller_1.default.get);
    router
        .route("/product/:id")
        .put(validateProductBody(), validate, product_controller_1.default.put);
    router.route("/product/:id").delete(product_controller_1.default.delete);
    router
        .route("/orders")
        .post(validateOrderBody(), validate, order_controller_1.default.create);
    app.use("/", router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map