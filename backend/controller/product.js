import { Product, validateProduct } from "../models/productScheme.js";

class ProductsController {
  async getProducts(req, res) {
    try {
      const { limit = 10, skip = 0 } = req.query;
      const products = await Product.find()
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      const totalCount = await Product.countDocuments();

      res.status(200).json({
        variant: "success",
        msg: "All products",
        payload: products,
        totalCount,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { limit = 10, count = 0 } = req.query;
      const { id } = req.params;
      const products = await Product.find({ categoryId: id })
        .limit(parseInt(limit))
        .skip(parseInt(count));
      const totalCount = await Product.countDocuments({ categoryId: id });

      res.status(200).json({
        variant: "success",
        msg: "All products by category",
        payload: products,
        totalCount,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          variant: "error",
          msg: "Product not found",
          payload: null,
        });
      }

      res.status(200).json({
        variant: "success",
        msg: "Product found",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }

  async createProduct(req, res) {
    try {
      const { error } = validateProduct(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });
      const { adminId } = req.admin;

      const product = await Product.create({
        ...req.body,
        adminId,
      });

      res.status(201).json({
        variant: "success",
        msg: "Product created successfully",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { error } = validateProduct(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });
      const { id } = req.params;

      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({
          variant: "error",
          msg: "Product not found",
          payload: null,
        });
      }

      res.status(200).json({
        variant: "success",
        msg: "Product updated successfully",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({
          variant: "error",
          msg: "Product not found",
          payload: null,
        });
      }

      res.status(200).json({
        variant: "success",
        msg: "Product deleted successfully",
        payload: product,
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        msg: "Server error",
        payload: null,
      });
    }
  }
}

export default new ProductsController();
