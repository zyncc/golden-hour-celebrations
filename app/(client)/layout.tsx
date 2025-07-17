import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/providers/TanstackProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Whatsapp from "@/components/whatsapp";
import { Toaster as Sonner } from "sonner";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Golden Hour Celebrations",
    default: "Golden Hour Celebrations",
  },
  description:
    "Book intimate private theatre experiences for birthdays, proposals, anniversaries, and more at Golden Hour Celebrations, Jayanagar. Cozy, customizable, and unforgettable.",
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
        <GoogleAnalytics gaId="GTM-MHK9L5HR" />
        <GoogleAnalytics gaId="AW-17081168224" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={`dark ${poppins.className}`}>
        <Whatsapp />
        <GoogleAnalytics gaId="G-QL5YQVXZ5V" />
        <TanstackProvider>
          <Navbar />
          <Toaster />
          <Sonner richColors position="top-right" theme="dark" />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
