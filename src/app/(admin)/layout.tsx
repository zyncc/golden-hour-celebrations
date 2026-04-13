import { auth } from "@/auth";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanstackProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Admin Panel - Golden Hour Celebrations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return redirect(`admin.${process.env.BETTER_AUTH_URL}/signin`);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} dark antialiased`}>
        <Toaster richColors position="top-right" theme="dark" />
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <TanstackProvider>{children}</TanstackProvider>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
