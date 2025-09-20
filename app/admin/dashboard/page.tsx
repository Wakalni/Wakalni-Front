"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/dashboard/Sidebar";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { RecipeManagement } from "@/components/admin/dashboard/RecipeManagement";
import { OrderPanel } from "@/components/admin/dashboard/OrderPanel";
import { WalletSystem } from "@/components/admin/dashboard/WalletSystem";
import { StatisticsPage } from "@/components/admin/dashboard/StatisticsPage";
import { InventoryManagement } from "@/components/admin/dashboard/InventoryManagement";
import Image from "next/image";
import Link from "next/link";
import TrackingHome from "@/components/admin/tracking";

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "recipes":
        return <RecipeManagement />;
      case "orders":
        return <OrderPanel />;
      case "wallet":
        return <WalletSystem />;
      case "inventory":
        return <InventoryManagement />;
      case "tracking":
        return <TrackingHome />;
      case "statistics":
        return <StatisticsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {/* Profil du restaurant */}
        <div className="flex items-center gap-4 bg-card p-6 border-b border-border">
          <Link href={"/admin/profile"}>
            <Image
              about="Image of the restaurant"
              width={64}
              height={64}
              src="/abstract-geometric-shapes.png"
              alt="Restaurant"
              className="w-16 h-16 rounded-full object-cover border"
            />
          </Link>
          <div>
            <div className="text-xl font-bold">Pizza Resto</div>
            <div className="text-sm text-muted-foreground">
              contact@pizza-resto.com
            </div>
            <div className="mt-1 text-primary font-semibold">
              Solde Wallet: 867.000 DA
            </div>
          </div>
        </div>
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
