import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
} from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome back, Chef!</h1>
        <p className="text-muted-foreground">
          Here's what's happening at your restaurant today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847 DZD</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Currently dining</p>
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
            <div className="text-2xl font-bold">22.40 DZD</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#1247",
                  customer: "Sarah Johnson",
                  items: "2x Margherita Pizza, 1x Caesar Salad",
                  status: "preparing",
                  time: "2 min ago",
                },
                {
                  id: "#1246",
                  customer: "Mike Chen",
                  items: "1x Beef Burger, 1x Fries",
                  status: "ready",
                  time: "5 min ago",
                },
                {
                  id: "#1245",
                  customer: "Emma Davis",
                  items: "1x Pasta Carbonara",
                  status: "completed",
                  time: "12 min ago",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      <Badge
                        variant={
                          order.status === "preparing"
                            ? "default"
                            : order.status === "ready"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status === "preparing" && (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {order.status === "ready" && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.items}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {order.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Recipes Today</CardTitle>
            <CardDescription>Most popular dishes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Margherita Pizza", orders: 23, revenue: "345 DZD" },
                { name: "Beef Burger", orders: 18, revenue: "270 DZD" },
                { name: "Caesar Salad", orders: 15, revenue: "180 DZD" },
                { name: "Pasta Carbonara", orders: 12, revenue: "192 DZD" },
              ].map((recipe, index) => (
                <div
                  key={recipe.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{recipe.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {recipe.orders} orders
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-primary">
                    {recipe.revenue}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
