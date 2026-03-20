import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

// Purane messages laane ke liye (sirf un 2 logon ke beech ke)
export async function POST(request) {
  try {
    const { senderId, receiverId, text, action } = await request.json();
    await connectMongoDB();

    // Agar action "fetch" hai, toh messages return karo
    if (action === "fetch") {
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      }).sort({ createdAt: 1 });
      return NextResponse.json(messages);
    }

    // Warna naya message save karo
    const newMessage = await Message.create({ senderId, receiverId, text });

    // Ek unique channel ID banayein dono phone numbers ko jodkar
    const channelName = `chat-${[senderId, receiverId].sort().join('-')}`;
    await pusher.trigger(channelName, 'new-message', newMessage);

    return NextResponse.json({ message: "Sent!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}