// createbook.tsx
"use server";

import { PrismaClient, Status } from "@/app/generated/prisma";

const prisma = new PrismaClient(); // Singleton recommended in production

export async function createBook(form: {
  ItemType: string;
  ItemTitle: string;
  ItemAuthor: string; // Fixed typo from ItemAuther
  status?: string; // Made optional with default
  imageUrl?: string;
}) {
  try {
    if (!form.ItemTitle || !form.ItemAuthor) {
      throw new Error("Title and author are required");
    }

    const validStatus = ["available", "borrowed"].includes(form.status || "")
      ? (form.status as Status)
      : "available"; // Default to available for new books

    await prisma.items.create({
      data: {
        ItemType: form.ItemType || "book", // Default to book for library
        ItemTitle: form.ItemTitle,
        ItemAuthor: form.ItemAuthor, // Fixed typo
        status: validStatus,
        imageUrl: form.imageUrl || null,
      },
    });
    return { success: true, message: "Book created successfully" };
  } catch (error) {
    console.error("Create failed:", error);
    return { success: false, message: "Failed to create book" };
  } finally {
    await prisma.$disconnect();
  }
}
