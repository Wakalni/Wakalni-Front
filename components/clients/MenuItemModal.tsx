"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Copy } from "lucide-react";

// Available extra ingredients for customization
const extraIngredients = [
  { id: 13, name: "Extra Cheese", price: 100, category: "Cheese" },
  { id: 14, name: "Mushrooms", price: 100, category: "Vegetables" },
  { id: 15, name: "Pepperoni", price: 200, category: "Meat" },
  { id: 16, name: "Bell Peppers", price: 75, category: "Vegetables" },
  { id: 17, name: "Onions", price: 500, category: "Vegetables" },
  { id: 18, name: "Bacon", price: 250, category: "Meat" },
  { id: 19, name: "Avocado", price: 200, category: "Vegetables" },
  { id: 20, name: "Jalapeños", price: 75, category: "Vegetables" },
  { id: 21, name: "Olives", price: 100, category: "Vegetables" },
  { id: 22, name: "Sun-dried Tomatoes", price: 125, category: "Vegetables" },
];

interface Recipe {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  prepTime?: string;
  rating?: number;
  baseIngredients?: Array<{
    id: number;
    name: string;
    required: boolean;
  }>;
  supplements?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface CartItem {
  id: string;
  recipeId: number | string;
  recipeName: string;
  basePrice: number;
  selectedIngredients: number[];
  removedIngredients: number[];
  quantity: number;
  totalPrice: number;
  customizationNote: string;
}

interface MenuItemModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number, supplements: number[]) => void;
  onDuplicate?: (item: CartItem) => void;
  existingItem?: CartItem; // For editing existing cart items
}

export default function MenuItemModal({
  recipe,
  isOpen,
  onClose,
  onAddToCart,
  onDuplicate,
  existingItem,
}: MenuItemModalProps) {
  const [customIngredients, setCustomIngredients] = useState<number[]>(
    existingItem?.selectedIngredients || []
  );
  const [removedIngredients, setRemovedIngredients] = useState<number[]>(
    existingItem?.removedIngredients || []
  );
  const [quantity, setQuantity] = useState(existingItem?.quantity || 1);

  const getBaseIngredients = () => {
    if (recipe?.baseIngredients) {
      return recipe.baseIngredients;
    }
    // Default base ingredients for items without explicit base ingredients
    return [
      { id: 1, name: "Base Sauce", required: true },
      { id: 2, name: "Main Ingredient", required: true },
      { id: 3, name: "Seasoning", required: false },
    ];
  };

  // Reset state when recipe changes or modal opens
  useState(() => {
    if (isOpen && !existingItem) {
      setCustomIngredients([]);
      setRemovedIngredients([]);
      setQuantity(1);
    }
  });

  const toggleExtraIngredient = (ingredientId: number) => {
    setCustomIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const toggleRemoveIngredient = (ingredientId: number) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const calculateCustomPrice = () => {
    if (!recipe) return 0;
    const extraCost = customIngredients.reduce((total, ingredientId) => {
      const ingredient = extraIngredients.find(
        (ing) => ing.id === ingredientId
      );
      return total + (ingredient?.price || 0);
    }, 0);
    return recipe.price + extraCost;
  };

  const generateCustomizationNote = () => {
    const notes = [];
    const baseIngredients = getBaseIngredients();

    if (removedIngredients.length > 0) {
      const removedNames = baseIngredients
        .filter((ing) => removedIngredients.includes(ing.id) && !ing.required)
        .map((ing) => ing.name);
      if (removedNames.length > 0) {
        notes.push(`No ${removedNames.join(", ")}`);
      }
    }

    if (customIngredients.length > 0) {
      const addedNames = extraIngredients
        .filter((ing) => customIngredients.includes(ing.id))
        .map((ing) => ing.name);
      if (addedNames.length > 0) {
        notes.push(`Extra ${addedNames.join(", ")}`);
      }
    }

    return notes.join(" • ");
  };

  const handleAddToCart = () => {
    if (!recipe) return;

    onAddToCart(quantity, customIngredients);
    onClose();
  };

  const handleDuplicate = () => {
    if (!recipe) return;

    const duplicatedItem: CartItem = {
      id: `${recipe.id}-${Date.now()}-${Math.random()}`,
      recipeId: recipe.id,
      recipeName: recipe.name,
      basePrice: recipe.price,
      selectedIngredients: customIngredients,
      removedIngredients: removedIngredients,
      quantity: quantity,
      totalPrice: calculateCustomPrice() * quantity,
      customizationNote: generateCustomizationNote(),
    };

    onDuplicate?.(duplicatedItem);
  };

  if (!recipe) return null;

  const baseIngredients = getBaseIngredients();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {existingItem ? "Edit" : "Customize"} {recipe.name}
          </DialogTitle>
          <DialogDescription>
            Personalize your order by adding or removing ingredients
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Base Ingredients */}
          <div>
            <h3 className="font-semibold mb-3">Base Ingredients</h3>
            <div className="space-y-2">
              {baseIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between p-2 bg-gray-400 rounded"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`remove-${ingredient.id}`}
                      checked={!removedIngredients.includes(ingredient.id)}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          toggleRemoveIngredient(ingredient.id);
                        } else {
                          setRemovedIngredients((prev) =>
                            prev.filter((id) => id !== ingredient.id)
                          );
                        }
                      }}
                      disabled={ingredient.required}
                    />
                    <Label
                      htmlFor={`remove-${ingredient.id}`}
                      className="flex-1"
                    >
                      {ingredient.name}
                      {ingredient.required && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Required
                        </Badge>
                      )}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Extra Ingredients */}
          <div>
            <h3 className="font-semibold mb-3">Add Extra Ingredients</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {extraIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between p-2 border rounded hover:bg-gray-400 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`extra-${ingredient.id}`}
                      checked={customIngredients.includes(ingredient.id)}
                      onCheckedChange={() =>
                        toggleExtraIngredient(ingredient.id)
                      }
                    />
                    <Label
                      htmlFor={`extra-${ingredient.id}`}
                      className="flex-1"
                    >
                      {ingredient.name}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {ingredient.category}
                      </Badge>
                    </Label>
                  </div>
                  <span className="text-sm font-medium text-orange-600">
                    +{ingredient.price.toFixed(2)} DZD
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quantity and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Label>Quantity:</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Price</div>
              <div className="text-xl font-bold text-orange-600">
                {(calculateCustomPrice() * quantity).toFixed(2)} DZD
              </div>
            </div>
          </div>

          {/* Customization Preview */}
          {generateCustomizationNote() && (
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800 mb-1">
                Your Customization:
              </div>
              <div className="text-sm text-orange-700">
                {generateCustomizationNote()}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {existingItem && onDuplicate && (
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
          )}
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleAddToCart}
          >
            {existingItem ? "Update" : "Add to Cart"} DZD
            {(calculateCustomPrice() * quantity).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
