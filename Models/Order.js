import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [{
    _id: { type: String},
    title: { type: String, required: true },
    size: { type: String },
    quantity: { type: Number, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    dni: { type: String },
    email: { type: String, required: true },
  },
  numberOfItems: { type: Number, required: true },
  total: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: String },
  transactionId: { type: String },
  discountCode: { type: String },
  discountPrice: { type: Number, default: 0 },
  isShipping: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const OrderOnfit = mongoose.models.OrderOnfit || mongoose.model('OrderOnfit', orderSchema);

export default OrderOnfit;