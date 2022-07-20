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
let channel;
class RabbitMQ {
    Conect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const amqpServer = "amqp://localhost:5672";
                let connection = yield amqplib_1.default.connect(amqpServer);
                channel = yield connection.createChannel();
                yield channel.assertQueue("Order");
                console.log("Connecting RabbitMQ!");
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!");
                process.exit(1);
            }
        });
    }
    Create(chann, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield channel.sendToQueue(chann, Buffer.from(JSON.stringify({ data })));
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!", error);
            }
        });
    }
    Consume(chann, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Buffer;
            try {
                channel.consume(chann, (data) => __awaiter(this, void 0, void 0, function* () {
                    return data;
                }));
            }
            catch (error) {
                console.log("Error in Connecting RabbitMQ!", error);
            }
        });
    }
}
exports.default = new RabbitMQ();
//# sourceMappingURL=order.service.js.map