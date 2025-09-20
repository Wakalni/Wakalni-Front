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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  name: string;
  last4?: string;
  isDefault: boolean;
}

export function WalletManagement() {
  const [balance, setBalance] = useState(125.75);
  const [loadAmount, setLoadAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "credit",
      amount: 50.0,
      description: "Wallet top-up",
      date: "2024-01-16",
      status: "completed",
    },
    {
      id: "2",
      type: "debit",
      amount: 24.99,
      description: "Pizza Palace order",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "3",
      type: "debit",
      amount: 18.5,
      description: "Burger House order",
      date: "2024-01-12",
      status: "completed",
    },
    {
      id: "4",
      type: "credit",
      amount: 25.0,
      description: "Refund - Cancelled order",
      date: "2024-01-10",
      status: "completed",
    },
    {
      id: "5",
      type: "debit",
      amount: 32.0,
      description: "Sushi Express order",
      date: "2024-01-08",
      status: "completed",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      last4: "4242",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard ending in 8888",
      last4: "8888",
      isDefault: false,
    },
    { id: "3", type: "paypal", name: "PayPal Account", isDefault: false },
  ];

  const handleLoadMoney = async () => {
    const amount = Number.parseFloat(loadAmount);
    if (amount > 0 && selectedPaymentMethod) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setBalance((prev) => prev + amount);
        setLoadAmount("");
        setSelectedPaymentMethod("");
        setIsLoading(false);
      }, 2000);
    }
  };

  const quickAmounts = [10, 25, 50, 100];

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Available Balance</p>
              <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            </div>
            <Wallet className="h-12 w-12 opacity-80" />
          </div>
          <div className="mt-4 flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Money to Wallet</DialogTitle>
                  <DialogDescription>
                    Choose an amount and payment method to add money to your
                    wallet.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
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
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        size="sm"
                        variant="outline"
                        onClick={() => setLoadAmount(amount.toString())}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select
                      value={selectedPaymentMethod}
                      onValueChange={setSelectedPaymentMethod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              {method.name}
                              {method.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleLoadMoney}
                    className="w-full"
                    disabled={
                      !loadAmount || !selectedPaymentMethod || isLoading
                    }
                  >
                    {isLoading ? "Processing..." : `Add $${loadAmount || "0"}`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="font-semibold">$75.00 added</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="font-semibold">$156.49 spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order</p>
                <p className="font-semibold">$25.16</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "credit"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                {index < transactions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">{method.name}</p>
                    {method.isDefault && (
                      <Badge variant="secondary" className="mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
