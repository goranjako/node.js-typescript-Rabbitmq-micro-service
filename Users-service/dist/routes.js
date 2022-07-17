"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { validateRegistrationBody, validateLoginBody, validate, } = require("./util/validation");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const auth_1 = __importDefault(require("./util/auth"));
function setRoutes(app) {
    const router = express_1.default.Router();
    //UserRoute
    router
        .route("/register")
        .post(validateRegistrationBody(), validate, auth_controller_1.default.register);
    router
        .route("/login")
        .post(validateLoginBody(), validate, auth_controller_1.default.login);
    router.route("/users").get(auth_1.default.verifyToken, users_controller_1.default.getAll);
    app.use("/", router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map