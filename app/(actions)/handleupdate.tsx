// handleupdate.
// Assuming this is part of a React component with state (e.g., useState for loading and book)

const handleUpdate = async () => {
  setLoading(true);
  try {
    // Optional: Validate before update (e.g., can't set to borrowed without logic)
    if (book.status === "borrowed" && !book.borrowerId) {
      throw new Error("Cannot set to borrowed without borrower details");
    }

    await updateBook(book.id, {
      ItemType: 'book',
      ItemTitle: book.title,
      ItemAuthor: book.author, // Fixed typo
      status: book.status,
      imageUrl: book.imgurl ?? '',
    });
    alert('Book updated successfully ✅');
  } catch (err) {
    console.error('Failed to update book:', err);
    alert('Update failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
