// models/Sales.js
import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
  salesmanId: String,
  product: String,
  quantity: Number,
  price: Number,
  customer: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Sales || mongoose.model('Sales', SalesSchema);

