import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import Whatsapp from "@/components/whatsapp";
import TanstackProvider from "@/providers/TanstackProvider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenthourcelebrations.in"),
  title: {
    template: "%s - Golden Hour Celebrations",
    default: "Golden Hour Celebrations",
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
      <body className={`${poppins.className} antialiased`}>
        <Whatsapp />
        <Analytics />
        <GoogleAnalytics gaId="G-QL5YQVXZ5V" />
        <GoogleTagManager gtmId="GTM-MHK9L5HR" />
        <TanstackProvider>
          <Navbar />
          <Toaster richColors position="top-right" theme="light" />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
