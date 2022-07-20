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
const order_model_1 = __importDefault(require("../models/order.model"));
class OrderService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield order_model_1.default.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_model_1.default.findById(id);
                return order;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static addOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new order_model_1.default(data);
                return yield order.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_model_1.default.findById({ _id: id }).exec();
                order.set(data);
                const result = yield order.save();
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield order_model_1.default.deleteOne(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map