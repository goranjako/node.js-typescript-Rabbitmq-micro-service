"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const http = require('http');
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Get port from environment and store in Express.
 */
const port = process.env.port || 3010;
app_1.default.set("port", port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
const start = () => {
    try {
        server.listen(port, () => {
            console.log(`Api up and running at: http://localhost:` + port);
        });
    }
    catch (error) {
        console.error(error);
        process.exit();
    }
};
start();
//# sourceMappingURL=index.js.map