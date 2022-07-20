import Products from "../models/product.model";
import { Product } from "../util/product";

class ProductService {
  static async getAll() {
    try {
      return await Products.find();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: any) {
    try {
      const product = await Products.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(data: Product) {
    try {
      const product = new Products(data);
      return await product.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id: any, data: Product) {
    try {
      const product = await Products.findById({ _id: id }).exec();
      product.set(data);
      const result = await product.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: any) {
    try {
      return await Products.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
