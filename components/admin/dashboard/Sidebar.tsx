"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ChefHat,
  ShoppingCart,
  Wallet,
  BarChart3,
  UtensilsCrossed,
  Package,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "recipes", label: "Recipes", icon: ChefHat },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "statistics", label: "Statistics", icon: BarChart3 },
  { id: "tracking", label: "Tracking", icon: MapPin },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-sidebar-accent" />
          <div>
            <Link href="/" className="flex items-center gap-2 select-none">
              <Image
                src="/logo.png"
                alt="EasyDine Logo"
                width={150}
                height={80}
                className="rounded-full"
                priority
              />
            </Link>
            <p className="text-sm text-sidebar-primary-foreground">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                    : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-primary-foreground text-center">
          © 2024 EasyDine
        </div>
      </div>
    </div>
  );
}
