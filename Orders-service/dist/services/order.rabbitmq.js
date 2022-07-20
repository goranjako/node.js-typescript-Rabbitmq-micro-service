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
const amqplib_1 = __importDefault(require("amqplib"));
const order_model_1 = __importDefault(require("../models/order.model"));
let channel;
class RabbitMQ {
    Create(kanal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield channel.sendToQueue(kanal, Buffer.from(JSON.stringify({ msg: "Order Created" })));
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!", error);
            }
        });
    }
    Conect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const amqpServer = "amqp://localhost:5672";
                let connection = yield amqplib_1.default.connect(amqpServer);
                channel = yield connection.createChannel();
                yield channel.assertQueue("Product");
                console.log("Connecting RabbitMQ!");
                yield this.Consum("Order");
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!");
                process.exit(1);
            }
        });
    }
    Consum(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            let Buffer;
            let next;
            let ErrorHandler;
            try {
                channel.consume(ch, (data) => __awaiter(this, void 0, void 0, function* () {
                    const userData = JSON.parse(data.content);
                    channel.ack(data);
                    const order = new order_model_1.default({
                        user: userData.data.user,
                        products: userData.data.products,
                        totalPrice: userData.data.totalPrice,
                        quantity: userData.data.quantity,
                    });
                    if (!order) {
                        return next(new ErrorHandler("Order not found with this Id", 404));
                    }
                    const obj = yield order.save();
                    if (!obj) {
                        return next(new ErrorHandler("Order not found with this Id", 404));
                    }
                    return yield this.Create("Product");
                }));
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!", error);
            }
        });
    }
}
exports.default = new RabbitMQ();
//# sourceMappingURL=order.rabbitmq.js.map