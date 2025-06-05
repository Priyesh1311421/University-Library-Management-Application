import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />
        <div className={cn("mt-4", !isLoanBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanBook && (
          <div className="mt-3 w-full ">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>{" "}
            </div>
            <Button className="bg-dark-600 mt-3 min-h-14 w-full font-bebas-neue text-base">
              Download Reciept
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
