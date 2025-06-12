import { getAllBorrowRecords } from "@/lib/admin/actions/borrowbooks";
import BorrowRecordsTable from "./BorrowRecordsTable";

export default async function BorrowedBooks() {
  const result = await getAllBorrowRecords();

  if (!result.success) {
    return (
      <div className="p-4 text-center text-red-600">
        Failed to load borrow records: {result.error}
      </div>
    );
  }

  return <BorrowRecordsTable records={result.data} />;
}
