import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, // Bhejne wale ka Phone Number
  receiverId: { type: String, required: true }, // Jisko bheja uska Phone Number
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model("Message", messageSchema);