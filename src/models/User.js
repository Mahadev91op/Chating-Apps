import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pin: { type: String, required: true }, // Password ki jagah simple PIN
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);