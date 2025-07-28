const mongoose = require("mongoose");

// CartItem Schema 
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  image: String,
  price: String,
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 1,
  },
},
{_id:false}
);

// Main Cart Schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Cart", CartSchema);
