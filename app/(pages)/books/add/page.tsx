// Add/Edit Book Page (app/books/add/page.tsx or app/books/[id]/edit.tsx)
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FetchBooks from "@/app/(actions)/fetchbooks";
import { createBook } from "@/app/(actions)/createbook";
import { updateBook } from "@/app/(actions)/updatebook";

const initialFormState = {
  ItemType: "Book",
  ItemTitle: "",
  ItemAuther: "",
  status: "available",
  imageUrl: "",
};


function BookFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id"); // For edit mode
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
  if (bookId) {
    const loadBook = async () => {
      const allBooks = await FetchBooks();
      const selected = allBooks.find(book => book.id.toString() === bookId);
      if (selected) {
        setForm({
          ItemType: "book",
          ItemTitle: selected.title,
          ItemAuther: selected.author,
          status: selected.status,
          imageUrl: selected.imgurl || "",
        });
      }
    };
    loadBook();
  }
}, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookId) {
      console.log("Editing Book:", form);
      await updateBook(Number(bookId), form);
    } else {
      console.log("Adding Book:", form);
       await createBook(form);
    }
    router.push("/books");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">{bookId ? "Edit Book" : "Add New Book"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Item Type</label>
            <select
              name="ItemType"
              value={form.ItemType}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-xl"
              required
            >
              <option value="Book">Book</option>
              <option value="Journal">Journal</option>
              <option value="Multimedia">Multimedia</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="ItemTitle"
              value={form.ItemTitle}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              name="ItemAuther"
              value={form.ItemAuther}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-xl"
              required
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-xl"
              placeholder="/images/cover.jpg or https://..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {bookId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookFormPage