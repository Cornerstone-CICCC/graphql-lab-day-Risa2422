import customerController from "../controllers/customer.controller"
import productController from "../controllers/product.controller"
import orderController from "../controllers/order.controller"
import { IProduct } from "../types/product";
import { ICustomer } from "../types/customer";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { Customer } from "../models/customer.model";
import { IOrder } from "../types/orders";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProduct(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) => {
      console.log(id);
      return await productController.getProductById(id);
    },
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: { id: string }) =>
      await productController.getCustomerByProductId(parent.id),
  },
  Customer: {
    products: async (parent: { id: string }) =>
      await customerController.getProductByCustomerId(parent.id),
  },
  Order: {
    product: async (parent: { id: string }) => {
      const order = await Order.findById(parent.id);
      const product = await Product.findById(order?.productId);
      return product;
    },
    customer: async (parent: { id: string }) => {
      const order = await Order.findById(parent.id);
      if (!order) {
        return {};
      }
      const customer = await customerController.getCustomerById(
        order.customerId.toString()
      );
      return customer;
    },
  },

  Mutation: {
    addProduct: async (
      _: unknown,
      { productName, productPrice }: Omit<IProduct, "id">
    ) =>
      await productController.createProduct({
        productName,
        productPrice,
      }),

    editProduct: async (
      _: unknown,
      { id, productName, productPrice }: IProduct
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),

    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: Omit<ICustomer, "id">
    ) =>
      await customerController.createCustomer({
        firstName,
        lastName,
        email,
      }),

    editCustomer: async (
      _: unknown,
      { id, firstName, lastName, email }: ICustomer
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),

    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (
      _: unknown,
      { productId, customerId }: { productId: string; customerId: string }
    ) => {
      console.log(productId, customerId);
      return await orderController.createOrder({ productId, customerId });
    },

    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) =>
      await orderController.updateOrder(id, { productId, customerId }),

    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
