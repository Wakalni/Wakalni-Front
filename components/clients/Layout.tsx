"use client";
import { ReactNode } from "react";
import { Search, ShoppingCart, ArrowLeft, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
}

export function Layout({
  children,
  title,
  showBackButton = false,
  showSearch = false,
  onBackClick,
  onSearchChange,
}: LayoutProps) {
  const cartItemsCount = useCart((state) => state.getTotalItems());
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Remplace cette valeur par la vraie logique de récupération du solde
  const walletBalance = 2500; // DA

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <Button
                  size="sm"
                  onClick={onBackClick || router.back}
                  className="p-1"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}

              <div>
                {title ? (
                  <h1 className="text-xl font-bold text-foreground">{title}</h1>
                ) : (
                  <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent">
                      Wakalni
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Fast delivery in Algeria
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Wallet */}
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-primary">
                  {walletBalance} DA
                </span>
                <span className="text-xs text-muted-foreground">Wallet</span>
              </div>
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-600" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {/* Profile */}
              <Button asChild variant="ghost" size="sm" className="p-1">
                <Link href="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              {/* Cart */}
              <Button asChild variant="ghost" size="sm" className="relative">
                <Link href={"/checkout"}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          {showSearch && (
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search restaurants..."
                className="pl-10"
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
