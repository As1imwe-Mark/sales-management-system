// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['admin', 'salesman'], default: 'salesman' }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
