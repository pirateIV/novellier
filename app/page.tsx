import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Star,
  Search,
  Users,
  TrendingUp,
  BookMarked,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-between bg-gradient-to-br from-transparent via-transparent to-yellow-600/60">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-serif text-gray-900">
              BookCritic
            </span>
          </div>
          <nav className="hidden md:flex gap-6 md:justify-center">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#reviews"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden sm:inline-block"
            >
              Log in
            </Link>
            <Button className="rounded-full">Sign up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-br from-transparent via-transparent to-yellow-600/60">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] justify-items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-zinc-950 font-[cormorant] sm:text-5xl xl:text-6xl/none dark:text-white">
                    Discover Your Next Great Read
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    Join our community of book lovers. Read and write reviews,
                    track your reading journey, and connect with fellow
                    bibliophiles.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="rounded-full shadow-sm shadow-gray-400 dark:bg-zinc-50"
                    asChild
                  >
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 rounded-full border-none inset-ring inset-ring-white/20 inset-shadow-white bg-gray-50 ring-1 ring-gray-300 inset-shadow-sm shadow-gray-400 dark:ring-zinc-900 dark:inset-shadow-white/30 dark:bg-white/20"
                    asChild
                  >
                    <Link href="#">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[300px] sm:h-[450px] mt-10 sm:w-[400px] lg:h-[500px] lg:w-[450px]">
                  <Image
                    src="/books/hp2.png"
                    alt="BookCritic App Preview"
                    fill
                    className="object-cover lg:scale-150"
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
                  Features You'll Love
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to enhance your reading experience in one
                  place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Discover Books</h3>
                <p className="text-center text-muted-foreground">
                  Find your next favorite book with our powerful search and
                  recommendation engine.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Star className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Rate & Review</h3>
                <p className="text-center text-muted-foreground">
                  Share your thoughts and see what others think about the latest
                  bestsellers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookMarked className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Track Reading</h3>
                <p className="text-center text-muted-foreground">
                  Keep a log of books you've read, want to read, and are
                  currently reading.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Join Discussions</h3>
                <p className="text-center text-muted-foreground">
                  Participate in book clubs and discussions with readers from
                  around the world.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <TrendingUp className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Reading Stats</h3>
                <p className="text-center text-muted-foreground">
                  Visualize your reading habits with detailed statistics and
                  insights.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Reading Challenges</h3>
                <p className="text-center text-muted-foreground">
                  Set reading goals and track your progress with our challenge
                  system.
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
                  Trending Reviews
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our community is reading and reviewing right now.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-3 rounded-lg border p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-[100px] w-[70px] relative">
                      <Image
                        src={`/placeholder.svg?height=100&width=70`}
                        alt="Book cover"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">Book Title {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Author Name
                      </p>
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
                    "This book completely changed my perspective. The character
                    development was outstanding and the plot kept me engaged
                    until the very last page."
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <p className="text-sm font-medium">Reader Name</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Reviews
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our community has
                  to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div>
                      <h3 className="font-bold">User Name {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Avid Reader
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "BookCritic has transformed how I discover new books. The
                    recommendations are spot-on, and I love being able to track
                    my reading progress throughout the year."
                  </p>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <Star
                          key={j}
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">
                    Perfect for casual readers
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic book tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Read and write reviews</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Join discussions</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground">
                    For dedicated book lovers
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$4.99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced reading statistics</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom reading challenges</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Ad-free experience</span>
                  </li>
                </ul>
                <Button className="mt-8">Subscribe Now</Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Family</h3>
                  <p className="text-muted-foreground">
                    Share with your loved ones
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 5 family members</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Family reading challenges</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-primary" />
                    <span>Shared bookshelves</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Your Reading Journey?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of readers who have already discovered their
                  next favorite book with BookCritic.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-primary-foreground text-foreground"
                  />
                  <Button type="submit" variant="secondary">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Take BookCritic Everywhere
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Download our mobile app to access your reading list,
                    reviews, and recommendations on the go.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex items-center gap-2" variant="outline">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="App Store"
                      width={24}
                      height={24}
                    />
                    App Store
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Google Play"
                      width={24}
                      height={24}
                    />
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-[200px] sm:h-[500px] sm:w-[250px]">
                  <Image
                    src="/placeholder.svg?height=500&width=250"
                    alt="BookCritic Mobile App"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6 md:w-1/3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">BookCritic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for book reviews, recommendations, and
              reading insights.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:flex-1">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BookCritic. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
