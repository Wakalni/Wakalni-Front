"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  GripVertical,
  DollarSign,
  Package,
  X,
} from "lucide-react";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  description: string;
  ingredients: Ingredient[];
  prepTime: number;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

const initialCategories: Category[] = [
  { id: "appetizers", name: "Appetizers", color: "bg-blue-100 text-blue-800" },
  { id: "mains", name: "Main Courses", color: "bg-green-100 text-green-800" },
  { id: "desserts", name: "Desserts", color: "bg-pink-100 text-pink-800" },
  {
    id: "beverages",
    name: "Beverages",
    color: "bg-purple-100 text-purple-800",
  },
];

const initialRecipes: Recipe[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    category: "mains",
    price: 15.99,
    stock: 25,
    unit: "units",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    ingredients: [
      { name: "Pizza dough", quantity: 1, unit: "piece" },
      { name: "Mozzarella", quantity: 200, unit: "g" },
      { name: "Tomatoes", quantity: 3, unit: "pieces" },
      { name: "Basil", quantity: 10, unit: "leaves" },
      { name: "Olive oil", quantity: 2, unit: "tbsp" },
    ],
    prepTime: 20,
  },
  {
    id: "2",
    name: "Caesar Salad",
    category: "appetizers",
    price: 12.5,
    stock: 15,
    unit: "portions",
    description: "Crisp romaine lettuce with parmesan and croutons",
    ingredients: [
      { name: "Romaine lettuce", quantity: 1, unit: "head" },
      { name: "Parmesan", quantity: 50, unit: "g" },
      { name: "Croutons", quantity: 30, unit: "g" },
      { name: "Caesar dressing", quantity: 3, unit: "tbsp" },
    ],
    prepTime: 10,
  },
  {
    id: "3",
    name: "Chocolate Cake",
    category: "desserts",
    price: 8.99,
    stock: 8,
    unit: "slices",
    description: "Rich chocolate cake with ganache frosting",
    ingredients: [
      { name: "Chocolate", quantity: 200, unit: "g" },
      { name: "Flour", quantity: 300, unit: "g" },
      { name: "Eggs", quantity: 3, unit: "pieces" },
      { name: "Butter", quantity: 150, unit: "g" },
      { name: "Sugar", quantity: 200, unit: "g" },
    ],
    prepTime: 45,
  },
];

const ItemTypes = {
  RECIPE: "recipe",
  CATEGORY: "category",
};

