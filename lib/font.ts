import localFont from "next/font/local";

export const interVar = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Thin.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "../public/fonts/Inter-ExtraLight.woff2",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../public/fonts/Inter-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "semibold",
    },
    {
      path: "../public/fonts/Inter-ExtraBold.woff2",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../public/fonts/Inter-Black.woff2",
      weight: "900",
      style: "black",
    },
  ],
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
