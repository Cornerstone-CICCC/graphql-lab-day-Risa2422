import { Customer } from "../models/customer.model"
import { ICustomer } from "../types/customer"
import mongoose from "mongoose";

const getCustomers = async () => {
  const customers = await Customer.find();
  console.log(customers);
  return customers;
};

const createCustomer = async (data: Omit<ICustomer, "id">) => {
  const customer = new Customer(data);
  return await customer.save();
};

const getCustomerById = async (id: string | mongoose.Schema.Types.ObjectId) => {
  console.log(id);
  return await Customer.findById(id);
};

const getProductByCustomerId = async (id: string) => {
  return await Customer.find({ productId: id });
};

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
};

const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id);
};

export default {
  getCustomers,
  createCustomer,
  getCustomerById,
  getProductByCustomerId,
  updateCustomer,
  deleteCustomer,
};
