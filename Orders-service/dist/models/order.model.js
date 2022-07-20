"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    user: {
        type: String,
        required: [true, "User  is required"],
    },
    products: {
        type: String,
        required: [true, "Products is required"],
    },
    quantity: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Order", OrderSchema);
//# sourceMappingURL=order.model.js.map