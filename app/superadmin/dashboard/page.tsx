"use client";

import { SuperadminOverview } from "@/components/superadmin/dashboard/DashboardOverview";
import { RestaurantManagement } from "@/components/superadmin/dashboard/RestaurantsManagement";
import { SuperadminSidebar } from "@/components/superadmin/dashboard/Sidebar";
import { GlobalStatistics } from "@/components/superadmin/dashboard/StatisticsPage";
import { UserManagement } from "@/components/superadmin/dashboard/UsersManagement";
import { SuperadminWallet } from "@/components/superadmin/dashboard/WalletSystem";
import { useState } from "react";

export default function SuperadminPortal() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <SuperadminOverview />;
      case "restaurants":
        return <RestaurantManagement />;
      case "users":
        return <UserManagement />;
      case "statistics":
        return <GlobalStatistics />;
      case "wallet":
        return <SuperadminWallet />;
      default:
        return <SuperadminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SuperadminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
