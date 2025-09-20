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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Wallet,
  TrendingUp,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense" | "withdrawal";
  amount: number;
  description: string;
  category: string;
  date: Date;
  status: "completed" | "pending" | "failed";
  paymentMethod?: string;
  orderId?: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "income",
    amount: 2847.5,
    description: "Daily sales revenue",
    category: "Sales",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed",
    paymentMethod: "Multiple",
  },
  {
    id: "TXN-002",
    type: "expense",
    amount: 450.0,
    description: "Food supplies purchase",
    category: "Inventory",
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "completed",
    paymentMethod: "Business Card",
  },
  {
    id: "TXN-003",
    type: "income",
    amount: 89.5,
    description: "Order #ORD-1247",
    category: "Sales",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: "completed",
    paymentMethod: "Credit Card",
    orderId: "ORD-1247",
  },
  {
    id: "TXN-004",
    type: "withdrawal",
    amount: 1000.0,
    description: "Bank transfer to savings",
    category: "Transfer",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-005",
    type: "expense",
    amount: 120.0,
    description: "Utility bills payment",
    category: "Operations",
    date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    status: "completed",
    paymentMethod: "Auto-pay",
  },
];

export function WalletSystem() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [balanceVisible, setBalanceVisible] = useState(true);

  // Calculate current balance
  const currentBalance = transactions.reduce((balance, transaction) => {
    if (transaction.status !== "completed") return balance;

    switch (transaction.type) {
      case "income":
        return balance + transaction.amount;
      case "expense":
      case "withdrawal":
        return balance - transaction.amount;
      default:
        return balance;
    }
  }, 5000); // Starting balance

  const todayIncome = transactions
    .filter(
      (t) =>
        t.type === "income" &&
        t.status === "completed" &&
        t.date.toDateString() === new Date().toDateString()
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleWithdraw = () => {
    if (
      withdrawAmount &&
      withdrawMethod &&
      Number.parseFloat(withdrawAmount) > 0
    ) {
      const newTransaction: Transaction = {
        id: `TXN-${Date.now()}`,
        type: "withdrawal",
        amount: Number.parseFloat(withdrawAmount),
        description: `Withdrawal to ${withdrawMethod}`,
        category: "Transfer",
        date: new Date(),
        status: "pending",
        paymentMethod: withdrawMethod,
      };
      setTransactions([newTransaction, ...transactions]);
      setWithdrawAmount("");
      setWithdrawMethod("");
      setIsWithdrawDialogOpen(false);
    }
  };

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "income":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case "expense":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Wallet & Finances</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's financial transactions
          </p>
        </div>
        <Dialog
          open={isWithdrawDialogOpen}
          onOpenChange={setIsWithdrawDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Withdraw Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Transfer money from your restaurant account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (DZD)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Withdrawal Method</Label>
                <Select
                  value={withdrawMethod}
                  onValueChange={setWithdrawMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Available balance:{" "}
                  <span className="font-medium text-foreground">
                    ${currentBalance.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsWithdrawDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleWithdraw}>Withdraw</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Current Balance</CardTitle>
                <CardDescription>
                  Available funds in your account
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBalanceVisible(!balanceVisible)}
              >
                {balanceVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="h-8 w-8 text-primary" />
              <div>
                <p className="text-3xl font-bold">
                  {balanceVisible
                    ? `${currentBalance.toFixed(2)} DZD`
                    : "••••••"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Today's Income
              </span>
              <span className="font-medium text-green-600">
                +${todayIncome.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="font-medium text-yellow-600">
                ${Math.abs(pendingAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Transactions
              </span>
              <span className="font-medium">{transactions.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Connected payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">Credit Cards</p>
                <p className="text-sm text-muted-foreground">
                  Visa, Mastercard, Amex
                </p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Wallet className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium">Digital Wallets</p>
                <p className="text-sm text-muted-foreground">
                  PayPal, Apple Pay
                </p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <DollarSign className="h-8 w-8 text-gray-600" />
              <div>
                <p className="font-medium">Cash Payments</p>
                <p className="text-sm text-muted-foreground">
                  In-person transactions
                </p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent financial activity</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.description}</p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{transaction.category}</span>
                      {transaction.paymentMethod && (
                        <>
                          <span>•</span>
                          <span>{transaction.paymentMethod}</span>
                        </>
                      )}
                      {transaction.orderId && (
                        <>
                          <span>•</span>
                          <span>{transaction.orderId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : transaction.type === "expense"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
