import amqp from "amqplib";
import { Request, Response, NextFunction } from "express";
let channel: any;

class RabbitMQ {
  async Conect() {
    try {
      const amqpServer = "amqp://localhost:5672";
      let connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("Order");
      console.log("Connecting RabbitMQ!");
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!");
      process.exit(1);
    }
  }

  async Create(chann: any, data: any) {
    try {
      await channel.sendToQueue(chann, Buffer.from(JSON.stringify({ data })));
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  async Consume(chann: any, res: any) {
    let Buffer: any;
    try {
      channel.consume(chann, async (data: any) => {
        return data;
      });
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }
}

export default new RabbitMQ();
