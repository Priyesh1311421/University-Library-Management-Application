import { prisma } from "@/databases/db";
import Stats from "./Stats";
import redis from "@/databases/redis";


const Statholder = async() => {
    const [countUsers, countBooks, borrowedbook] = await Promise.all([
        prisma.user.count(),
        prisma.books.count(),
        prisma.borrowRecord.count()
    ]);

    const [yesterdayUsers, yesterdayBooks, yesterdayBorrowed] = await Promise.all([
        redis.get<number>('yesterday:totalUsers'),
        redis.get<number>('yesterday:totalBooks'),
        redis.get<number>('yesterday:totalBorrowedBooks')
    ]);
    const changeTotalUsers = countUsers - (yesterdayUsers ?? 0);
    const changeTotalBooks = countBooks - (yesterdayBooks ?? 0);
    const changeBorrowed = borrowedbook - (yesterdayBorrowed ?? 0);

  return <div className="flex flex-wrap gap-2">
    <Stats title="Borrowed Books" count={borrowedbook} change={changeTotalBooks} />
    <Stats title="Total Users" count={countUsers} change={changeTotalUsers}/>
    <Stats title="Total Books" count={countBooks} change={changeBorrowed}/>
  </div>;
};

export default Statholder;
