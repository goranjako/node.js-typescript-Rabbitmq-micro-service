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
const product_sevice_1 = __importDefault(require("../services/product.sevice"));
class ProductController {
    // Get all
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield product_sevice_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (err) {
                return res.status(400).json(err.message);
            }
        });
    }
    // Insert
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = {
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    currency: req.body.currency,
                    quantity: req.body.quantity,
                    isfreeshipping: req.body.isfreeshipping,
                };
                const obj = yield product_sevice_1.default.addProduct(product);
                return res
                    .status(200)
                    .json({ success: true, message: " Product is Created successfully." });
            }
            catch (err) {
                res.status(422).json(err.message);
            }
        });
    }
    // Get by id
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield product_sevice_1.default.getById({ _id: req.params.id });
                if (obj) {
                    return res.status(200).json(obj);
                }
                else {
                    return res.status(400).json({ error: "Product not found" });
                }
            }
            catch (err) {
                return res.status(400).json({ error: "Product not found" });
            }
        });
    }
    // Update by id
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                currency: req.body.currency,
                quantity: req.body.quantity,
                isfreeshipping: req.body.isfreeshipping,
            };
            const id = req.params.id;
            try {
                const product = yield product_sevice_1.default.update(id, data);
                return res
                    .status(200)
                    .json({ success: true, message: " Product is Updated successfully." });
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: "Product does not exist!" });
            }
        });
    }
    // Delete by id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_sevice_1.default.delete({ _id: req.params.id });
                return res.json({
                    success: true,
                    message: " Product is Deleted successfully.",
                });
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: "Product does not exist!" });
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map