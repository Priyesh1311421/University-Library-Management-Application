"use server";

import { prisma } from "@/databases/db";
import dayjs from "dayjs";


export const borrowBook = async (params: BorrowBookParams) =>{
    const { bookId, userId } = params;
    try {
        const book = await prisma.books.findUnique({
            where: {
                id: bookId
            },
            select:{
                availableCopies: true,
            }
        })
        if(!book || book.availableCopies <= 0) {
            return {
                success: false,
                error: "This book is currently not available for borrowing."
            }

        }

        const dueDate = dayjs().add(7,'day').toDate().toISOString();
        const result = await prisma.$transaction(async (tx) => {

            await tx.$queryRaw`SELECT * FROM "Books" WHERE "id" = ${bookId} FOR UPDATE`;

            const borrowRecord = await tx.borrowRecord.create({
                data: {
                bookId: bookId,
                userId: userId,
                dueDate: dueDate,
                status: "BORROWED",
                },
            });

            await tx.books.update({
                where: {
                id: bookId,
                },
                data: {
                availableCopies: {
                    decrement: 1,
                },
                },
            });
            return borrowRecord;
        });


        return {
            success: true,
            data:JSON.parse(JSON.stringify({result}))
        }

    } catch (error) {
        console.error("Error borrowing book:", error);
        return {
            success: false,
            error: "An error occurred while borrowing the book. Please try again later."
        }
    }
}

