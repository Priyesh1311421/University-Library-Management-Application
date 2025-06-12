"use server";

import { prisma } from "@/databases/db";

export async function getAllBorrowRecords() {
  try {
    const records = await prisma.borrowRecord.findMany({
      include: {
        book: {
          select: {
            title: true,
            coverUrl: true,
            coverColor:true
          },
        },
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        borrowDate: 'desc',
      },
    });    // Transform the data to include calculated status
    const transformedRecords = records.map(record => {
      let status: "BORROWED" | "RETURNED" | "LATE_RETURN" = record.status as "BORROWED" | "RETURNED";
      
      // If the book is still borrowed and past due date, mark as late return
      if (record.status === "BORROWED" && new Date() > new Date(record.dueDate)) {
        status = "LATE_RETURN";
      }

      return {
        id: record.id,
        borrowDate: record.borrowDate.toISOString(),
        returnDate: record.returnDate?.toISOString(),
        dueDate: record.dueDate.toISOString(),
        status,
        book: {
          title: record.book.title,
          image: record.book.coverUrl,
          cover: record.book.coverColor
        },
        user: {
          name: record.user.fullName,
          email: record.user.email,
          avatarUrl: undefined, // Not available in schema
        },
      };
    });

    return {
      success: true,
      data: transformedRecords,
    };
  } catch (error) {
    console.error("Error fetching borrow records:", error);
    return {
      success: false,
      error: "Failed to fetch borrow records",
      data: [],
    };
  }
}