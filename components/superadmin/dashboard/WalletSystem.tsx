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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CreditCard,
  DollarSign,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

const walletBalance = {
  total: 198900,
  available: 185600,
  pending: 13300,
  currency: "USD",
};

const commissionTrend = [
  { month: "Jul", commission: 28500, growth: 8.2 },
  { month: "Aug", commission: 31200, growth: 9.5 },
  { month: "Sep", commission: 29800, growth: -4.5 },
  { month: "Oct", commission: 34500, growth: 15.8 },
  { month: "Nov", commission: 32100, growth: -7.0 },
  { month: "Dec", commission: 32800, growth: 2.2 },
];

const transactions = [
  {
    id: 1,
    type: "commission",
    restaurant: "Pizza Palace",
    amount: 450,
    status: "completed",
    date: "2024-01-10",
    time: "14:30",
    orderId: "#ORD-12345",
  },
  {
    id: 2,
    type: "commission",
    restaurant: "Sushi Master",
    amount: 780,
    status: "completed",
    date: "2024-01-10",
    time: "13:15",
    orderId: "#ORD-12344",
  },
  {
    id: 3,
    type: "withdrawal",
    restaurant: "Platform Withdrawal",
    amount: -15000,
    status: "pending",
    date: "2024-01-09",
    time: "16:45",
    orderId: "#WTH-5678",
  },
  {
    id: 4,
    type: "commission",
    restaurant: "Burger King",
    amount: 320,
    status: "completed",
    date: "2024-01-09",
    time: "12:20",
    orderId: "#ORD-12343",
  },
  {
    id: 5,
    type: "commission",
    restaurant: "Cafe Mocha",
    amount: 250,
    status: "completed",
    date: "2024-01-09",
    time: "11:30",
    orderId: "#ORD-12342",
  },
];

const payouts = [
  {
    id: 1,
    restaurant: "Pizza Palace",
    amount: 4050,
    commission: 450,
    status: "completed",
    date: "2024-01-08",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    restaurant: "Sushi Master",
    amount: 7020,
    commission: 780,
    status: "pending",
    date: "2024-01-07",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 3,
    restaurant: "Burger King",
    amount: 2880,
    commission: 320,
    status: "completed",
    date: "2024-01-06",
    paymentMethod: "PayPal",
  },
];

const wallets = [
  { id: 1, name: "Ali", type: "user", balance: 1200 },
  { id: 2, name: "Pizza Resto", type: "resto", balance: 8000 },
  { id: 3, name: "Sara", type: "user", balance: 500 },
  { id: 4, name: "Burger House", type: "resto", balance: 4200 },
];

export function SuperadminWallet() {
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [payoutFilter, setPayoutFilter] = useState("all");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true;
    return transaction.type === transactionFilter;
  });

  const filteredPayouts = payouts.filter((payout) => {
    if (payoutFilter === "all") return true;
    return payout.status === payoutFilter;
  });

  const handleWithdrawal = () => {
    console.log(
      `[v0] Processing withdrawal of $${withdrawalAmount} via ${withdrawalMethod}`
    );
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "commission":
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case "withdrawal":
        return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Wallet</h1>
        <p className="text-muted-foreground">
          Track commission earnings and manage platform finances
        </p>
      </div>

      {/* Admin Wallets List */}
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-6">Liste of Wallets</h1>
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs & Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2">Nom</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Solde (DA)</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((w) => (
                  <tr key={w.id} className="border-t">
                    <td className="py-2">{w.name}</td>
                    <td className="py-2">
                      {w.type === "user" ? "Utilisateur" : "Restaurant"}
                    </td>
                    <td className="py-2">{w.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
