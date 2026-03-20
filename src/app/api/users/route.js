import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({}, 'name phone').sort({ name: 1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}