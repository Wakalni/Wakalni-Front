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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Building2,
} from "lucide-react";

// Mock data for statistics
const revenueByRestaurant = [
  { name: "Pizza Palace", revenue: 45000, orders: 1200, growth: 12 },
  { name: "Sushi Master", revenue: 78000, orders: 890, growth: 25 },
  { name: "Burger King", revenue: 32000, orders: 1500, growth: -5 },
  { name: "Cafe Mocha", revenue: 25000, orders: 650, growth: 18 },
  { name: "Taco Bell", revenue: 55000, orders: 1100, growth: 8 },
];

const ordersByCategory = [
  { category: "Fast Food", orders: 15420, percentage: 35 },
  { category: "Fine Dining", orders: 8760, percentage: 20 },
  { category: "Casual Dining", orders: 10950, percentage: 25 },
  { category: "Cafes", orders: 6570, percentage: 15 },
  { category: "Others", orders: 2190, percentage: 5 },
];

const customerGrowth = [
  { month: "Jul", customers: 38000, newCustomers: 2100 },
  { month: "Aug", customers: 40200, newCustomers: 2200 },
  { month: "Sep", customers: 42100, newCustomers: 1900 },
  { month: "Oct", customers: 43800, newCustomers: 1700 },
  { month: "Nov", customers: 44900, newCustomers: 1100 },
  { month: "Dec", customers: 45231, newCustomers: 331 },
];

const platformMetrics = [
  { month: "Jul", revenue: 285000, commission: 28500, orders: 12400 },
  { month: "Aug", revenue: 312000, commission: 31200, orders: 13600 },
  { month: "Sep", revenue: 298000, commission: 29800, orders: 13100 },
  { month: "Oct", revenue: 345000, commission: 34500, orders: 14800 },
  { month: "Nov", revenue: 321000, commission: 32100, orders: 14200 },
  { month: "Dec", revenue: 328000, commission: 32800, orders: 14500 },
];

const categoryColors = ["#3b82f6", "#9333ea", "#f97316", "#10b981", "#ef4444"];

export function GlobalStatistics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("revenue");

  const handleExportReport = (format: string) => {
    console.log(`[v0] Exporting ${reportType} report as ${format}`);
    // In a real app, this would generate and download the report
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Global Statistics
          </h1>
          <p className="text-muted-foreground">
            Platform-wide analytics and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Platform Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,989,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82,600</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.08</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+3.8%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Commission
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$198,900</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="orders">Order Analytics</TabsTrigger>
          <TabsTrigger value="customers">Customer Growth</TabsTrigger>
          <TabsTrigger value="reports">Export Reports</TabsTrigger>
        </TabsList>

        {/* Revenue Analytics */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Restaurant */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Restaurant</CardTitle>
                <CardDescription>
                  Top performing restaurants by revenue
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
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueByRestaurant} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Platform Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue and commission over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    commission: {
                      label: "Commission",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={platformMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="commission"
                        stroke="var(--color-commission)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Performance</CardTitle>
              <CardDescription>
                Detailed performance metrics by restaurant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByRestaurant.map((restaurant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{restaurant.name}</h3>
                      <div className="flex gap-6 mt-1 text-sm text-muted-foreground">
                        <span>
                          Revenue: ${restaurant.revenue.toLocaleString()}
                        </span>
                        <span>Orders: {restaurant.orders}</span>
                        <span>
                          Avg Order: $
                          {(restaurant.revenue / restaurant.orders).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {restaurant.growth > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          restaurant.growth > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {restaurant.growth > 0 ? "+" : ""}
                        {restaurant.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Analytics */}
        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Orders by Category</CardTitle>
                <CardDescription>
                  Distribution of orders across restaurant categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    orders: {
                      label: "Orders",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ordersByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="orders"
                      >
                        {ordersByCategory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={categoryColors[index % categoryColors.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {ordersByCategory.map((category, index) => (
                    <div
                      key={category.category}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[index % categoryColors.length],
                        }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {category.category} ({category.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Volume Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Order Volume Trend</CardTitle>
                <CardDescription>
                  Monthly order volume across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    orders: {
                      label: "Orders",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="orders" fill="var(--color-orders)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Growth */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth Trends</CardTitle>
              <CardDescription>
                Total customers and new customer acquisition over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  customers: {
                    label: "Total Customers",
                    color: "hsl(var(--chart-1))",
                  },
                  newCustomers: {
                    label: "New Customers",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="var(--color-customers)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="newCustomers"
                      stroke="var(--color-newCustomers)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export Reports */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>
                Generate and download detailed reports for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Financial Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Revenue Report</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Detailed revenue breakdown by restaurant, category, and
                        time period
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleExportReport("csv")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          CSV
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExportReport("pdf")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Commission Report</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Platform commission earnings and restaurant payouts
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleExportReport("csv")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          CSV
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExportReport("pdf")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Operational Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Order Analytics</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Order volume, trends, and performance metrics
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleExportReport("csv")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          CSV
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExportReport("pdf")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Customer Report</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Customer growth, retention, and behavior analysis
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleExportReport("csv")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          CSV
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExportReport("pdf")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Custom Reports</h3>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Generate Custom Report</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create custom reports with specific date ranges and
                      metrics
                    </p>
                    <div className="flex gap-2">
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">
                            Revenue Analysis
                          </SelectItem>
                          <SelectItem value="orders">Order Analysis</SelectItem>
                          <SelectItem value="customers">
                            Customer Analysis
                          </SelectItem>
                          <SelectItem value="restaurants">
                            Restaurant Performance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleExportReport("custom")}>
                        <Download className="w-4 h-4 mr-1" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
