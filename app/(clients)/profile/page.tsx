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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, History, Gift, Settings } from "lucide-react";

export default function ClientProfile() {
  const [walletBalance, setWalletBalance] = useState(45.5);
  const [loadAmount, setLoadAmount] = useState("");

  const handleLoadMoney = () => {
    const amount = Number.parseFloat(loadAmount);
    if (amount > 0) {
      setWalletBalance((prev) => prev + amount);
      setLoadAmount("");
    }
  };

  const orderHistory = [
    {
      id: "1",
      restaurant: "Pizza Palace",
      amount: 24.99,
      date: "2024-01-15",
      status: "delivered",
    },
    {
      id: "2",
      restaurant: "Burger House",
      amount: 18.5,
      date: "2024-01-12",
      status: "delivered",
    },
    {
      id: "3",
      restaurant: "Sushi Express",
      amount: 32.0,
      date: "2024-01-10",
      status: "cancelled",
    },
  ];

  const promotions = [
    {
      id: "1",
      title: "20% off Pizza Palace",
      code: "PIZZA20",
      expires: "2024-02-01",
      used: false,
    },
    {
      id: "2",
      title: "Free delivery on orders $25+",
      code: "FREEDEL",
      expires: "2024-01-31",
      used: true,
    },
    {
      id: "3",
      title: "$5 off your next order",
      code: "SAVE5",
      expires: "2024-02-15",
      used: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">John Doe</CardTitle>
                <CardDescription>john.doe@email.com</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Premium Member
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className="grid bg-accent w-full grid-cols-4">
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    ${walletBalance.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available for orders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Load Money
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={loadAmount}
                      onChange={(e) => setLoadAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLoadAmount("10")}
                    >
                      $10
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLoadAmount("25")}
                    >
                      $25
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLoadAmount("50")}
                    >
                      $50
                    </Button>
                  </div>
                  <Button onClick={handleLoadMoney} className="w-full">
                    Load Money
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Money loaded</p>
                      <p className="text-sm text-muted-foreground">
                        Jan 16, 2024
                      </p>
                    </div>
                    <span className="text-green-600 font-medium">+$50.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Pizza Palace order</p>
                      <p className="text-sm text-muted-foreground">
                        Jan 15, 2024
                      </p>
                    </div>
                    <span className="text-red-600 font-medium">-$24.99</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Burger House order</p>
                      <p className="text-sm text-muted-foreground">
                        Jan 12, 2024
                      </p>
                    </div>
                    <span className="text-red-600 font-medium">-$18.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  Your recent orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.restaurant}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.amount}</p>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Promotions</CardTitle>
                <CardDescription>
                  Your coupons and special offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {promotions.map((promo) => (
                    <Card
                      key={promo.id}
                      className={promo.used ? "opacity-50" : ""}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{promo.title}</h3>
                          <Badge variant={promo.used ? "secondary" : "default"}>
                            {promo.used ? "Used" : "Available"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Code: {promo.code}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {promo.expires}
                        </p>
                        {!promo.used && (
                          <Button size="sm" className="mt-3 w-full">
                            Use Coupon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
