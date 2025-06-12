'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText } from "lucide-react";
import BookCover from "../BookCover";

type BorrowRecord = {
  id: string;
  borrowDate: string;
  returnDate?: string;
  dueDate: string;
  status: "BORROWED" | "RETURNED" | "LATE_RETURN";
  book: {
    title: string;
    image: string;
    cover: string;
  };
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

interface BorrowRecordsTableProps {
  records: BorrowRecord[];
}

const statusLabels = {
  BORROWED: "Borrowed",
  RETURNED: "Returned",
  LATE_RETURN: "Late Return",
};

const statusColors = {
  BORROWED: "bg-purple-100 text-purple-700",
  RETURNED: "bg-blue-100 text-blue-700",
  LATE_RETURN: "bg-red-100 text-red-700",
};

export default function BorrowRecordsTable({ records }: BorrowRecordsTableProps) {
  const [sortAsc, setSortAsc] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, BorrowRecord["status"]>>(
    () => Object.fromEntries(records.map((r) => [r.id, r.status]))
  );

  const sorted = [...records].sort((a, b) => {
    const d1 = new Date(a.borrowDate).getTime();
    const d2 = new Date(b.borrowDate).getTime();
    return sortAsc ? d1 - d2 : d2 - d1;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full mx-auto p-4">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Borrow Book Requests</h2>
          <Button variant="ghost" className="text-sm" onClick={() => setSortAsc(!sortAsc)}>
            {sortAsc ? "Oldest to Recent" : "Recent to Oldest"}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${sortAsc ? "" : "rotate-180"}`} />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="py-2 px-4">Book</th>
                <th className="py-2 px-4">User Requested</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Borrowed date</th>
                <th className="py-2 px-4">Return date</th>
                <th className="py-2 px-4">Due Date</th>
                <th className="py-2 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <BookCover className="h-8 w-6" coverUrl={r.book.image} coverColor={r.book.cover} />
                      {r.book.title.length > 25 ? (
                        <span className="font-medium">{`${r.book.title.substring(0,25)}...`}</span>
                      ):(
                        <span className="font-medium">{r.book.title}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {r.user.avatarUrl ? (
                        <img src={r.user.avatarUrl} className="w-8 h-8 rounded-full" alt={r.user.name} />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                          {r.user.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{r.user.name}</div>
                        <div className="text-xs text-gray-500">{r.user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`px-3 py-1 rounded-full text-sm border ${statusColors[statusMap[r.id]]}`}
                        >
                          {statusLabels[statusMap[r.id]]}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-36">
                        {(["BORROWED", "RETURNED", "LATE_RETURN"] as const).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            className={`flex items-center justify-between`}
                            onClick={() =>
                              setStatusMap((prev) => ({ ...prev, [r.id]: status }))
                            }
                          >
                            <span className={`${statusColors[status]} px-2 py-1 rounded-full`}>
                              {statusLabels[status]}
                            </span>
                            {statusMap[r.id] === status && <span>✓</span>}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">{formatDate(r.borrowDate)}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{r.returnDate ? formatDate(r.returnDate) : "-"}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{formatDate(r.dueDate)}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </div>
  );
}
