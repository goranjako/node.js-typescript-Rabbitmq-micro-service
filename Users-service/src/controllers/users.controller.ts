import Costumers from "../models/user";
import { Request, Response } from "express";

class CostumersController {
  // Get all
  async getAll(req: Request, res: Response) {
    try {
      const docs = await Costumers.find({});
      if (docs) {
        return res.status(200).json(docs);
      } else {
        return res.status(400).json({ success: false, msg: "Users not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  async get(req: Request, res: Response) {
    try {
      const obj = await Costumers.findById({ _id: req.params.id });
      if (obj) return res.status(200).json(obj);
      else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

export default new CostumersController();
