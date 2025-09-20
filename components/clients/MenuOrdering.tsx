"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Clock, Edit, Trash2 } from "lucide-react";
import MenuItemModal, { type CartItem } from "./MenuItemModal";

const recipes = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes and mozzarella",
    price: 12.99,
    image: "/margherita-pizza.png",
    category: "Pizza",
    prepTime: "15-20 min",
    rating: 4.8,
    baseIngredients: [
      { id: 1, name: "Pizza Dough", required: true },
      { id: 2, name: "Tomato Sauce", required: true },
      { id: 3, name: "Mozzarella Cheese", required: true },
      { id: 4, name: "Fresh Basil", required: false },
    ],
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: 9.99,
    image: "/caesar-salad.png",
    category: "Salad",
    prepTime: "5-10 min",
    rating: 4.6,
    baseIngredients: [
      { id: 5, name: "Romaine Lettuce", required: true },
      { id: 6, name: "Caesar Dressing", required: true },
      { id: 7, name: "Parmesan Cheese", required: false },
      { id: 8, name: "Croutons", required: false },
    ],
  },
  {
    id: 3,
    name: "Grilled Chicken Burger",
    description: "Juicy grilled chicken with fresh vegetables",
    price: 14.99,
    image: "/grilled-chicken-burger.jpg",
    category: "Burger",
    prepTime: "20-25 min",
    rating: 4.7,
    baseIngredients: [
      { id: 9, name: "Burger Bun", required: true },
      { id: 10, name: "Grilled Chicken Breast", required: true },
      { id: 11, name: "Lettuce", required: false },
      { id: 12, name: "Tomato", required: false },
    ],
  },
];

// Mock data for extra ingredients
const extraIngredients = [
  { id: 13, name: "Pepperoni", price: 2.99 },
  { id: 14, name: "Extra Cheese", price: 1.99 },
  { id: 15, name: "Shredded Parmesan", price: 2.49 },
  { id: 16, name: "Grilled Chicken", price: 3.49 },
];

export default function MenuOrdering() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<
    (typeof recipes)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();

  const handleCustomizeRecipe = (recipe: (typeof recipes)[0]) => {
    setSelectedRecipe(recipe);
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditCartItem = (item: CartItem) => {
    const recipe = recipes.find((r) => r.id === item.recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setEditingItem(item);
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = (
    selectedItem: (typeof recipes)[0],
    quantity: number,
    supplements: number[]
  ) => {
    const cartItem: CartItem = {
      id: `${selectedItem.id}-${Date.now()}-${Math.random()}`,
      recipeId: selectedItem.id,
      recipeName: selectedItem.name,
      basePrice: selectedItem.price,
      selectedIngredients: supplements,
      removedIngredients: [], // This would need to be passed separately if needed
      quantity: quantity,
      totalPrice: calculateCustomPrice(selectedItem, supplements) * quantity,
      customizationNote: generateCustomizationNote(
        selectedItem,
        supplements,
        []
      ),
    };

    if (editingItem) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === editingItem.id ? cartItem : cartItem
        )
      );
    } else {
      setCart((prev) => [...prev, cartItem]);
    }
  };

  const handleDuplicateItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const calculateCustomPrice = (
    recipe: (typeof recipes)[0],
    supplements: number[]
  ) => {
    const extraCost = supplements.reduce((total, ingredientId) => {
      const ingredient = extraIngredients.find(
        (ing) => ing.id === ingredientId
      );
      return total + (ingredient?.price || 0);
    }, 0);
    return recipe.price + extraCost;
  };

  const generateCustomizationNote = (
    recipe: (typeof recipes)[0],
    supplements: number[],
    removed: number[]
  ) => {
    const notes = [];

    if (removed.length > 0) {
      const removedNames = recipe.baseIngredients
        .filter((ing) => removed.includes(ing.id) && !ing.required)
        .map((ing) => ing.name);
      if (removedNames.length > 0) {
        notes.push(`No ${removedNames.join(", ")}`);
      }
    }

    if (supplements.length > 0) {
      const addedNames = extraIngredients
        .filter((ing) => supplements.includes(ing.id))
        .map((ing) => ing.name);
      if (addedNames.length > 0) {
        notes.push(`Extra ${addedNames.join(", ")}`);
      }
    }

    return notes.join(" • ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu & Orders</h2>
          <p className="text-gray-600">Customize and manage customer orders</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="relative bg-orange-600 hover:bg-orange-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cart.length})
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-orange-100"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Available Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-600">
                    {recipe.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {recipe.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">
                        ${recipe.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.prepTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleCustomizeRecipe(recipe)}
                  >
                    Customize & Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Order</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Cart ({cart.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No items in cart
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{item.recipeName}</h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                          {item.customizationNote && (
                            <p className="text-xs text-orange-600 mt-1">
                              {item.customizationNote}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600">
                            ${item.totalPrice.toFixed(2)}
                          </div>
                          <div className="flex gap-1 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCartItem(item)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold text-orange-600">
                        ${getTotalCartPrice().toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Process Order
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecipe(null);
          setEditingItem(undefined);
        }}
        onAddToCart={(quantity, supplements) => {
          if (selectedRecipe) {
            handleAddToCart(selectedRecipe, quantity, supplements);
            setIsModalOpen(false);
            setSelectedRecipe(null);
          }
        }}
        onDuplicate={handleDuplicateItem}
        existingItem={editingItem}
      />
    </div>
  );
}
