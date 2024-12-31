import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/providers/TanstackProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Golden Hour Private Theatre Celebrations",
    default: "Golden Hour Private Theatre Celebrations",
  },
  description:
    "We at Golden Hour Celebrations plan your loved ones special day with personalised decorations exclusively in a private theatre.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={`dark ${poppins.className}`}>
        <GoogleAnalytics gaId="G-QL5YQVXZ5V" />
        <TanstackProvider>
          <Navbar />
          <Toaster />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
