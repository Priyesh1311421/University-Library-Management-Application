import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import Image from "next/image";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "regular" | "wide" | "medium";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra-small",
  small: "book-cover_small",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
  medium: "book-cover_medium",
};
interface Props {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverUrl: string;
}
const BookCover = ({
  variant = "regular",
  className,
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={`${config.env.imagekit.urlEndpoint}/${coverUrl}`}
          alt="cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BookCover;
