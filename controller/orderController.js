// PACKAGE
import asyncHandler from "express-async-handler";

// MODEL
import Order from "./../model/orderModel.js";

// @desc      Create New Order
// @route     GET /api/orders
// @access   PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    subtotalPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if ITEMS are present or not, if NOT, return by throwing an ERROR
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items found..");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotalPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc      Get Order by ID
// @route     GET /api/orders/:id
// @access   PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
  // ID will be in the URL i.e. '/api/orders/:id'
  const order = await Order.findById(req.params.id);
  // .populate(
  //   "product",
  //   "name price category"
  // );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found..");
  }
});

// @desc      Update Order to PAID
// @route     GET /api/orders/:id/pay
// @access   PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // ID will be in the URL i.e. '/api/orders/:id'
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // NOTE: Below details are populated using the PAYPAL provided details
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found..");
  }
});

// @desc      Get the logged-in users ORDERS
// @route     GET /api/orders/myorders
// @access   PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req.user._id }).select(
  //   "_id paidAt totalPrice"
  // );
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
