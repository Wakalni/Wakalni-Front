"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  Download,
  Star,
} from "lucide-react";

// Sample data for charts
const salesData = [
  { date: "Mon", sales: 2400, orders: 45 },
  { date: "Tue", sales: 1800, orders: 38 },
  { date: "Wed", sales: 3200, orders: 52 },
  { date: "Thu", sales: 2800, orders: 48 },
  { date: "Fri", sales: 4200, orders: 68 },
  { date: "Sat", sales: 5100, orders: 82 },
  { date: "Sun", sales: 3800, orders: 61 },
];

const weeklySalesData = [
  { week: "Week 1", sales: 18500, orders: 294 },
  { week: "Week 2", sales: 22100, orders: 356 },
  { week: "Week 3", sales: 19800, orders: 318 },
  { week: "Week 4", sales: 24200, orders: 389 },
];

const monthlySalesData = [
  { month: "Jan", sales: 78500, orders: 1250 },
  { month: "Feb", sales: 82100, orders: 1340 },
  { month: "Mar", sales: 89800, orders: 1456 },
  { month: "Apr", sales: 94200, orders: 1523 },
  { month: "May", sales: 98500, orders: 1598 },
  { month: "Jun", sales: 102300, orders: 1672 },
];

const topRecipesData = [
  { name: "Margherita Pizza", orders: 156, revenue: 2494.44, color: "#ea580c" },
  { name: "Beef Burger", orders: 134, revenue: 2544.66, color: "#f97316" },
  { name: "Caesar Salad", orders: 98, revenue: 1225.0, color: "#fb923c" },
  { name: "Pasta Carbonara", orders: 87, revenue: 1478.13, color: "#fdba74" },
  { name: "Chicken Wings", orders: 76, revenue: 1899.24, color: "#fed7aa" },
];

const categoryData = [
  { name: "Main Courses", value: 45, color: "#ea580c" },
  { name: "Appetizers", value: 25, color: "#f97316" },
  { name: "Desserts", value: 20, color: "#fb923c" },
  { name: "Beverages", value: 10, color: "#fdba74" },
];

const peakHoursData = [
  { hour: "11 AM", orders: 12 },
  { hour: "12 PM", orders: 28 },
  { hour: "1 PM", orders: 35 },
  { hour: "2 PM", orders: 22 },
  { hour: "6 PM", orders: 45 },
  { hour: "7 PM", orders: 52 },
  { hour: "8 PM", orders: 48 },
  { hour: "9 PM", orders: 31 },
];

export function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("sales");

  const getCurrentData = () => {
    switch (timeRange) {
      case "day":
        return salesData;
      case "week":
        return weeklySalesData;
      case "month":
        return monthlySalesData;
      default:
        return salesData;
    }
  };

  const getMetricValue = (item: any) => {
    return selectedMetric === "sales" ? item.sales : item.orders;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "DZD",
    }).format(value);
  };

  const totalRevenue = topRecipesData.reduce(
    (sum, recipe) => sum + recipe.revenue,
    0
  );
  const totalOrders = topRecipesData.reduce(
    (sum, recipe) => sum + recipe.orders,
    0
  );
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Statistics & Analytics
          </h1>
          <p className="text-muted-foreground">
            Insights into your restaurant's performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +15.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalOrders.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +8.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +3.7% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Satisfaction
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +0.2 from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>
                Revenue and order trends over time
              </CardDescription>
            </div>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Revenue</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sales: {
                label: "Sales",
                color: "hsl(var(--chart-1))",
              },
              orders: {
                label: "Orders",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={
                    timeRange === "day"
                      ? "date"
                      : timeRange === "week"
                      ? "week"
                      : "month"
                  }
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-1)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Recipes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Recipes</CardTitle>
            <CardDescription>Best performing menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRecipesData.map((recipe, index) => (
                <div
                  key={recipe.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: recipe.color }}
                    />
                    <div>
                      <p className="font-medium">{recipe.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {recipe.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(recipe.revenue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {((recipe.revenue / totalRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Orders by menu category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Orders",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>Busiest times of the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="orders"
                    fill="var(--color-chart-3)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key business metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Revenue Growth
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800">+15.2%</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Customer Retention
                </span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">87%</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">
                  Avg. Prep Time
                </span>
              </div>
              <Badge className="bg-orange-100 text-orange-800">18 min</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">
                  Rating
                </span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">4.8/5</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trends</CardTitle>
          <CardDescription>
            Notable changes in your business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Weekend Sales</span>
              </div>
              <p className="text-2xl font-bold text-green-600">+23%</p>
              <p className="text-sm text-muted-foreground">
                Compared to weekdays
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Delivery Orders</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">+18%</p>
              <p className="text-sm text-muted-foreground">Growth this month</p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="font-medium">New Customers</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">+12%</p>
              <p className="text-sm text-muted-foreground">This week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
