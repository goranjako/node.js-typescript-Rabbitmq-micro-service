import RabbitMQ from "../services/order.service";
import { Request, Response, NextFunction } from "express";
class OrderController {
  // Insert
  async create(req: Request, res: Response) {
    let data = req.body;
    try {
      if (!data) {
        res.status(400).json("Order does not exist!");
      }
      await RabbitMQ.Create("Order", data);
      await RabbitMQ.Consume("Product", res);
     return res.status(200).json({ msg: " Order is Created successfully" });
    } catch (error) {
      res.status(422).json(error.message);
    }
  }
}
export default new OrderController();
