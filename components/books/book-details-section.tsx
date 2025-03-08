"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { BookFormValues } from "./add-book-form"

interface BookDetailsSectionProps {
  form: UseFormReturn<BookFormValues>
  genres: string[]
  checkIfBookExists: () => void
}

export function BookDetailsSection({ form, genres, checkIfBookExists }: BookDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Book Details</h2>

        <div className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the book title"
                    {...field}
                    onBlur={() => checkIfBookExists()}
                    className="bg-white dark:bg-gray-950"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the author's name"
                    {...field}
                    onBlur={() => checkIfBookExists()}
                    className="bg-white dark:bg-gray-950"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN (optional)" {...field} className="bg-white dark:bg-gray-950" />
                  </FormControl>
                  <FormDescription className="text-xs">The book's ISBN number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-gray-950">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publication Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white dark:bg-gray-950",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">When was the book published?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description of the book"
                    className="min-h-[120px] bg-white dark:bg-gray-950"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL to the book cover image" {...field} className="bg-white dark:bg-gray-950" />
                </FormControl>
                <FormDescription className="text-xs">Leave empty to use a placeholder image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

