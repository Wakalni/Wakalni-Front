"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Search,
  User,
  Phone,
  MapPin,
  DollarSign,
  ChefHat,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  orderType: "dine-in" | "takeout" | "delivery";
  createdAt: Date;
  estimatedTime?: number;
  tableNumber?: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-1247",
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 123-4567",
    customerAddress: "123 Main St, Downtown",
    items: [
      { id: "1", name: "Margherita Pizza", quantity: 2, price: 15.99 },
      { id: "2", name: "Caesar Salad", quantity: 1, price: 12.5 },
    ],
    total: 44.48,
    status: "preparing",
    orderType: "delivery",
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    estimatedTime: 25,
  },
  {
    id: "ORD-1246",
    customerName: "Mike Chen",
    customerPhone: "+1 (555) 987-6543",
    items: [
      { id: "3", name: "Beef Burger", quantity: 1, price: 18.99 },
      { id: "4", name: "French Fries", quantity: 1, price: 6.99 },
      { id: "5", name: "Coke", quantity: 2, price: 2.99 },
    ],
    total: 31.96,
    status: "ready",
    orderType: "takeout",
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    estimatedTime: 15,
  },
  {
    id: "ORD-1245",
    customerName: "Emma Davis",
    customerPhone: "+1 (555) 456-7890",
    items: [{ id: "6", name: "Pasta Carbonara", quantity: 1, price: 16.99 }],
    total: 16.99,
    status: "completed",
    orderType: "dine-in",
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
    tableNumber: "Table 7",
  },
  {
    id: "ORD-1244",
    customerName: "John Smith",
    customerPhone: "+1 (555) 321-0987",
    customerAddress: "456 Oak Ave, Uptown",
    items: [
      { id: "7", name: "Chicken Wings", quantity: 12, price: 24.99 },
      { id: "8", name: "Onion Rings", quantity: 1, price: 8.99 },
    ],
    total: 33.98,
    status: "pending",
    orderType: "delivery",
    createdAt: new Date(Date.now() - 1 * 60 * 1000),
    estimatedTime: 30,
  },
];

export function OrderPanel() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.orderType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "preparing":
        return <ChefHat className="h-4 w-4" />;
      case "ready":
        return <Package className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 minute ago";
    return `${minutes} minutes ago`;
  };

  const ordersByStatus = {
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Orders Management</h1>
        <p className="text-muted-foreground">
          Track and manage incoming orders
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {ordersByStatus.pending}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {ordersByStatus.preparing}
                </p>
              </div>
              <ChefHat className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold text-green-600">
                  {ordersByStatus.ready}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-gray-600">
                  {ordersByStatus.completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search orders or customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="dine-in">Dine In</SelectItem>
            <SelectItem value="takeout">Takeout</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=40&width=40&query=${order.customerName}`}
                    />
                    <AvatarFallback>
                      {order.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {order.orderType.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {order.customerName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order.customerPhone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(order.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary font-bold text-lg">
                    <DollarSign className="h-4 w-4" />
                    {order.total.toFixed(2)}
                  </div>
                  {order.estimatedTime && (
                    <p className="text-sm text-muted-foreground">
                      Est. {order.estimatedTime} min
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              {(order.customerAddress || order.tableNumber) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {order.customerAddress || order.tableNumber}
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "completed")}
                    >
                      Complete Order
                    </Button>
                  )}
                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="text-destructive hover:text-destructive"
                      >
                        Cancel
                      </Button>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Orders will appear here when customers place them"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
