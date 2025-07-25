import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster as Sonner } from "sonner";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Admin Panel - Golden Hour Celebrations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark ${poppins.className}`}>
        <SidebarProvider>
          <Sonner richColors position="top-right" theme="dark" />
          <Button
            className="fixed top-3 right-3 z-50"
            variant={"ghost"}
            size={"icon"}
            asChild
          >
            <SidebarTrigger />
          </Button>
          <AppSidebar />
          <TanstackProvider>{children}</TanstackProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
