import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getFirstName, getInitials } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

const Header = ({session}:{session:Session}) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8 ">
        <li>
          <Link href='/library' className="font-semibold font-ibm-plex-sans text-white">
            Library
          </Link>
        </li>
        { session?.user ? (
          <>
            <li>
              <Link href="/my-profile"  className=" flex items-center justify-center gap-2">
                <Avatar>
                  <AvatarFallback className="bg-amber-100">
                    {getInitials(session?.user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white font-semibold">
                  {getFirstName(session?.user?.name || "User")}
                </span>
              </Link>
            </li>
            <li>
              <form
                action={async () => {
                  "use server";

                  await signOut({redirectTo: "/sign-in"});
                }}
                className="flex items-center justify-center hover:cursor-pointer"
              >
                <button><LogOut stroke="red"/></button>
              </form>
            </li>
          </>
        ): null}
      </ul>
    </header>
  );
};

export default Header;