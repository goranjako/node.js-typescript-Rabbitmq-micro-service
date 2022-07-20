"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    code: {
        type: Number,
        required: [true, "Code is required"],
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
        //enum: ["$", "€"],
        // default: "$",
    },
    quantity: {
        type: Number,
        default: 0,
    },
    isfreeshipping: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
//# sourceMappingURL=product.model.js.map