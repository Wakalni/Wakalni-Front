import TrackingMap from "./TrackingMap";
import TrackingSearch from "./TrackingSearch";
import { useState } from "react";
import OrdersList from "./Orders";
import { Button } from "@/components/ui/button";
import {
  Badge,
  BarChart3,
  Home,
  Link,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

export default function TrackingHome() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (tab: number) => {
    setSelectedTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={selectedTab === 0 ? "default" : "ghost"}
              onClick={() => handleTabClick(0)}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>

            <Button
              variant={selectedTab === 1 ? "default" : "ghost"}
              onClick={() => handleTabClick(1)}
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Button>
          </div>
        </div>
      </nav>
      {selectedTab === 0 && (
        <main className="container mx-auto px-4 py-8 space-y-12">
          <TrackingMap />
          <TrackingSearch />
        </main>
      )}
      {selectedTab === 1 && (
        <main className="container mx-auto px-4 py-8 space-y-12">
          <OrdersList />
        </main>
      )}
    </div>
  );
}
