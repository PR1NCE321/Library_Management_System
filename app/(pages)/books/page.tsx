import Navbar from "@/app/(components)/Navbar";
import BookCard from "@/app/(components)/Bookcard";
import FetchBooks from "@/app/(utilitys)/fetchbooks";



async function BooksPage() {
  const books =  await FetchBooks();
  console.log("aa ja chhe")
  console.log(books)
  return (
    <div>
      <Navbar role="Librarian" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Books List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default BooksPage