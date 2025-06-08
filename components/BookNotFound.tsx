import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface BookNotFoundProps {
  message?: string;
  showHomeButton?: boolean;
}

const BookNotFound: React.FC<BookNotFoundProps> = ({
  message = "We couldn't find the book you're looking for.",
  showHomeButton = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12">
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <Image
          src="/images/no-books.png"
          alt="Book not found"
          width={256}
          height={256}
          className="relative z-10 drop-shadow-2xl"
        />
      </div>

      <h1 className="font-bebas-neue text-4xl md:text-5xl text-light-100 mb-4 text-center">
        Book Not Found
      </h1>

      <p className="text-light-400 text-center max-w-md mb-8 text-lg">
        {message}
      </p>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
        {showHomeButton && (
          <Button asChild  variant={'default'} className="hover:opacity-90 hover:invert font-ibm-plex-sans font-medium px-6 py-6 text-base">
            <Link href="/">
              <Image
                src="/icons/home.svg"
                alt="Home"
                width={20}
                height={20}
                className="mr-2 inline-block"
              />
              Back to Homepage
            </Link>
          </Button>
        )}

        <Button asChild variant="outline" className="border-light-400/20 text-light-200 hover:invert font-ibm-plex-sans font-medium px-6 py-6 text-base">
          <Link href="/book">
            <Image
              src="/icons/book.svg"
              alt="Browse"
              width={20}
              height={20}
              className="mr-2 inline-block"
            />
            Browse All Books
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BookNotFound;
