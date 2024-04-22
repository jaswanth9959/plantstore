import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    cardNumber: { type: String },
    status: { type: Boolean, default: false },
    update_time: { type: Date, default: Date.now() },
    email_address: { type: String },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
