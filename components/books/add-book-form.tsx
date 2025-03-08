"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { BookDetailsSection } from "./book-details-section"
import { BookReviewSection } from "./book-review-section"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  isbn: z.string().optional(),
  genre: z.string().optional(),
  publicationDate: z.date().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  coverImage: z.string().optional(),
  rating: z.number().min(1).max(5),
  reviewContent: z.string().min(1, { message: "Review is required" }),
})

export type BookFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<BookFormValues> = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  description: "",
  coverImage: "",
  rating: 3,
  reviewContent: "",
}

export function AddBookForm({ genres = [] }: { genres: string[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [bookExists, setBookExists] = useState(false)

  const form = useForm<BookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const checkIfBookExists = async () => {
    const title = form.getValues("title")
    const author = form.getValues("author")

    if (!title || !author) return

    setIsChecking(true)
    // Simulate API call to check if book exists
    setTimeout(() => {
      setIsChecking(false)
      setBookExists(false) // Set to true if book exists in your database
    }, 500)
  }

  const onSubmit = async (data: BookFormValues) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", data)
      router.push("/books") // Redirect to books list
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <BookDetailsSection form={form} genres={genres} checkIfBookExists={checkIfBookExists} />
            <BookReviewSection form={form} />
          </div>

          {bookExists && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
              This book already exists in your collection.
            </div>
          )}

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" disabled={isSubmitting || isChecking || bookExists} className="w-full md:w-auto">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Adding Book..." : "Add Book"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full md:w-auto">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

