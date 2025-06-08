import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import React from "react";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import UserCard from "@/components/UserCard";
import { prisma } from "@/databases/db";

const Page = async () => {
  const session = await auth();
  const id = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: id || "",
    },
  });

  if (!user) {
    return <p className="text-white">User not found</p>;
  }

  const {
    fullName,
    email,
    universityId,
    universityCard,
  } = user;

  // You may derive profileImage from email or use a default
  const profileImage = "/default-avatar.png"; // or Gravatar logic etc.
  return (
    <>
      <div className="flex flex-row max-lg:flex-col gap-24 h-auto justify-between">
        <div className="lg:w-[520px] w-full flex-shrink-0">
          <UserCard
              fullName={fullName}
              email={email}
              universityId={universityId}
              universityCard={universityCard}
              profileImage={profileImage}
          />
        </div>
        <div className="flex-1">
          <BookList title="Borrowed Books" books={sampleBooks} />
        </div>
      </div>
    </>
  );
};

export default Page;
