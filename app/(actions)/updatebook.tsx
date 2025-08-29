// updatebook.tsx
"use server";

import { PrismaClient, Status } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function updateBook(bookId: number, form: {
  ItemType: string;
  ItemTitle: string;
  ItemAuthor: string; // Fixed typo
  status: string;
  imageUrl?: string;
}) {
  try {
    const validStatuses = ["available", "borrowed", "reserved"]; // Expanded for library
    const validStatus = validStatuses.includes(form.status)
      ? (form.status as Status)
      : "available";

    const updated = await prisma.items.update({
      where: { ItemID: bookId },
      data: {
        ItemType: form.ItemType,
        ItemTitle: form.ItemTitle,
        ItemAuthor: form.ItemAuthor, // Fixed typo
        status: validStatus,
        imageUrl: form.imageUrl || null,
      },
    });
    if (!updated) throw new Error("Book not found");
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
}
