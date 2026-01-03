import { Plus, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import formatCurrency from "@/lib/formatCurrency";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChartBarInteractive } from "../../../components/charts/dasboard";
import { startOfYear, endOfYear } from "date-fns";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }
  const now = new Date();
  const startOfThisYear = startOfYear(now);
  const endOfThisYear = endOfYear(now);
  const [bookingCount, userCount, reservations] = await Promise.all([
    prisma.reservations.count({ where: { paymentStatus: true } }),
    prisma.user.count(),
    prisma.reservations.findMany({
      where: {
        paymentStatus: true,
        createdAt: {
          gte: startOfThisYear,
          lt: endOfThisYear,
        },
      },
      select: {
        balanceAmount: true,
        room: true,
        advanceAmount: true,
        discount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);

  const roomPrices: Record<string, number> = {
    "Majestic Theatre": 1899,
    "Dreamscape Theatre": 1499,
  };

  const money = reservations.reduce((total, reservation) => {
    return (
      total +
      (reservation.advanceAmount + reservation.balanceAmount) -
      (reservation.discount ?? 0)
    );
  }, 0);

  return (
    <div className="flex container pt-10 w-full min-h-screen flex-col bg-background">
      <div className="space-y-4">
        <div className="flex justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link draggable={false} href={"/dashboard/recent-bookings"}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingCount}</div>
              </CardContent>
            </Card>
          </Link>
          <Link draggable={false} href={"/dashboard/users"}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCount}</div>
              </CardContent>
            </Card>
          </Link>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Money</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">₹</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(money)}</div>
            </CardContent>
          </Card>
        </div>
        <ChartBarInteractive reservations={reservations} />
      </div>
    </div>
  );
}
