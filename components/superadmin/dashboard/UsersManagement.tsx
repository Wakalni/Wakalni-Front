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
import {
  Users,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY",
    joinDate: "2023-06-15",
    status: "active",
    totalOrders: 45,
    totalSpent: 1250,
    lastOrder: "2024-01-10",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 234 567 8902",
    address: "456 Oak Ave, Los Angeles, CA",
    joinDate: "2023-08-20",
    status: "active",
    totalOrders: 32,
    totalSpent: 890,
    lastOrder: "2024-01-08",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 234 567 8903",
    address: "789 Pine St, Chicago, IL",
    joinDate: "2023-04-10",
    status: "banned",
    totalOrders: 12,
    totalSpent: 340,
    lastOrder: "2023-12-15",
  },
];

// Mock restaurant admin data
const restaurantAdmins = [
  {
    id: 1,
    name: "John Smith",
    email: "john@pizzapalace.com",
    phone: "+1 234 567 8901",
    restaurant: "Pizza Palace",
    role: "Owner",
    joinDate: "2023-01-15",
    status: "active",
    lastLogin: "2024-01-10",
  },
  {
    id: 2,
    name: "Yuki Tanaka",
    email: "yuki@sushimaster.com",
    phone: "+1 234 567 8902",
    restaurant: "Sushi Master",
    role: "Manager",
    joinDate: "2023-11-20",
    status: "active",
    lastLogin: "2024-01-09",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@burgerking.com",
    phone: "+1 234 567 8903",
    restaurant: "Burger King",
    role: "Owner",
    joinDate: "2023-08-10",
    status: "suspended",
    lastLogin: "2023-12-20",
  },
];

export function UserManagement() {
  const [customerSearch, setCustomerSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all");
  const [adminStatusFilter, setAdminStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase());
    const matchesStatus =
      customerStatusFilter === "all" ||
      customer.status === customerStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAdmins = restaurantAdmins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      admin.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
      admin.restaurant.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesStatus =
      adminStatusFilter === "all" || admin.status === adminStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUserAction = (
    userId: number,
    action: string,
    userType: string
  ) => {
    console.log(`[v0] ${action} ${userType} user ${userId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Suspended
          </Badge>
        );
      case "banned":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Banned
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
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          Manage customers and restaurant administrators
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">45,231</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">43,890</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Restaurant Admins
                </p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Banned Users</p>
                <p className="text-2xl font-bold">341</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Tabs */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="admins">Restaurant Admins</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          {/* Customer Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search customers..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={customerStatusFilter}
                  onValueChange={setCustomerStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              <CardDescription>
                Manage customer accounts and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {customer.name}
                          </h3>
                          {getStatusBadge(customer.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="space-y-1">
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {customer.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {customer.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {customer.address}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Joined: {customer.joinDate}
                            </p>
                            <p className="flex items-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              Last Order: {customer.lastOrder}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-6 mt-3 text-sm">
                          <span>
                            Total Orders:{" "}
                            <strong>{customer.totalOrders}</strong>
                          </span>
                          <span>
                            Total Spent: <strong>${customer.totalSpent}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(customer)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                {selectedUser?.name} Details
                              </DialogTitle>
                              <DialogDescription>
                                Customer information and order history
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Personal Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong>{" "}
                                        {selectedUser.name}
                                      </p>
                                      <p>
                                        <strong>Email:</strong>{" "}
                                        {selectedUser.email}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong>{" "}
                                        {selectedUser.phone}
                                      </p>
                                      <p>
                                        <strong>Address:</strong>{" "}
                                        {selectedUser.address}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Account Activity
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        {getStatusBadge(selectedUser.status)}
                                      </p>
                                      <p>
                                        <strong>Joined:</strong>{" "}
                                        {selectedUser.joinDate}
                                      </p>
                                      <p>
                                        <strong>Total Orders:</strong>{" "}
                                        {selectedUser.totalOrders}
                                      </p>
                                      <p>
                                        <strong>Total Spent:</strong> $
                                        {selectedUser.totalSpent}
                                      </p>
                                      <p>
                                        <strong>Last Order:</strong>{" "}
                                        {selectedUser.lastOrder}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  {selectedUser.status === "active" && (
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser.id,
                                          "ban",
                                          "customer"
                                        )
                                      }
                                    >
                                      <Ban className="w-4 h-4 mr-1" />
                                      Ban User
                                    </Button>
                                  )}
                                  {selectedUser.status === "banned" && (
                                    <Button
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser.id,
                                          "unban",
                                          "customer"
                                        )
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Unban User
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {customer.status === "active" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleUserAction(customer.id, "ban", "customer")
                            }
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Ban
                          </Button>
                        )}
                        {customer.status === "banned" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUserAction(customer.id, "unban", "customer")
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Unban
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Restaurant Admins Tab */}
        <TabsContent value="admins" className="space-y-4">
          {/* Admin Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search admins or restaurants..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={adminStatusFilter}
                  onValueChange={setAdminStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Admin List */}
          <Card>
            <CardHeader>
              <CardTitle>
                Restaurant Administrators ({filteredAdmins.length})
              </CardTitle>
              <CardDescription>
                Manage restaurant admin accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAdmins.map((admin) => (
                  <div key={admin.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {admin.name}
                          </h3>
                          {getStatusBadge(admin.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="space-y-1">
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {admin.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {admin.phone}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p>Restaurant: {admin.restaurant}</p>
                            <p>Role: {admin.role}</p>
                            <p>Joined: {admin.joinDate}</p>
                            <p>Last Login: {admin.lastLogin}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(admin)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                {selectedUser?.name} Details
                              </DialogTitle>
                              <DialogDescription>
                                Restaurant administrator information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Personal Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong>{" "}
                                        {selectedUser.name}
                                      </p>
                                      <p>
                                        <strong>Email:</strong>{" "}
                                        {selectedUser.email}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong>{" "}
                                        {selectedUser.phone}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Restaurant Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Restaurant:</strong>{" "}
                                        {selectedUser.restaurant}
                                      </p>
                                      <p>
                                        <strong>Role:</strong>{" "}
                                        {selectedUser.role}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        {getStatusBadge(selectedUser.status)}
                                      </p>
                                      <p>
                                        <strong>Joined:</strong>{" "}
                                        {selectedUser.joinDate}
                                      </p>
                                      <p>
                                        <strong>Last Login:</strong>{" "}
                                        {selectedUser.lastLogin}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  {selectedUser.status === "active" && (
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser.id,
                                          "suspend",
                                          "admin"
                                        )
                                      }
                                    >
                                      <Ban className="w-4 h-4 mr-1" />
                                      Suspend
                                    </Button>
                                  )}
                                  {selectedUser.status === "suspended" && (
                                    <Button
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser.id,
                                          "activate",
                                          "admin"
                                        )
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Activate
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {admin.status === "active" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleUserAction(admin.id, "suspend", "admin")
                            }
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {admin.status === "suspended" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUserAction(admin.id, "activate", "admin")
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
