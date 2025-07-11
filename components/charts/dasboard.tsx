"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReservationsWithTotalPrice } from "@/lib/types";
import { format, parseISO } from "date-fns";

function transformReservationsToChartData(
  reservations: ReservationsWithTotalPrice[],
  selectedYear: string
) {
  const groupedRevenue: Record<string, number> = {};

  for (const reservation of reservations) {
    const monthKey = format(reservation.createdAt, "yyyy-MM-01");

    const revenue =
      reservation.balanceAmount +
      reservation.advanceAmount -
      (reservation.discount ?? 0);

    groupedRevenue[monthKey] = (groupedRevenue[monthKey] ?? 0) + revenue;
  }

  // Ensure all months are included
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0"); // "01", "02", ..., "12"
    const date = `${selectedYear}-${month}-01`;
    return {
      date,
      revenue: groupedRevenue[date] ?? 0,
    };
  });

  return chartData;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartBarInteractive({
  reservations,
}: {
  reservations: ReservationsWithTotalPrice[];
}) {
  const baseYear = 2025;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const yearOptions = Array.from(
    { length: currentYear - baseYear + 1 },
    (_, i) => (baseYear + i).toString()
  );

  const { data } = useQuery({
    initialData: reservations,
    queryKey: ["reservations", selectedYear],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboardRevenue?year=" + selectedYear
      );
      const data: ReservationsWithTotalPrice[] = await response.json();
      return data;
    },
    enabled: !!selectedYear && selectedYear !== currentYear.toString(),
  });

  const chartData = transformReservationsToChartData(data, selectedYear);

  return (
    <div className="flex flex-col pt-10">
      <h1 className="text-2xl font-bold">Revenue</h1>
      <Select onValueChange={setSelectedYear} value={selectedYear}>
        <SelectTrigger className="w-[100px] self-end">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearOptions.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ChartContainer
        className="aspect-auto h-[350px] w-full"
        config={chartConfig}
      >
        <AreaChart
          data={chartData}
          accessibilityLayer
          margin={{ top: 20, right: 12, left: 12, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const month = value.split("-")[1];
              const date = new Date(`2000-${month}-01`);
              return date.toLocaleString("default", { month: "short" });
            }}
          />
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="revenue"
            type="natural"
            fill="url(#fillRevenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
