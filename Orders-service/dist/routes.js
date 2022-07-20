"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { validateRegistrationBody, validateLoginBody, validateProductBody, validateOrderBody, validate } = require('./util/validation');
const order_controller_1 = __importDefault(require("./controllers/order.controller"));
function setRoutes(app) {
    const router = express_1.default.Router();
    router.get("/orders", order_controller_1.default.getAll);
    //productRoute
    app.use('/', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map