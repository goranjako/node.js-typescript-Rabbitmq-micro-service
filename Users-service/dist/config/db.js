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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
//connectDb
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI, connectOptions);
        console.log("Database connection successfull");
    }
    catch (error) {
        console.error("Database Connection fail", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
//disconnectDb
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Database connection close");
        return mongoose_1.default.disconnect();
    }
    catch (error) {
        console.log("Database disconnection error", error);
        process.exit(1);
    }
});
exports.disconnectDB = disconnectDB;
exports.default = { connectDB: exports.connectDB };
//# sourceMappingURL=db.js.map