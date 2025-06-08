"use server";

import { prisma } from "@/databases/db";

// @ts-ignore
export const createBook = async (params) => {
  try {
    const newBook = await prisma.books.create({
      data: {
        ...params,
        availableCopies: params.totalCopies,
      },
    });

    return {
      success: true,
      data: newBook,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
