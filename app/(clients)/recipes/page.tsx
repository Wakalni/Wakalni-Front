"use client";

import { useState } from "react";
import { RestaurantCard } from "@/components/clients/RestaurantCard";
import { Layout } from "@/components/clients/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "grill", name: "Grill", icon: "🥩" },
  { id: "desserts", name: "Desserts", icon: "🧁" },
  { id: "traditional", name: "Traditional", icon: "🍲" },
];

const mockRestaurants = [
  {
    id: "2",
    name: "Grill Master",
    image: "/grill-sample.jpg",
    rating: 4.6,
    category: "Grill • Meat",
    deliveryTime: "30-40 min",
    deliveryFee: 150,
  },
  {
    id: "3",
    name: "Sweet Dreams",
    image: "/pizza-sample.jpg",
    rating: 4.9,
    category: "Desserts • Bakery",
    deliveryTime: "20-30 min",
    deliveryFee: 0,
  },
  {
    id: "4",
    name: "Dar El Khodra",
    image: "/restaurant-hero.jpg",
    rating: 4.7,
    category: "Traditional • Algerian",
    deliveryTime: "35-45 min",
    deliveryFee: 200,
  },
  {
    id: "x1",
    name: "Pizza Palace",
    image: "/dessert-sample.jpg",
    rating: 4.8,
    category: "Pizza • Italian",
    deliveryTime: "25-35 min",
    deliveryFee: 0,
  },
  {
    id: "c2",
    name: "Grill Master",
    image: "/restaurant-hero.jpg",
    rating: 4.6,
    category: "Grill • Meat",
    deliveryTime: "30-40 min",
    deliveryFee: 150,
  },
  {
    id: "v3",
    name: "Sweet Dreams",
    image: "/restaurant-hero.jpg",
    rating: 4.9,
    category: "Desserts • Bakery",
    deliveryTime: "20-30 min",
    deliveryFee: 0,
  },
];

export default function Homepage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      restaurant.category.toLowerCase().includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  return (
    <Layout showSearch onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-primary rounded-2xl p-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to EasyDine</h2>
          <p className="text-white/90">
            Discover the best restaurants near you
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap`}
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Popular restaurants
            </h3>
            <Badge variant="outline" className="text-muted-foreground">
              {filteredRestaurants.length} restaurants
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => handleRestaurantClick(restaurant.id)}
              />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No restaurants found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
