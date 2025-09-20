"use client";
import { useState } from "react";
import { Layout } from "@/components/clients/Layout";
import { MenuItemCard } from "@/components/clients/MenuItemCard";
import MenuItemModal from "@/components/clients/MenuItemModal";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

const mockMenuItems = [
  {
    id: "1",
    name: "Pizza Margherita",
    description: "Fresh tomato sauce, mozzarella, basil, olive oil",
    price: 1200,
    image: "/pizza-sample.jpg",
    available: true,
    category: "Pizzas",
    supplements: [
      { id: "cheese", name: "Extra Cheese", price: 200 },
      { id: "olives", name: "Black Olives", price: 150 },
      { id: "mushrooms", name: "Fresh Mushrooms", price: 180 },
    ],
  },
  {
    id: "2",
    name: "Pizza Chicken Supreme",
    description: "Grilled chicken, peppers, onions, barbecue sauce, mozzarella",
    price: 1500,
    image: "/pizza-sample.jpg",
    available: true,
    category: "Pizzas",
    supplements: [
      { id: "chicken", name: "Extra Chicken", price: 300 },
      { id: "cheese", name: "Extra Cheese", price: 200 },
      { id: "peppers", name: "Spicy Peppers", price: 100 },
      { id: "onions", name: "Caramelized Onions", price: 120 },
    ],
  },
  {
    id: "3",
    name: "Pizza Meat Lovers",
    description: "Beef, lamb, merguez, pepperoni, spicy sauce, mozzarella",
    price: 1800,
    image: "/pizza-sample.jpg",
    available: true,
    category: "Pizzas",
    supplements: [
      { id: "meat", name: "Extra Meat Mix", price: 400 },
      { id: "merguez", name: "Extra Merguez", price: 250 },
      { id: "cheese", name: "Extra Cheese", price: 200 },
    ],
  },
  {
    id: "4",
    name: "Pizza Seafood Special",
    description: "Shrimp, calamari, anchovies, garlic, olive oil, mozzarella",
    price: 2000,
    image: "/pizza-sample.jpg",
    available: true,
    category: "Pizzas",
    supplements: [
      { id: "shrimp", name: "Extra Shrimp", price: 350 },
      { id: "calamari", name: "Extra Calamari", price: 300 },
      { id: "cheese", name: "Extra Cheese", price: 200 },
    ],
  },
  {
    id: "5",
    name: "Pizza Vegetarian",
    description: "Tomatoes, peppers, onions, mushrooms, olives, mozzarella",
    price: 1300,
    image: "/pizza-sample.jpg",
    available: true,
    category: "Pizzas",
    supplements: [
      { id: "vegetables", name: "Extra Vegetables", price: 150 },
      { id: "cheese", name: "Extra Cheese", price: 200 },
      { id: "olives", name: "Mixed Olives", price: 120 },
    ],
  },
  {
    id: "6",
    name: "Mixed Grill Platter",
    description: "Lamb, beef, merguez, grilled vegetables, traditional bread",
    price: 1800,
    image: "/grill-sample.jpg",
    available: true,
    category: "Grills",
    supplements: [
      { id: "lamb", name: "Extra Lamb", price: 400 },
      { id: "vegetables", name: "Extra Vegetables", price: 200 },
    ],
  },
  {
    id: "7",
    name: "Honey Baklawa",
    description: "Traditional pastry with pistachios and honey",
    price: 400,
    image: "/dessert-sample.jpg",
    available: false,
    category: "Desserts",
  },
];

const mockRestaurant = {
  id: "1",
  name: "Pizza Palace",
  image: "/restaurant-hero.jpg",
  rating: 4.8,
  category: "Pizza • Italian",
  deliveryTime: "25-35 min",
  deliveryFee: 0,
  description:
    "Authentic Italian restaurant offering the best pizzas in Algiers.",
};

export default function RestaurantDetail() {
  const params = useParams();
  const id = params?.id ? params.id[0] : null;
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const [selectedItem, setSelectedItem] = useState<
    (typeof mockMenuItems)[0] | null
  >(null);

  const handleItemClick = (item: (typeof mockMenuItems)[0]) => {
    if (item.supplements && item.supplements.length > 0) {
      setSelectedItem(item);
    } else {
      handleAddToCart(item, 1, []);
    }
  };

  const handleAddToCart = (
    item: (typeof mockMenuItems)[0],
    quantity: number,
    supplements: any[]
  ) => {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantId: id || "1",
        supplements,
      },
      quantity
    );

    toast("Added to cart", {
      description: `${item.name} has been added to your cart`,
    });
  };

  const groupedItems = mockMenuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof mockMenuItems>);

  return (
    <Layout
      title={mockRestaurant.name}
      showBackButton
      onBackClick={() => router.push("/")}
    >
      <div className="space-y-6">
        {/* Restaurant Info */}
        <div className="space-y-4">
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              width={800}
              height={300}
              src={mockRestaurant.image || "/placeholder.svg"}
              alt={mockRestaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mockRestaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{mockRestaurant.deliveryTime}</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {mockRestaurant.deliveryFee === 0
                    ? "Free delivery"
                    : `${mockRestaurant.deliveryFee} DZD`}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">{mockRestaurant.category}</p>
            <p className="text-foreground">{mockRestaurant.description}</p>
          </div>
        </div>

        {/* Menu Items by Category */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground border-l-4 border-primary pl-3">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    {...item}
                    onAddToCart={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <MenuItemModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            recipe={selectedItem}
            onAddToCart={(quantity, supplements) => {
              handleAddToCart(selectedItem, quantity, supplements);
              setSelectedItem(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}
