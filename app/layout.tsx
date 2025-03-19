import type { Metadata } from "next";
import Providers from "@/components/providers";
import { cormorant, grotesqueSans, interVar } from "@/lib/font";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Review App",
  description:
    "Update your reading list, track your progress, and discover new books with our app.",
};

const geistSans = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${cormorant.variable} ${grotesqueSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-zinc-900 dark:text-white bg-white dark:bg-[var(--background)]">
        <Providers>
          <main>
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
