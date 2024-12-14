import { Order } from "../models/order.model"
import { IOrder } from "../types/orders";

const getOrders = async () => {
  const orders = await Order.find();
  console.log(orders);
  return orders;
};

const createOrder = async (data: Omit<IOrder, "id">) => {
    console.log(data)
  const orders = new Order(data);
  return await orders.save();
};

const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  getOrders,
  updateOrder,
  createOrder,
  deleteOrder,
};
