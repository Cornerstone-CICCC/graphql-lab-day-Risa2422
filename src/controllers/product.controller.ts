import { Product } from "../models/product.model";
import { IProduct } from "../types/product";
import mongoose from "mongoose";


const getProduct = async () => {
  const products = await Product.find();
  console.log(products);
  return products;
};

const createProduct = async (data: Omit<IProduct, "id">) => {
  const product = new Product(data);
  return await product.save();
};

const getProductById = async (id: string | mongoose.Schema.Types.ObjectId) => {
  console.log(id);
  return await Product.findById(id);
};

const getCustomerByProductId = async (id: string) => {
  return await Product.find({ productId: id });
};

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getProduct,
  createProduct,
  getProductById,
  getCustomerByProductId,
  updateProduct,
  deleteProduct,
};
