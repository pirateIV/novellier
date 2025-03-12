import type { Metadata } from "next";
import MainContainer from "@/components/main";
import Providers from "@/components/providers";
import { cormorant, grotesqueSans, interVar } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Review App",
  description:
    "Update your reading list, track your progress, and discover new books with our app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interVar.className} ${cormorant.variable} ${grotesqueSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-zinc-900 dark:text-white bg-white dark:bg-[var(--background)]">
        <Providers>
          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
