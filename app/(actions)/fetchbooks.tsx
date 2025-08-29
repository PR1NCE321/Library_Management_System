// fetchbooks.tsx
"use server";

import { PrismaClient } from "../generated/prisma"; // Ensure path is correct

const prisma = new PrismaClient(); // Singleton recommended

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  imgurl?: string | null;
}

export async function fetchBooks(filterStatus?: string): Promise<Book[]> {
  try {
    const whereClause = filterStatus ? { status: filterStatus } : {};
    const data = await prisma.items.findMany({ where: whereClause });

    const books: Book[] = data.map((item) => ({
      id: item.ItemID,
      title: item.ItemTitle,
      author: item.ItemAuthor || item.ItemAuther, // Handle typo if schema has ItemAuther
      status: item.status,
      imgurl: item.imageUrl,
    }));

    return books;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Usage example: fetchBooks("available") for available books only
