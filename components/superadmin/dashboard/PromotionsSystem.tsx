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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Gift,
  Plus,
  CalendarIcon,
  Percent,
  DollarSign,
  Target,
  Copy,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: "percentage" | "fixed" | "bogo" | "free_delivery";
  value: number;
  code: string;
  minOrder?: number;
  maxDiscount?: number;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  targetAudience: "all" | "new" | "returning" | "vip";
  restaurants?: string[];
}

interface PromotionsSystemProps {
  userType: "client" | "admin";
  restaurantId?: string;
}

export function PromotionsSystem({
  userType,
  restaurantId,
}: PromotionsSystemProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      title: "Welcome Bonus",
      description: "20% off your first order",
      type: "percentage",
      value: 20,
      code: "WELCOME20",
      minOrder: 15,
      maxDiscount: 10,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      usageLimit: 1000,
      usedCount: 245,
      isActive: true,
      targetAudience: "new",
    },
    {
      id: "2",
      title: "Free Delivery Weekend",
      description: "Free delivery on all orders this weekend",
      type: "free_delivery",
      value: 0,
      code: "FREEDEL",
      minOrder: 25,
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-01-21"),
      usageLimit: 500,
      usedCount: 156,
      isActive: true,
      targetAudience: "all",
    },
    {
      id: "3",
      title: "Buy One Get One",
      description: "Buy one pizza, get one 50% off",
      type: "bogo",
      value: 50,
      code: "BOGO50",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-31"),
      usageLimit: 200,
      usedCount: 89,
      isActive: false,
      targetAudience: "all",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    type: "percentage",
    targetAudience: "all",
    isActive: true,
  });

  const handleCreatePromotion = () => {
    if (
      newPromotion.title &&
      newPromotion.code &&
      newPromotion.startDate &&
      newPromotion.endDate
    ) {
      const promotion: Promotion = {
        id: Date.now().toString(),
        title: newPromotion.title,
        description: newPromotion.description || "",
        type: newPromotion.type || "percentage",
        value: newPromotion.value || 0,
        code: newPromotion.code.toUpperCase(),
        minOrder: newPromotion.minOrder,
        maxDiscount: newPromotion.maxDiscount,
        startDate: newPromotion.startDate,
        endDate: newPromotion.endDate,
        usageLimit: newPromotion.usageLimit,
        usedCount: 0,
        isActive: newPromotion.isActive || true,
        targetAudience: newPromotion.targetAudience || "all",
      };
      setPromotions([...promotions, promotion]);
      setNewPromotion({
        type: "percentage",
        targetAudience: "all",
        isActive: true,
      });
      setIsCreateDialogOpen(false);
    }
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
      )
    );
  };

  const copyPromotionCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const getPromotionTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "fixed":
        return <DollarSign className="h-4 w-4" />;
      case "bogo":
        return <Gift className="h-4 w-4" />;
      case "free_delivery":
        return <Target className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getPromotionValue = (promo: Promotion) => {
    switch (promo.type) {
      case "percentage":
        return `${promo.value}% off`;
      case "fixed":
        return `$${promo.value} off`;
      case "bogo":
        return `BOGO ${promo.value}% off`;
      case "free_delivery":
        return "Free delivery";
      default:
        return "Special offer";
    }
  };

  if (userType === "client") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Available Promotions
            </CardTitle>
            <CardDescription>
              Use these codes to save on your orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {promotions
                .filter((promo) => promo.isActive)
                .map((promo) => (
                  <Card key={promo.id} className="relative overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getPromotionTypeIcon(promo.type)}
                          <h3 className="font-semibold">{promo.title}</h3>
                        </div>
                        <Badge variant="secondary">
                          {getPromotionValue(promo)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {promo.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
                          <code className="font-mono font-semibold">
                            {promo.code}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyPromotionCode(promo.code)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Expires {format(promo.endDate, "MMM dd")}
                        </span>
                      </div>
                      {promo.minOrder && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Min. order: ${promo.minOrder}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Promotions Management
              </CardTitle>
              <CardDescription>
                Create and manage promotional campaigns
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Promotion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Promotion</DialogTitle>
                  <DialogDescription>
                    Set up a new promotional campaign for your restaurant
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Promotion Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Weekend Special"
                        value={newPromotion.title || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Promo Code</Label>
                      <Input
                        id="code"
                        placeholder="e.g., WEEKEND20"
                        value={newPromotion.code || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your promotion..."
                      value={newPromotion.description || ""}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Promotion Type</Label>
                      <Select
                        value={newPromotion.type}
                        onValueChange={(value: any) =>
                          setNewPromotion({ ...newPromotion, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">
                            Percentage Off
                          </SelectItem>
                          <SelectItem value="fixed">
                            Fixed Amount Off
                          </SelectItem>
                          <SelectItem value="bogo">Buy One Get One</SelectItem>
                          <SelectItem value="free_delivery">
                            Free Delivery
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        placeholder={
                          newPromotion.type === "percentage" ? "20" : "5"
                        }
                        value={newPromotion.value || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            value: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <Select
                        value={newPromotion.targetAudience}
                        onValueChange={(value: any) =>
                          setNewPromotion({
                            ...newPromotion,
                            targetAudience: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Customers</SelectItem>
                          <SelectItem value="new">New Customers</SelectItem>
                          <SelectItem value="returning">
                            Returning Customers
                          </SelectItem>
                          <SelectItem value="vip">VIP Customers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minOrder">Minimum Order (optional)</Label>
                      <Input
                        id="minOrder"
                        type="number"
                        placeholder="25.00"
                        value={newPromotion.minOrder || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            minOrder: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        placeholder="100"
                        value={newPromotion.usageLimit || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            usageLimit: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newPromotion.startDate
                              ? format(newPromotion.startDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newPromotion.startDate}
                            onSelect={(date) =>
                              setNewPromotion({
                                ...newPromotion,
                                startDate: date,
                              })
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newPromotion.endDate
                              ? format(newPromotion.endDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newPromotion.endDate}
                            onSelect={(date) =>
                              setNewPromotion({
                                ...newPromotion,
                                endDate: date,
                              })
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newPromotion.isActive}
                      onCheckedChange={(checked) =>
                        setNewPromotion({ ...newPromotion, isActive: checked })
                      }
                    />
                    <Label htmlFor="active">Activate immediately</Label>
                  </div>
                  <Button onClick={handleCreatePromotion} className="w-full">
                    Create Promotion
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotions.map((promo) => (
              <Card key={promo.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getPromotionTypeIcon(promo.type)}
                        <h3 className="font-semibold">{promo.title}</h3>
                        <Badge
                          variant={promo.isActive ? "default" : "secondary"}
                        >
                          {promo.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {getPromotionValue(promo)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {promo.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-mono bg-muted px-2 py-1 rounded">
                          {promo.code}
                        </span>
                        <span>
                          Used: {promo.usedCount}
                          {promo.usageLimit ? `/${promo.usageLimit}` : ""}
                        </span>
                        <span>
                          Expires: {format(promo.endDate, "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={promo.isActive}
                        onCheckedChange={() => togglePromotionStatus(promo.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Promotion Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Analytics</CardTitle>
          <CardDescription>
            Track the performance of your promotional campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {promotions.reduce((sum, promo) => sum + promo.usedCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Uses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                $
                {promotions
                  .reduce(
                    (sum, promo) => sum + promo.usedCount * (promo.value || 0),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Savings Given
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {promotions.filter((promo) => promo.isActive).length}
              </p>
              <p className="text-sm text-muted-foreground">Active Promotions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
