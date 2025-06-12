import { NextResponse } from 'next/server';
import { prisma } from '@/databases/db';
import redis from '@/databases/redis';

export async function GET() {
  const totalUsers = await prisma.user.count();
  const totalBooks = await prisma.books.count();
  const totalBorrowedBooks = await prisma.borrowRecord.count({where:{status:"BORROWED"}});

  await redis.set('yesterday:totalUsers', totalUsers);
  await redis.set('yesterday:totalBooks', totalBooks);
  await redis.set('yesterday:totalBorrowedBooks',totalBorrowedBooks)

  return NextResponse.json({ message: 'Counts updated' });
}
