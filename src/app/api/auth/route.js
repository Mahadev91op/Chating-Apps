import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { phone, name, pin } = await request.json();
    await connectMongoDB();

    let user = await User.findOne({ phone });

    // Agar user pehle se hai, toh PIN check karo
    if (user) {
      if (user.pin !== pin) {
        return NextResponse.json({ error: "Wrong PIN!" }, { status: 401 });
      }
    } else {
      // Agar naya user hai, toh account bana do
      user = await User.create({ phone, name, pin });
    }

    return NextResponse.json({ id: user.phone, name: user.name, phone: user.phone });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}