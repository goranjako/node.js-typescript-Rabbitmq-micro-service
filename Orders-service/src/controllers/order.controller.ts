import OrderService from "../services/order.service";
import { Request, Response, NextFunction } from "express";
class OrderController {
  // Get all
  async getAll(req: Request, res: Response) {
    try {
      const docs = await OrderService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  // Get by id
  async get(req: Request, res: Response) {
    try {
      const obj = await OrderService.getById({ _id: req.params.id });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "order not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "order not found" });
    }
  }

  // Update by id
  async put(req: Request, res: Response) {
    const data = {
      userId: req.body.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
    };
    const id = req.params.id;

    try {
      const order = await OrderService.update(id, data);
      return res
        .status(200)
        .json({ success: true, message: " order is Updated successfully." });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "order does not exist!" });
    }
  }
  // Delete by id
  async delete(req: Request, res: Response) {
    try {
      await OrderService.delete({ _id: req.params.id });
      return res.json({
        success: true,
        message: " order is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "order does not exist!" });
    }
  }
}

export default new OrderController();
