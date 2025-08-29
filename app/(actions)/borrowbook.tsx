// borrowbook.tsx
"use server";

import { PrismaClient, Status } from "@/app/generated/prisma";

const prisma = new PrismaClient(); // Consider making this a singleton in production

export async function borrowBook(bookId: number, borrowerId: string, dueDate: Date) {
  try {
    const book = await prisma.items.findUnique({ where: { ItemID: bookId } });
    if (!book) {
      throw new Error("Book not found");
    }
    if (book.status !== "available" as Status) {
      throw new Error("Book is not available for borrowing");
    }

    await prisma.items.update({
      where: { ItemID: bookId },
      data: {
        status: "borrowed" as Status,
        // Add borrower and due date if your schema supports it (extend schema if needed)
        // borrowerId, // Assuming you add this field
        // borrowDate: new Date(),
        // dueDate,
      },
    });
    return { success: true, message: "Book borrowed successfully" };
  } catch (error) {
    console.error("Borrow failed:", error);
    return { success: false, message: "Failed to borrow book" };
  } finally {
    await prisma.$disconnect();
  }
}

// Example UI handler (if this file includes a component)
// const handleBorrow = async (bookId: number) => {
//   const result = await borrowBook(bookId, "user123", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Due in 7 days
//   if (result.success) alert("Borrowed!");
// };
