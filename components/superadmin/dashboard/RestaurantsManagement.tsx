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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Pause,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Mock restaurant data
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    owner: "John Smith",
    email: "john@pizzapalace.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY",
    category: "Fast Food",
    status: "pending",
    registrationDate: "2024-01-15",
    revenue: 45000,
    orders: 1200,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Sushi Master",
    owner: "Yuki Tanaka",
    email: "yuki@sushimaster.com",
    phone: "+1 234 567 8902",
    address: "456 Oak Ave, Los Angeles, CA",
    category: "Fine Dining",
    status: "active",
    registrationDate: "2023-11-20",
    revenue: 78000,
    orders: 890,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Burger King",
    owner: "Mike Johnson",
    email: "mike@burgerking.com",
    phone: "+1 234 567 8903",
    address: "789 Pine St, Chicago, IL",
    category: "Fast Food",
    status: "suspended",
    registrationDate: "2023-08-10",
    revenue: 32000,
    orders: 1500,
    rating: 3.9,
  },
  {
    id: 4,
    name: "Cafe Mocha",
    owner: "Sarah Wilson",
    email: "sarah@cafemocha.com",
    phone: "+1 234 567 8904",
    address: "321 Elm St, Seattle, WA",
    category: "Cafe",
    status: "active",
    registrationDate: "2023-12-05",
    revenue: 25000,
    orders: 650,
    rating: 4.3,
  },
];

export function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    (typeof restaurants)[0] | null
  >(null);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || restaurant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (restaurantId: number, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(
      `[v0] Changing restaurant ${restaurantId} status to ${newStatus}`
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Suspended
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
        <h1 className="text-3xl font-bold text-foreground">
          Restaurant Management
        </h1>
        <p className="text-muted-foreground">
          Manage restaurant registrations and accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">1,156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Pause className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">67</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search restaurants or owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Restaurant List */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurants ({filteredRestaurants.length})</CardTitle>
          <CardDescription>
            Manage restaurant accounts and approvals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {restaurant.name}
                      </h3>
                      {getStatusBadge(restaurant.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <p className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Owner: {restaurant.owner}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {restaurant.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {restaurant.phone}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {restaurant.address}
                        </p>
                        <p>Category: {restaurant.category}</p>
                        <p>Registered: {restaurant.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-3 text-sm">
                      <span>
                        Revenue:{" "}
                        <strong>${restaurant.revenue.toLocaleString()}</strong>
                      </span>
                      <span>
                        Orders: <strong>{restaurant.orders}</strong>
                      </span>
                      <span>
                        Rating: <strong>{restaurant.rating}/5</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRestaurant(restaurant)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedRestaurant?.name} Details
                          </DialogTitle>
                          <DialogDescription>
                            Complete restaurant information and actions
                          </DialogDescription>
                        </DialogHeader>
                        {selectedRestaurant && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Basic Information
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedRestaurant.name}
                                  </p>
                                  <p>
                                    <strong>Owner:</strong>{" "}
                                    {selectedRestaurant.owner}
                                  </p>
                                  <p>
                                    <strong>Category:</strong>{" "}
                                    {selectedRestaurant.category}
                                  </p>
                                  <p>
                                    <strong>Status:</strong>{" "}
                                    {getStatusBadge(selectedRestaurant.status)}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Performance
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Revenue:</strong> $
                                    {selectedRestaurant.revenue.toLocaleString()}
                                  </p>
                                  <p>
                                    <strong>Orders:</strong>{" "}
                                    {selectedRestaurant.orders}
                                  </p>
                                  <p>
                                    <strong>Rating:</strong>{" "}
                                    {selectedRestaurant.rating}/5
                                  </p>
                                  <p>
                                    <strong>Registered:</strong>{" "}
                                    {selectedRestaurant.registrationDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Contact Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {selectedRestaurant.email}
                                </p>
                                <p>
                                  <strong>Phone:</strong>{" "}
                                  {selectedRestaurant.phone}
                                </p>
                                <p>
                                  <strong>Address:</strong>{" "}
                                  {selectedRestaurant.address}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                              {selectedRestaurant.status === "pending" && (
                                <>
                                  <Button
                                    onClick={() =>
                                      handleStatusChange(
                                        selectedRestaurant.id,
                                        "active"
                                      )
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleStatusChange(
                                        selectedRestaurant.id,
                                        "rejected"
                                      )
                                    }
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {selectedRestaurant.status === "active" && (
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleStatusChange(
                                      selectedRestaurant.id,
                                      "suspended"
                                    )
                                  }
                                >
                                  <Pause className="w-4 h-4 mr-1" />
                                  Suspend
                                </Button>
                              )}
                              {selectedRestaurant.status === "suspended" && (
                                <Button
                                  onClick={() =>
                                    handleStatusChange(
                                      selectedRestaurant.id,
                                      "active"
                                    )
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Reactivate
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    {restaurant.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(restaurant.id, "active")
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(restaurant.id, "rejected")
                          }
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {restaurant.status === "active" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(restaurant.id, "suspended")
                        }
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Suspend
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
