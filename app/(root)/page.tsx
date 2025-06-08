import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { prisma } from "@/databases/db";

const Home = async() => {

  const latestBooks = await prisma.books.findMany({
    take: 10
  })

  const session = await auth();
  const userId = session?.user?.id || "";
  
  return(
    <>
      <BookOverview {...{ ...{...latestBooks[0] },userId}} />
      <BookList
        title="Popular Books"
        books={latestBooks}
        containerClassName="mt-10"
      />
    </>
)};
export default Home;
