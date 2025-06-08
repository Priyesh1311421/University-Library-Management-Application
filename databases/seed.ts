import { PrismaClient } from '@prisma/client';
import ImageKit from 'imagekit';
import fs from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();

const dummyBooksRaw = await fs.readFile(path.join(__dirname, 'dummybooks.json'), 'utf-8');
const dummyBooks = JSON.parse(dummyBooksRaw);

import { config } from 'dotenv';

config({ path: '.env' });

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
): Promise<string | undefined> => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
  }
};

const seed = async () => {
  console.log('Seeding data...');

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        '/books/covers'
      );

      if (!coverUrl) {
        throw new Error(`Failed to upload cover for book: ${book.title}`);
      }

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        '/books/videos'
      );

      if (!videoUrl) {
        throw new Error(`Failed to upload video for book: ${book.title}`);
      }

      await prisma.books.create({
        data: {
          ...book,
          coverUrl,
          videoUrl,
        },
      });
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
