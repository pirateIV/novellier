"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// Mock database - replace with your actual database
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    coverImage: "/placeholder.svg?height=400&width=300",
    genre: "Classic",
    publicationDate: "1925-04-10",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "BookLover42",
        rating: 4,
        content: "A timeless classic that captures the essence of the Jazz Age.",
        createdAt: new Date("2023-01-15").toISOString(),
      },
    ],
  },
]

// Validation schema for adding a book
const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional(),
  genre: z.string().optional(),
  publicationDate: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().optional(),
  reviewContent: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.coerce.number().min(1).max(5),
})

export type BookFormData = z.infer<typeof BookSchema>

export async function checkBookExists(title: string, author: string) {
  // Check if a book with the same title and author already exists
  const existingBook = books.find(
    (book) => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase(),
  )

  return existingBook ? { exists: true, book: existingBook } : { exists: false }
}

export async function addBook(formData: FormData) {
  // Parse and validate form data
  const validatedFields = BookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    isbn: formData.get("isbn"),
    genre: formData.get("genre"),
    publicationDate: formData.get("publicationDate"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") || "/placeholder.svg?height=400&width=300",
    reviewContent: formData.get("reviewContent"),
    rating: formData.get("rating"),
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data

  // Check if book already exists
  const { exists, book } = await checkBookExists(data.title, data.author)

  if (exists) {
    return {
      success: false,
      message: "This book already exists in our database",
      bookId: book?.id,
    }
  }

  // Create a new book with the first review
  const newBook = {
    id: (books.length + 1).toString(),
    title: data.title,
    author: data.author,
    isbn: data.isbn || "",
    coverImage: data.coverImage,
    genre: data.genre || "Uncategorized",
    publicationDate: data.publicationDate || "",
    description: data.description,
    reviews: [
      {
        id: "1",
        userId: "current-user", // Replace with actual user ID from auth
        userName: "Current User", // Replace with actual username
        rating: data.rating,
        content: data.reviewContent,
        createdAt: new Date().toISOString(),
      },
    ],
  }

  // Add the new book to our "database"
  books.push(newBook)

  // Revalidate the books page to show the new book
  revalidatePath("/books")

  // Redirect to the new book's page
  return { success: true, bookId: newBook.id }
}

