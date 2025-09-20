import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  supplements?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  onAddToCart: () => void;
}

export function MenuItemCard({
  name,
  description,
  price,
  image,
  available,
  supplements,
  onAddToCart,
}: MenuItemCardProps) {
  return (
    <Card
      className={`overflow-hidden shadow-card ${
        !available ? "opacity-60" : ""
      }`}
    >
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-card-foreground leading-tight">
                {name}
              </h3>
              {!available && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">
                  {price} DA
                </span>
                {supplements && supplements.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    Customizable
                  </span>
                )}
              </div>

              <Button
                size="sm"
                disabled={!available}
                onClick={onAddToCart}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-24 h-24 m-2">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </Card>
  );
}
