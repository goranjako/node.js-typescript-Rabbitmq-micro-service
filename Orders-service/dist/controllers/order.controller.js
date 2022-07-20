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
const order_service_1 = __importDefault(require("../services/order.service"));
class OrderController {
    // Get all
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield order_service_1.default.getAll();
                return res.status(200).json(docs);
            }
            catch (err) {
                return res.status(400).json(err.message);
            }
        });
    }
    // Get by id
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield order_service_1.default.getById({ _id: req.params.id });
                if (obj) {
                    return res.status(200).json(obj);
                }
                else {
                    return res.status(400).json({ error: "order not found" });
                }
            }
            catch (err) {
                return res.status(400).json({ error: "order not found" });
            }
        });
    }
    // Update by id
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId: req.body.userId,
                productId: req.body.productId,
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
            };
            const id = req.params.id;
            try {
                const order = yield order_service_1.default.update(id, data);
                return res
                    .status(200)
                    .json({ success: true, message: " order is Updated successfully." });
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: "order does not exist!" });
            }
        });
    }
    // Delete by id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield order_service_1.default.delete({ _id: req.params.id });
                return res.json({
                    success: true,
                    message: " order is Deleted successfully.",
                });
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: "order does not exist!" });
            }
        });
    }
}
exports.default = new OrderController();
//# sourceMappingURL=order.controller.js.map