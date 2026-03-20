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

// Purane messages fetch karne ke liye
export async function GET() {
  await connectMongoDB();
  const messages = await Message.find().sort({ createdAt: 1 });
  return NextResponse.json(messages);
}

// Naya message bhejne ke liye
export async function POST(request) {
  const { sender, text } = await request.json();
  await connectMongoDB();

  // Database mein save karo
  const newMessage = await Message.create({ sender, text });

  // Pusher ke through real-time mein sabko bhejo
  await pusher.trigger('chat-room', 'new-message', newMessage);

  return NextResponse.json({ message: "Message sent!" }, { status: 201 });
}