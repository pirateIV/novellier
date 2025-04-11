import {
  Bricolage_Grotesque,
  Libre_Baskerville,
  Work_Sans,
} from "next/font/google";
import localFont from "next/font/local";

export const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const grotesqueSans = Bricolage_Grotesque({
  variable: "--font-grotesque-sans",
  subsets: ["latin"],
});

export const interVar = localFont({
  src: [
    {
      path: "../public/fonts/InterVariable/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InterVariable/Inter-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/InterVariable/Inter-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/InterVariable/Inter-Bold.woff2",
      weight: "700",
      style: "semibold",
    },
    {
      path: "../public/fonts/InterVariable/Inter-ExtraBold.woff2",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../public/fonts/InterVariable/Inter-Black.woff2",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-inter",
});

export const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/Geist/Geist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist/Geist-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/Geist/Geist-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/Geist/Geist-Bold.ttf",
      weight: "700",
      style: "semibold",
    },
    {
      path: "../public/fonts/Geist/Geist-ExtraBold.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../public/fonts/Geist/Geist-Black.ttf",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-inter",
});

export const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
