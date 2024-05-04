import asyncHandler from "../middlewares/asynchandler.js";
import User from "../models/userModel.js";
import Order from "../models/OrderModel.js";
import Payment from "../models/paymentModel.js";

const createorder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    user,
    pickup,
    otype,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    cardNumber,
    status,
    email_address,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }

  const payment = new Payment({
    cardNumber,
    status,
    update_time: Date.now(),
    email_address,
  });

  const createdPayment = await payment.save();

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
    })),
    user: user,
    shippingAddress,
    paymentMethod,
    isPaid: true,
    paymentID: createdPayment._id,
    paidAt: Date.now(),
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    pickup,
    otype,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const createCounterorder = asyncHandler(async (req, res) => {
  const {
    userDetails,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    cardNumber,
    status,
    email_address,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }

  const payment = new Payment({
    cardNumber,
    status,
    update_time: Date.now(),
    email_address,
  });

  const { firstName, lastName, email, phone } = userDetails;
  const createdPayment = await payment.save();

  const user = new User({
    firstName,
    lastName,
    email,
    phone,
    password: "test",
  });

  const createdUser = await user.save();

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      plant: x._id,
      customize: x.custom,
      additionalPrice: x.additionalPrice,
      _id: undefined,
    })),
    orderType: "Counter",
    user: createdUser._id,
    shippingAddress,
    paymentMethod,
    isPaid: true,
    paymentID: createdPayment._id,
    paidAt: Date.now(),
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.orderStatus === "Order Received") {
      order.orderStatus = "Ready";
    } else {
      order.orderStatus = "Delivered";
      order.deliverdAt = Date.now();
    }

    const updatedorder = await order.save();

    res.json(updatedorder);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.status(200).json(orders);
});
export {
  createorder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateStatus,
  createCounterorder,
};
