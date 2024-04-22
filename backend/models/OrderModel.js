import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderType: {
      type: String,
      require: true,
      default: "website",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        addon: { type: Boolean },
        additionalPrice: { type: Number, required: true, default: 0 },
        customize: { type: String },
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Plant",
        },
      },
    ],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      pin: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Payment",
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Order Received",
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
