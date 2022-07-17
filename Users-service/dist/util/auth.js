"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class authManager {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Gather the jwt access token from the request header
                const authHeader = yield req.headers["authorization"];
                const token = authHeader && authHeader.split(" ")[1];
                if (token == null)
                    return res.status(401).json({ message: "No token provided!" }); // if there isn't any token
                jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
                    console.log(err);
                    if (err)
                        return res.status(403).json({ success: false, msg: "Unauthorized." });
                    req.body.user = user;
                    next(); // pass the execution off to whatever request the client intended
                });
            }
            catch (error) {
                return res.status(401).json({ message: "Your token has expired." });
            }
        });
    }
}
exports.default = new authManager();
//# sourceMappingURL=auth.js.map