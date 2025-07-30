import { BookOpen, UserCircle } from 'lucide-react';
import BorrowBook from '../(actions)/borrowbook';

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  imgurl?: string | null;
}

export default function BookCard({ book }: { book: Book }) {
  const isAvailable = book.status.toLowerCase() === 'available';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow hover:shadow-lg transition-all duration-300">

      <div className={`absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
        {book.status}
      </div>

      <div className="relative h-80 w-full">
        {book.imgurl ? (
          <img
            src={book.imgurl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <BookOpen className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-700 truncate" title={book.title}>
          {book.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <UserCircle className="mr-1 h-4 w-4" />
          {book.author}
        </div>
        <button onClick={BorrowBook}
          className={`w-full rounded-md py-2 text-sm font-semibold text-white transition-colors duration-200 ${
            isAvailable
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'cursor-not-allowed bg-gray-400'
          }`}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Borrow Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
