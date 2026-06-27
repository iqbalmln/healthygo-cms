"use client";

import { addDays, format, parseISO, subDays } from "date-fns";
import { Area, CartesianGrid, ComposedChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const visitorCounts = [
  120, 145, 132, 160, 178, 190, 165, 210, 198, 230, 245, 220, 260, 280, 250, 300, 312, 290, 330, 342, 310, 355, 360,
  340, 380, 395, 370, 410, 420, 400,
];

const endDate = new Date();
const startDate = subDays(endDate, visitorCounts.length - 1);

const chartData = visitorCounts.map((visitors, index) => ({
  date: format(addDays(startDate, index), "yyyy-MM-dd"),
  visitors,
}));

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function PerformanceOverview() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="leading-none">Visitor Trend</CardTitle>
        <CardDescription>Public site visitors over the last 30 days</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
          <ComposedChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                parseISO(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-44"
                  indicator="line"
                  labelFormatter={(value) => format(parseISO(value), "d MMMM yyyy")}
                />
              }
            />

            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillVisitors)"
              stroke="var(--color-visitors)"
              strokeWidth={1.5}
              dot={false}
              fillOpacity={1}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
