import amqp from "amqplib";
import Order from "../models/order.model";
import { Request, Response, NextFunction } from "express";
let channel: any;

class RabbitMQ {
  async Create(kanal: any) {
    try {
      await channel.sendToQueue(
        kanal,
        Buffer.from(JSON.stringify({ msg: "Order Created" }))
      );
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  async Conect() {
    try {
      const amqpServer = "amqp://localhost:5672";
      let connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("Product");
      console.log("Connecting RabbitMQ!");
      await this.Consum("Order");
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!");
      process.exit(1);
    }
  }
  async Consum(ch: any) {
    let Buffer: any;
    let next: NextFunction;
    let ErrorHandler: any;
    try {
      channel.consume(ch, async (data: any) => {
        const userData = JSON.parse(data.content);
        channel.ack(data);
        const order = new Order({
          user: userData.data.user,
          products: userData.data.products,
          totalPrice: userData.data.totalPrice,
          quantity: userData.data.quantity,
        });
        if (!order) {
          return next(new ErrorHandler("Order not found with this Id", 404));
        }
        const obj = await order.save();
        if (!obj) {
          return next(new ErrorHandler("Order not found with this Id", 404));
        }
        return await this.Create("Product");
      });
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }
}

export default new RabbitMQ();
