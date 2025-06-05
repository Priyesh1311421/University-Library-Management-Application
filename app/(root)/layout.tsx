import { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { prisma } from "@/databases/db"; 
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if(!session){
    redirect('/sign-in');
  }
  if (session?.user?.id) {
    const today = new Date().toISOString().slice(0, 10);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { lastActivityDate: true },
    });

    if (
      user?.lastActivityDate &&
      user.lastActivityDate.toISOString().slice(0, 10) !== today
    ) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { lastActivityDate: today },
      });
    }
  }

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        {/* @ts-ignore */}
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
