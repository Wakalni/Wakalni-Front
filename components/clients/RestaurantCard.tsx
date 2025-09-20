import { Star, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
  deliveryFee: number;
  onClick?: () => void;
}

export function RestaurantCard({
  name,
  image,
  rating,
  category,
  deliveryTime,
  deliveryFee,
  onClick,
}: RestaurantCardProps) {
  return (
    <Card
      className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={500}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground"
          >
            {deliveryFee === 0 ? "Free Delivery" : `${deliveryFee} DA`}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-card-foreground leading-tight">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-rating text-rating" />
            <span className="font-medium">{rating}</span>
          </div>

          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
