"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, Moon, Sun } from "lucide-react";

interface User {
  id: number;
  name: string;
  image: string;
  status: string;
  rating: number;
}

function generateRandomUser(id: number): User {
  const statuses = ["Available", "On Route", "Offline"];
  const names = [
    "John Doe",
    "Ziko Wharani",
    "Alice Hamoudi",
    "Bob Brown",
    "Ella Davis",
    "Yasser Ben",
    "Zoid Kmoun",
    "Caliph Ahmed",
    "Ahmed Hasni",
    "Mehdi Za3im",
    "Sifo Blidi",
  ];

  return {
    id,
    name: names[Math.floor(Math.random() * names.length)],
    image: `https://picsum.photos/150/150?random=${id}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    rating: Math.floor(Math.random() * 5) + 1,
  };
}

function UserCard({ user }: { user: User }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "On Route":
        return "bg-yellow-500";
      case "Offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.image || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                user.status
              )}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            <Badge variant="secondary" className="text-xs mt-1">
              {user.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{user.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrackingSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const generatedUsers = Array.from({ length: 12 }, (_, index) =>
      generateRandomUser(index + 1)
    );
    setUsers(generatedUsers);
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Find Workers
          </h1>
          <p className="text-muted-foreground mt-2">
            Search and connect with available workers in your area
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search workers by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Found {filteredUsers.length} worker
          {filteredUsers.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No workers found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
