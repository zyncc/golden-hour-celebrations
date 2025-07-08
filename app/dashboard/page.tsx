import { Plus, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import formatCurrency from "@/lib/formatCurrency";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function AdminDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const [bookingCount, userCount, reservations] = await Promise.all([
    prisma.reservations.count({ where: { paymentStatus: true } }),
    prisma.user.count(),
    prisma.reservations.findMany({
      where: {
        paymentStatus: true,
        createdAt: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      select: {
        balanceAmount: true,
        room: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);

  const roomPrices: Record<string, number> = {
    "Majestic Theatre": 1499,
    "Dreamscape Theatre": 1499,
  };

  const totalEarned = reservations.reduce((total, reservation) => {
    return total + roomPrices[reservation.room];
  }, 0);

  return (
    <div className="flex mt-[100px] container min-h-screen flex-col bg-background">
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/admin/bookings/create"}>
              <Button variant={"outline"}>
                <Plus className="mr-2 h-4 w-4" />
                Create Booking
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link draggable={false} href={"/admin/bookings"}>
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
          <Link draggable={false} href={"/admin/users"}>
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
              <div className="text-2xl font-bold">
                {formatCurrency(totalEarned)}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No bookings yet
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New user registered
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Dashboard viewed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
