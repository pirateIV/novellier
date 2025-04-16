import type { Metadata, Viewport } from "next";
import Providers from "@/components/providers";
import {
  libre,
  geistSans,
  grotesqueSans,
  interVar,
  workSans,
} from "@/lib/font";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { ViewTransitions } from "next-view-transitions";

import "./globals.css";

export const metadata: Metadata = {
  title: "Book Review App",
  description:
    "Update your reading list, track your progress, and discover new books with our app.",
};

export const viewPort: Viewport = {
    userScalable: false,   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${geistSans.className} ${workSans.variable} ${libre.variable} ${grotesqueSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <body className="text-zinc-900 dark:text-white bg-white dark:bg-[var(--background)]">
          <NextTopLoader
            height={3}
            showSpinner={false}
            color="linear-gradient(to right, #0EA5E9, #14B8A6)"
          />
          <Providers>
            {/* <ScrollRestorationWrapper> */}
            <main>
              {children}
              <Toaster />
            </main>
            {/* </ScrollRestorationWrapper> */}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
