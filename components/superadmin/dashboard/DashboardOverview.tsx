"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const revenueData = [
  { month: "Jan", revenue: 45000, orders: 1200 },
  { month: "Feb", revenue: 52000, orders: 1400 },
  { month: "Mar", revenue: 48000, orders: 1300 },
  { month: "Apr", revenue: 61000, orders: 1600 },
  { month: "May", revenue: 55000, orders: 1500 },
  { month: "Jun", revenue: 67000, orders: 1800 },
];

const categoryData = [
  { name: "Fast Food", value: 35, color: "#3b82f6" },
  { name: "Fine Dining", value: 25, color: "#9333ea" },
  { name: "Casual Dining", value: 20, color: "#f97316" },
  { name: "Cafes", value: 15, color: "#10b981" },
  { name: "Others", value: 5, color: "#ef4444" },
];

const recentActivities = [
  {
    id: 1,
    type: "registration",
    restaurant: "Pizza Palace",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "suspension",
    restaurant: "Burger King",
    time: "4 hours ago",
    status: "suspended",
  },
  {
    id: 3,
    type: "registration",
    restaurant: "Sushi Master",
    time: "6 hours ago",
    status: "approved",
  },
  {
    id: 4,
    type: "payout",
    restaurant: "Taco Bell",
    time: "8 hours ago",
    status: "completed",
  },
];

export function SuperadminOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Platform Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor your multi-restaurant platform performance
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Restaurants
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328,000 DZD</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-3%</span> from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly platform revenue over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Restaurant Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Categories</CardTitle>
            <CardDescription>by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {category.name} ({category.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Latest platform activities and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {activity.type === "registration" && (
                      <Building2 className="w-4 h-4 text-blue-500" />
                    )}
                    {activity.type === "suspension" && (
                      <Users className="w-4 h-4 text-red-500" />
                    )}
                    {activity.type === "payout" && (
                      <DollarSign className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {activity.type === "registration" &&
                        "New restaurant registration"}
                      {activity.type === "suspension" && "Restaurant suspended"}
                      {activity.type === "payout" && "Payout processed"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.restaurant}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      activity.status === "approved" ||
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