function DraggableRecipeCard({
  recipe,
  index,
  moveRecipe,
  getCategoryInfo,
  handleDeleteRecipe,
}: {
  recipe: Recipe;
  index: number;
  moveRecipe: (dragIndex: number, hoverIndex: number) => void;
  getCategoryInfo: (categoryId: string) => { name: string; color: string };
  handleDeleteRecipe: (id: string) => void;
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.RECIPE,
    item: { index, id: recipe.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.RECIPE,
    hover: (item: { index: number; id: string }) => {
      if (item.index !== index) {
        moveRecipe(item.index, index);
        item.index = index;
      }
    },
  });

  const categoryInfo = getCategoryInfo(recipe.category);

  return (
    <div
      ref={(node) => {
        if (node) {
          dragPreview(drop(node));
        }
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{recipe.name}</CardTitle>
              <Badge className={`${categoryInfo.color} mt-1`}>
                {categoryInfo.name}
              </Badge>
            </div>
            <div
              ref={(node) => {
                if (node) {
                  drag(node);
                }
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{recipe.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-primary">
              <DollarSign className="h-4 w-4" />
              <span className="font-bold">{recipe.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-sm">
                {recipe.stock} {recipe.unit}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Prep: {recipe.prepTime} min</span>
            <span>{recipe.ingredients.length} ingredients</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteRecipe(recipe.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const availableIngredients = [
  { name: "Pizza dough", quantity: 50, unit: "pieces" },
  { name: "Mozzarella", quantity: 5, unit: "kg" },
  { name: "Tomatoes", quantity: 20, unit: "pieces" },
  { name: "Basil", quantity: 2, unit: "bunches" },
  { name: "Olive oil", quantity: 1, unit: "liter" },
  { name: "Romaine lettuce", quantity: 10, unit: "heads" },
  { name: "Parmesan", quantity: 2, unit: "kg" },
  { name: "Croutons", quantity: 500, unit: "g" },
  { name: "Caesar dressing", quantity: 500, unit: "ml" },
  { name: "Chocolate", quantity: 1, unit: "kg" },
  { name: "Flour", quantity: 5, unit: "kg" },
  { name: "Eggs", quantity: 24, unit: "pieces" },
  { name: "Butter", quantity: 2, unit: "kg" },
  { name: "Sugar", quantity: 3, unit: "kg" },
  { name: "Chicken breast", quantity: 3, unit: "kg" },
  { name: "Onions", quantity: 15, unit: "pieces" },
  { name: "Garlic", quantity: 8, unit: "bulbs" },
  { name: "Bell peppers", quantity: 12, unit: "pieces" },
  { name: "Mushrooms", quantity: 2, unit: "kg" },
  { name: "Rice", quantity: 10, unit: "kg" },
  { name: "Pasta", quantity: 5, unit: "kg" },
  { name: "Heavy cream", quantity: 2, unit: "liters" },
  { name: "White wine", quantity: 3, unit: "bottles" },
  { name: "Lemon", quantity: 20, unit: "pieces" },
  { name: "Salmon", quantity: 2, unit: "kg" },
];

export function RecipeManagement() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>({
    name: "",
    quantity: 0,
    unit: "g",
  });

  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    unit: "units",
    description: "",
    ingredients: [],
    prepTime: 0,
  });

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const moveRecipe = (dragIndex: number, hoverIndex: number) => {
    const newRecipes = [...recipes];
    const draggedRecipe = filteredRecipes[dragIndex];
    const hoveredRecipe = filteredRecipes[hoverIndex];

    const draggedRecipeIndex = newRecipes.findIndex(
      (r) => r.id === draggedRecipe.id
    );
    const hoveredRecipeIndex = newRecipes.findIndex(
      (r) => r.id === hoveredRecipe.id
    );

    const temp = newRecipes[draggedRecipeIndex];
    newRecipes[draggedRecipeIndex] = newRecipes[hoveredRecipeIndex];
    newRecipes[hoveredRecipeIndex] = temp;

    setRecipes(newRecipes);
  };

  const addIngredient = () => {
    if (currentIngredient.name.trim() && currentIngredient.quantity > 0) {
      const existingIngredient = newRecipe.ingredients?.find(
        (ing) => ing.name === currentIngredient.name.trim()
      );
      if (!existingIngredient) {
        setNewRecipe({
          ...newRecipe,
          ingredients: [
            ...(newRecipe.ingredients || []),
            { ...currentIngredient, name: currentIngredient.name.trim() },
          ],
        });
        setCurrentIngredient({
          name: "",
          quantity: 0,
          unit: "g",
        });
      }
    }
  };

  const removeIngredient = (ingredientName: string) => {
    setNewRecipe({
      ...newRecipe,
      ingredients:
        newRecipe.ingredients?.filter((ing) => ing.name !== ingredientName) ||
        [],
    });
  };

  const handleCreateRecipe = () => {
    if (newRecipe.name && newRecipe.category) {
      const recipe: Recipe = {
        id: Date.now().toString(),
        name: newRecipe.name,
        category: newRecipe.category,
        price: newRecipe.price || 0,
        stock: newRecipe.stock || 0,
        unit: newRecipe.unit || "units",
        description: newRecipe.description || "",
        ingredients: newRecipe.ingredients || [],
        prepTime: newRecipe.prepTime || 0,
      };
      setRecipes([...recipes, recipe]);
      setNewRecipe({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        unit: "units",
        description: "",
        ingredients: [],
        prepTime: 0,
      });
      setCurrentIngredient({
        name: "",
        quantity: 0,
        unit: "g",
      });
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: categoryId,
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  const handleIngredientSelect = (ingredientName: string) => {
    const stockInfo = availableIngredients.find(
      (ing) => ing.name === ingredientName
    );
    if (stockInfo) {
      setCurrentIngredient({
        ...currentIngredient,
        name: ingredientName,
        quantity: stockInfo.quantity,
        unit: stockInfo.unit,
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Recipe Management
            </h1>
            <p className="text-muted-foreground">
              Manage your restaurant's menu items and inventory
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Recipe</DialogTitle>
                <DialogDescription>
                  Add a new recipe to your menu
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Recipe Name</Label>
                  <Input
                    id="name"
                    value={newRecipe.name}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, name: e.target.value })
                    }
                    placeholder="Enter recipe name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newRecipe.category}
                    onValueChange={(value) =>
                      setNewRecipe({ ...newRecipe, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (DZD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newRecipe.price}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stock"
                      type="number"
                      value={newRecipe.stock}
                      onChange={(e) =>
                        setNewRecipe({
                          ...newRecipe,
                          stock: Number.parseInt(e.target.value),
                        })
                      }
                      placeholder="0"
                    />
                    <Select
                      value={newRecipe.unit}
                      onValueChange={(value) =>
                        setNewRecipe({ ...newRecipe, unit: value })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="portions">Portions</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={newRecipe.prepTime}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        prepTime: Number.parseInt(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRecipe.description}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your recipe..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 space-y-4">
                  <Label className="text-base font-semibold">Ingredients</Label>
                  <div className="grid grid-cols-4 gap-2 p-4 border rounded-lg bg-muted/50">
                    <div>
                      <Label className="text-xs">Ingredient Name</Label>
                      <Input
                        value={currentIngredient.name}
                        onChange={(e) =>
                          setCurrentIngredient({
                            ...currentIngredient,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter ingredient"
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        type="number"
                        value={currentIngredient.quantity}
                        onChange={(e) =>
                          setCurrentIngredient({
                            ...currentIngredient,
                            quantity: Number(e.target.value),
                          })
                        }
                        placeholder="0"
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Unit</Label>
                      <Select
                        value={currentIngredient.unit}
                        onValueChange={(value) =>
                          setCurrentIngredient({
                            ...currentIngredient,
                            unit: value,
                          })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="pieces">pieces</SelectItem>
                          <SelectItem value="tbsp">tbsp</SelectItem>
                          <SelectItem value="tsp">tsp</SelectItem>
                          <SelectItem value="cups">cups</SelectItem>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="l">l</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={addIngredient}
                        size="sm"
                        className="h-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {newRecipe.ingredients &&
                    newRecipe.ingredients.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Recipe Ingredients:
                        </Label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {newRecipe.ingredients.map((ingredient, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg bg-background"
                            >
                              <div className="flex-1">
                                <div className="font-medium">
                                  {ingredient.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {ingredient.quantity} {ingredient.unit}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeIngredient(ingredient.name)
                                }
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateRecipe}>Create Recipe</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const categoryRecipes = recipes.filter(
              (recipe) => recipe.category === category.id
            );
            return (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className={category.color}>{category.name}</Badge>
                      <p className="text-2xl font-bold mt-2">
                        {categoryRecipes.length}
                      </p>
                      <p className="text-sm text-muted-foreground">recipes</p>
                    </div>
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <DraggableRecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              moveRecipe={moveRecipe}
              getCategoryInfo={getCategoryInfo}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No recipes found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first recipe"}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Recipe
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
}
