"use client";

import { useState } from "react";
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  costPerUnit: number;
  supplier: string;
  lastUpdated: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Pizza dough",
    category: "bakery",
    currentStock: 50,
    unit: "pieces",
    minStock: 20,
    maxStock: 100,
    costPerUnit: 0.5,
    supplier: "Local Bakery",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Mozzarella",
    category: "dairy",
    currentStock: 5,
    unit: "kg",
    minStock: 3,
    maxStock: 15,
    costPerUnit: 8.5,
    supplier: "Dairy Co.",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Tomatoes",
    category: "vegetables",
    currentStock: 20,
    unit: "pieces",
    minStock: 10,
    maxStock: 50,
    costPerUnit: 0.3,
    supplier: "Fresh Farms",
    lastUpdated: "2024-01-15",
  },
  {
    id: "4",
    name: "Basil",
    category: "herbs",
    currentStock: 2,
    unit: "bunches",
    minStock: 1,
    maxStock: 10,
    costPerUnit: 2.0,
    supplier: "Herb Garden",
    lastUpdated: "2024-01-13",
  },
  {
    id: "5",
    name: "Olive oil",
    category: "oils",
    currentStock: 1,
    unit: "liter",
    minStock: 2,
    maxStock: 5,
    costPerUnit: 12.0,
    supplier: "Mediterranean Imports",
    lastUpdated: "2024-01-12",
  },
];

const categories = [
  { id: "all", name: "All Categories", color: "bg-gray-100 text-gray-800" },
  {
    id: "vegetables",
    name: "Vegetables",
    color: "bg-green-100 text-green-800",
  },
  { id: "dairy", name: "Dairy", color: "bg-blue-100 text-blue-800" },
  { id: "meat", name: "Meat", color: "bg-red-100 text-red-800" },
  { id: "bakery", name: "Bakery", color: "bg-yellow-100 text-yellow-800" },
  { id: "herbs", name: "Herbs", color: "bg-emerald-100 text-emerald-800" },
  { id: "oils", name: "Oils", color: "bg-amber-100 text-amber-800" },
];

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [stockChange, setStockChange] = useState({
    quantity: 0,
    type: "add" as "add" | "remove",
    reason: "",
  });

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    currentStock: 0,
    unit: "kg",
    minStock: 0,
    maxStock: 0,
    costPerUnit: 0,
    supplier: "",
  });

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.minStock
  );
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.currentStock * item.costPerUnit,
    0
  );

  const handleCreateItem = () => {
    if (newItem.name && newItem.category) {
      const item: InventoryItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        currentStock: newItem.currentStock || 0,
        unit: newItem.unit || "kg",
        minStock: newItem.minStock || 0,
        maxStock: newItem.maxStock || 0,
        costPerUnit: newItem.costPerUnit || 0,
        supplier: newItem.supplier || "",
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setInventory([...inventory, item]);
      setNewItem({
        name: "",
        category: "",
        currentStock: 0,
        unit: "kg",
        minStock: 0,
        maxStock: 0,
        costPerUnit: 0,
        supplier: "",
      });
      setIsCreateDialogOpen(false);
    }
  };

  const handleStockUpdate = () => {
    if (selectedItem && stockChange.quantity > 0) {
      const updatedInventory = inventory.map((item) => {
        if (item.id === selectedItem.id) {
          const newStock =
            stockChange.type === "add"
              ? item.currentStock + stockChange.quantity
              : Math.max(0, item.currentStock - stockChange.quantity);
          return {
            ...item,
            currentStock: newStock,
            lastUpdated: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      });
      setInventory(updatedInventory);
      setStockChange({ quantity: 0, type: "add", reason: "" });
      setSelectedItem(null);
      setIsStockDialogOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) {
      return {
        status: "low",
        color: "bg-red-100 text-red-800",
        icon: AlertTriangle,
      };
    }
    if (item.currentStock >= item.maxStock * 0.8) {
      return {
        status: "high",
        color: "bg-green-100 text-green-800",
        icon: TrendingUp,
      };
    }
    return {
      status: "normal",
      color: "bg-blue-100 text-blue-800",
      icon: Package,
    };
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: categoryId,
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage your restaurant's ingredient stock and supplies
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Ingredient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Ingredient</DialogTitle>
                <DialogDescription>
                  Add a new ingredient to your inventory
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ingredient Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="Enter ingredient name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <div className="flex gap-2">
                    <Input
                      id="currentStock"
                      type="number"
                      value={newItem.currentStock}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          currentStock: Number(e.target.value),
                        })
                      }
                      placeholder="0"
                    />
                    <Select
                      value={newItem.unit}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, unit: value })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="bunches">Bunches</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costPerUnit">Cost per Unit (DZD)</Label>
                  <Input
                    id="costPerUnit"
                    type="number"
                    step="0.01"
                    value={newItem.costPerUnit}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        costPerUnit: Number(e.target.value),
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        minStock: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Maximum Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        maxStock: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) =>
                      setNewItem({ ...newItem, supplier: e.target.value })
                    }
                    placeholder="Enter supplier name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateItem}>Add Ingredient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Items
                </p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {lowStockItems.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Value
                </p>
                <p className="text-2xl font-bold">
                  {totalValue.toFixed(2)} DZD
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Categories
                </p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search ingredients..."
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
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item);
              const categoryInfo = getCategoryInfo(item.category);
              const StatusIcon = stockStatus.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 space-x-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={categoryInfo.color}>
                            {categoryInfo.name}
                          </Badge>
                          <Badge className={stockStatus.color}>
                            {stockStatus.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium">
                        {item.currentStock} {item.unit}
                      </p>
                      <p className="text-muted-foreground">Current</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        {item.minStock} - {item.maxStock}
                      </p>
                      <p className="text-muted-foreground">Min - Max</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        ${item.costPerUnit.toFixed(2)}
                      </p>
                      <p className="text-muted-foreground">Cost/Unit</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        ${(item.currentStock * item.costPerUnit).toFixed(2)}
                      </p>
                      <p className="text-muted-foreground">Total Value</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsStockDialogOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Update Stock
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stock Update Dialog */}
      <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock - {selectedItem?.name}</DialogTitle>
            <DialogDescription>
              Add or remove stock for this ingredient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Current Stock</p>
                <p className="text-2xl font-bold">
                  {selectedItem?.currentStock} {selectedItem?.unit}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Action</Label>
              <Select
                value={stockChange.type}
                onValueChange={(value: "add" | "remove") =>
                  setStockChange({ ...stockChange, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock</SelectItem>
                  <SelectItem value="remove">Remove Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={stockChange.quantity}
                onChange={(e) =>
                  setStockChange({
                    ...stockChange,
                    quantity: Number(e.target.value),
                  })
                }
                placeholder="Enter quantity"
              />
            </div>
            <div className="space-y-2">
              <Label>Reason (Optional)</Label>
              <Input
                value={stockChange.reason}
                onChange={(e) =>
                  setStockChange({ ...stockChange, reason: e.target.value })
                }
                placeholder="e.g., New delivery, Waste, Used in kitchen"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStockUpdate}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredInventory.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No ingredients found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first ingredient"}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
