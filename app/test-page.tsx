import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Star,
  Search,
  Users,
  BookMarked,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Bookmark,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-between bg-gradient-to-br from-transparent via-transparent to-purple-600/40">
      {/* Header */}
      <header className="sticky top-0 z-50 min-w-3xl mt-4 mx-auto  border  rounded-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30">
        {/* <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/30"> */}
        <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            {/* <span className="text-xl font-bold font-serif text-gray-900">BookWorm</span> */}
          </div>
          <nav className="hidden md:flex gap-6 md:justify-center *:text-sm *:font-medium *:text-gray-700 dark:text-gray-300  *:transition-colors *:dark:text-white">
            <Link
              href="#features"
              className="hover:text-gray-900 dark:hover:text-white "
            >
              Features
            </Link>
            <Link
              href="/genres"
              className="hover:text-gray-900 dark:hover:text-white "
            >
              Genres
            </Link>
            <Link
              href="/Reviews"
              className="hover:text-gray-900 dark:hover:text-white "
            >
              Reviews
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden sm:inline-block"
            >
              Sign in
            </Link>
            <Button className="rounded-full">Sign up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-br from-transparent via-transparent to-purple-600/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] justify-items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-zinc-950 font-[cormorant] sm:text-5xl xl:text-6xl/none dark:text-white">
                    Share Your Reading Journey
                  </h1>
                  <p className="max-w-[600px] text-neutral-400 md:text-lg">
                    A simple book review platform to track your reading
                    progress, share your thoughts, and discover new books from
                    fellow readers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="rounded-full shadow-sm shadow-gray-400 dark:bg-zinc-50 bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                  {/* <Button
                    size="lg"
                    variant="outline"
                    className="border-2 rounded-full border-none inset-ring inset-ring-white/20 inset-shadow-white bg-gray-50 ring-1 ring-gray-300 inset-shadow-sm shadow-gray-400 dark:ring-zinc-900 dark:inset-shadow-white/30 dark:bg-white/20"
                    asChild
                  >
                    <Link href="#">Project Info</Link>
                  </Button> */}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[300px] sm:h-[450px] mt-10 sm:w-[400px] lg:h-[500px] lg:w-[450px]">
                  <Image
                    src="/books/hp2.png"
                    alt="Harry Potter Book Cover"
                    fill
                    className="object-contain lg:scale-150"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Awesome Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to enhance your reading experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Search className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Book Search</h3>
                <p className="text-center text-muted-foreground">
                  Powerful search functionality to find books by title, author,
                  or genre.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Star className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Review System</h3>
                <p className="text-center text-muted-foreground">
                  Star rating and text review system with full editing
                  capabilities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookMarked className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Reading List</h3>
                <p className="text-center text-muted-foreground">
                  Track books you want to read, are currently reading, or have
                  finished.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">User Profiles</h3>
                <p className="text-center text-muted-foreground">
                  Simple user authentication and profile management for the
                  assignment.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MessageSquare className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Comments</h3>
                <p className="text-center text-muted-foreground">
                  Basic commenting system to discuss books and reviews with
                  other users.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <ThumbsUp className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Recommendations</h3>
                <p className="text-center text-muted-foreground">
                  Algorithm to suggest books based on your reading history and
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Sample Reviews
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Example book reviews to demonstrate the functionality.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-3 rounded-lg border p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-[100px] w-[70px] relative">
                    {/* <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hp2-cESXqTeygYJ7wZMt8Fz6qmPG3RRu5y.png"
                      alt="Harry Potter Book Cover"
                      fill
                      className="object-cover rounded"
                    /> */}
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Harry Potter and the Sorcerer's Stone
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      J.K. Rowling
                    </p>
                    <div className="flex items-center mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 5 ? "text-yellow-500" : "text-muted"
                            }`}
                            fill={j < 5 ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "An enchanting start to the series. The worldbuilding is
                  fantastic and the characters are immediately lovable. Perfect
                  for readers of all ages."
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-700">
                      JS
                    </span>
                  </div>
                  <p className="text-sm font-medium">John Smith</p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-[100px] w-[70px] relative">
                    <Image
                      src="/placeholder.svg?height=100&width=70"
                      alt="Book cover"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">To Kill a Mockingbird</h3>
                    <p className="text-sm text-muted-foreground">Harper Lee</p>
                    <div className="flex items-center mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 4 ? "text-yellow-500" : "text-muted"
                            }`}
                            fill={j < 4 ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "A powerful exploration of racial injustice and moral growth.
                  Scout's perspective offers a unique lens on complex social
                  issues."
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-700">
                      AJ
                    </span>
                  </div>
                  <p className="text-sm font-medium">Amy Johnson</p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-[100px] w-[70px] relative">
                    {/* <Image
                      src="/placeholder.svg?height=100&width=70"
                      alt="Book cover"
                      fill
                      className="object-cover rounded"
                    /> */}
                  </div>
                  <div>
                    <h3 className="font-bold">The Great Gatsby</h3>
                    <p className="text-sm text-muted-foreground">
                      F. Scott Fitzgerald
                    </p>
                    <div className="flex items-center mt-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 3 ? "text-yellow-500" : "text-muted"
                            }`}
                            fill={j < 3 ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "A beautifully written critique of the American Dream. The
                  symbolism is rich, though I found some characters difficult to
                  connect with."
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-700">
                      MP
                    </span>
                  </div>
                  <p className="text-sm font-medium">Mike Peterson</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View More Reviews
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Our Community
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with fellow book lovers and expand your literary
                  horizons.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12 grid md:grid-cols-3 gap-8">
              <div className="rounded-lg border bg-background p-6 shadow-sm flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Book Clubs</h3>
                <p className="text-muted-foreground">
                  Join virtual book clubs focused on different genres and
                  authors. Discuss and analyze together.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm flex flex-col items-center text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Reading Challenges</h3>
                <p className="text-muted-foreground">
                  Set personal reading goals and track your progress. Compete
                  with friends in friendly challenges.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm flex flex-col items-center text-center">
                <Bookmark className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Curated Lists</h3>
                <p className="text-muted-foreground">
                  Discover hand-picked book collections for every mood,
                  occasion, and interest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Reading Journey
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of readers who have already discovered their
                  next favorite book with BookWorm.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email (demo only)"
                    className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-white/70 border-white/20"
                  />
                  <Button type="submit" variant="secondary">
                    Try Demo
                  </Button>
                </form>
                <p className="text-xs text-white/70">
                  Sign up for free and start tracking your reading journey
                  today.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">BookWorm</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your personal book tracking and review platform. Discover, read,
              and share your literary adventures.
            </p>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} BookWorm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
