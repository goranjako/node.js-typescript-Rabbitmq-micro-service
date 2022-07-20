import productService from "../services/product.sevice";
import { Request, Response, NextFunction } from "express";
class ProductController {
  // Get all
  async getAll(req: Request, res: Response) {
    try {
      const docs = await productService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
  // Insert
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        quantity: req.body.quantity,
        isfreeshipping: req.body.isfreeshipping,
      };
      const obj = await productService.addProduct(product);
      return res
        .status(200)
        .json({ success: true, message: " Product is Created successfully." });
    } catch (err) {
      res.status(422).json(err.message);
    }
  }

  // Get by id
  async get(req: Request, res: Response) {
    try {
      const obj = await productService.getById({ _id: req.params.id });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "Product not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Product not found" });
    }
  }

  // Update by id
  async put(req: Request, res: Response) {
    const data = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      quantity: req.body.quantity,
      isfreeshipping: req.body.isfreeshipping,
    };
    const id = req.params.id;

    try {
      const product = await productService.update(id, data);
      return res
        .status(200)
        .json({ success: true, message: " Product is Updated successfully." });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Product does not exist!" });
    }
  }
  // Delete by id
  async delete(req: Request, res: Response) {
    try {
      await productService.delete({ _id: req.params.id });
      return res.json({
        success: true,
        message: " Product is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Product does not exist!" });
    }
  }
}

export default new ProductController();
