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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  Settings,
  BarChart3,
  Star,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

export default function RestaurantAdminProfile() {
  const [isOpen, setIsOpen] = useState(true);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [takeoutEnabled, setTakeoutEnabled] = useState(true);

  const restaurantStats = {
    totalOrders: 1247,
    revenue: 28450.75,
    rating: 4.6,
    customers: 892,
  };

  const recentOrders = [
    {
      id: "1",
      customer: "John D.",
      items: "2x Pizza Margherita",
      amount: 24.99,
      status: "preparing",
    },
    {
      id: "2",
      customer: "Sarah M.",
      items: "1x Burger Deluxe",
      amount: 18.5,
      status: "ready",
    },
    {
      id: "3",
      customer: "Mike R.",
      items: "3x Sushi Roll",
      amount: 32.0,
      status: "delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Restaurant Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/restaurant-logo.png" />
                  <AvatarFallback className="text-lg">PP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">Pizza Palace</CardTitle>
                  <CardDescription>
                    Italian Restaurant • Downtown
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant={isOpen ? "default" : "secondary"}>
                      {isOpen ? "Open" : "Closed"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {restaurantStats.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Status</p>
                <Switch checked={isOpen} onCheckedChange={setIsOpen} />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">
                    {restaurantStats.totalOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">
                    ${restaurantStats.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{restaurantStats.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">
                    {restaurantStats.customers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Restaurant Name</Label>
                    <Input id="name" defaultValue="Pizza Palace" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Authentic Italian cuisine with fresh ingredients and traditional recipes."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Select defaultValue="italian">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St, Downtown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="info@pizzapalace.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Monday</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="9:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="22:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Tuesday</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="9:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="22:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Wednesday</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="9:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="22:00" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Thursday</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="9:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="22:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Friday</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="9:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="23:00" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Weekend</Label>
                      <div className="flex gap-2">
                        <Input className="w-20" defaultValue="10:00" />
                        <span>-</span>
                        <Input className="w-20" defaultValue="23:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Delivery Service</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable delivery orders
                    </p>
                  </div>
                  <Switch
                    checked={deliveryEnabled}
                    onCheckedChange={setDeliveryEnabled}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Takeout Service</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable pickup orders
                    </p>
                  </div>
                  <Switch
                    checked={takeoutEnabled}
                    onCheckedChange={setTakeoutEnabled}
                  />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Delivery Fee</Label>
                    <Input id="deliveryFee" type="number" defaultValue="2.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minOrder">Minimum Order</Label>
                    <Input id="minOrder" type="number" defaultValue="15.00" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">Save Changes</Button>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Menu Management</CardTitle>
                    <CardDescription>
                      Manage your restaurant menu items
                    </CardDescription>
                  </div>
                  <Button>Add New Item</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src="/delicious-pizza.png"
                        alt="Pizza"
                        className="w-15 h-15 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Margherita Pizza</h3>
                        <p className="text-sm text-muted-foreground">
                          Fresh tomatoes, mozzarella, basil
                        </p>
                        <p className="font-semibold">$12.99</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Available</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src="/colorful-pasta-arrangement.png"
                        alt="Pasta"
                        className="w-15 h-15 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Spaghetti Carbonara</h3>
                        <p className="text-sm text-muted-foreground">
                          Eggs, cheese, pancetta, black pepper
                        </p>
                        <p className="font-semibold">$14.99</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Out of Stock</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage incoming orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items}
                        </p>
                        <p className="font-semibold">${order.amount}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "preparing"
                              ? "default"
                              : order.status === "ready"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-semibold">$2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Week</span>
                      <span className="font-semibold">$2,180</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-semibold">$9,850</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Margherita Pizza</span>
                      <span className="font-semibold">156 orders</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spaghetti Carbonara</span>
                      <span className="font-semibold">98 orders</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caesar Salad</span>
                      <span className="font-semibold">76 orders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
