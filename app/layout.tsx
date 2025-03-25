import type { Metadata } from "next";
import Providers from "@/components/providers";
import { cormorant, grotesqueSans, interVar, workSans } from "@/lib/font";
import { Toaster } from "@/components/ui/sonner";
import ScrollRestorationWrapper from "@/components/scroll-restoration";

import "./globals.css";

export const metadata: Metadata = {
  title: "Book Review App",
  description:
    "Update your reading list, track your progress, and discover new books with our app.",
  openGraph: {
    images: { url: "/og-image.png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interVar.className} ${workSans.variable} ${cormorant.variable} ${grotesqueSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-zinc-900 dark:text-white bg-white dark:bg-[var(--background)]">
        <Providers>
          <ScrollRestorationWrapper>
            <main>
              {children}
              <Toaster />
            </main>
          </ScrollRestorationWrapper>
        </Providers>
      </body>
    </html>
  );
}
