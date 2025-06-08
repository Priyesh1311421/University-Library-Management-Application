import BookOverview from "@/components/BookOverview";
import BookNotFound from "@/components/BookNotFound";
import { prisma } from "@/databases/db";
import BookList from "@/components/BookList";
import BookVideo from "@/components/BookVideo";
import { auth } from "@/auth";

const Page = async({params}:{params: Promise<{bookId: string}>}) => {

  const bookId = (await params).bookId;
  const session = await auth();
  const userId = session?.user?.id || ""; 

  const book = await prisma.books.findUnique({
    where:{
      id: bookId
    }
  })

  const similarBooks  = await prisma.books.findMany({
    where: {
      genre: book?.genre,
      id: {
        not: bookId // Exclude the current book
      }
    },
    take: 5 // Limit to 5 similar books
  })

  if (!book || !book.id) {
    return <BookNotFound message={`We couldn't find the book with ID: ${bookId}`} />;
  }
  
  return <div>
    <BookOverview {...{ ...book, userId }} />
    <div className="book-details">
      <div className="flex-[1.5]">
        <section className="flex flex-col gap-7">
          <h3>VIDEO</h3>
          {/* Video Component */}
          <BookVideo videoUrl={book.videoUrl} />
        </section>
        <section className="mt-10 flex flex-col gap-7">
          <h3>Summary</h3>

          <div className="space-y-5 text-xl text-light-100 ">
            {book.summary.split('/n').map((line,i) => (
              <p key={i}>{line}</p>
            ))}
          </div> 
        </section>
      </div>
      <div>
        {similarBooks.length > 0 ? (
          <BookList title="Similar Books" books={similarBooks}/>
        ):(
          <div className="text-light-100">No similar Books available </div>
        )}
      </div>
    </div>
  </div>;
};

export default Page;
