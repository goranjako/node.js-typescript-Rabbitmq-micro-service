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
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield product_model_1.default.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findById(id);
                return product;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static addProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = new product_model_1.default(data);
                return yield product.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findById({ _id: id }).exec();
                product.set(data);
                const result = yield product.save();
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
                return yield product_model_1.default.deleteOne(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.sevice.js.map