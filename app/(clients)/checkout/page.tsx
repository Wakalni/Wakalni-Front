"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export default function CheckoutPage() {
  const cartItems = useCart((state) => state.items);
  const totalItems = useCart((state) => state.getTotalItems());
  const totalPrice = useCart((state) => state.getTotalPrice());
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {cartItems.map((item) => (
        <Card key={item.id} className="flex gap-4 p-4">
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
          <div className="flex-1 space-y-2">
            <CardHeader className="p-0">
              <CardTitle className="text-lg">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-1">
              <p className="text-sm text-muted-foreground">
                {item.quantity} x {item.price.toFixed(2)} DA
              </p>

              {item.supplements && item.supplements.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <span>Supplements: </span>
                  {item.supplements.map((s) => (
                    <span key={s.id}>
                      {s.name} (+{s.price} DZD){" "}
                    </span>
                  ))}
                </div>
              )}

              <p className="font-semibold">
                Total: {item.price * item.quantity} DA
              </p>
            </CardContent>
          </div>
        </Card>
      ))}

      <Separator />

      <div className="flex justify-between items-center text-lg font-semibold">
        <span>Grand Total</span>
        <span>{totalPrice.toFixed(2)} DA</span>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-2">Mode de réception</h2>
          <label>
            <input
              type="radio"
              name="deliveryType"
              value="pickup"
              checked={deliveryType === "pickup"}
              onChange={() => setDeliveryType("pickup")}
            />
            <span className="ml-2">Pick up</span>
          </label>
          <label className="ml-6">
            <input
              type="radio"
              name="deliveryType"
              value="delivery"
              checked={deliveryType === "delivery"}
              onChange={() => setDeliveryType("delivery")}
            />
            <span className="ml-2">Delivery</span>
          </label>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Méthode de paiement</h2>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span className="ml-2">Carte (Guidini)</span>
          </label>
          <label className="ml-6">
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={() => setPaymentMethod("wallet")}
            />
            <span className="ml-2">Wallet</span>
          </label>
        </div>
      </div>

      <Button className="w-full text-lg">Proceed to Payment</Button>
    </div>
  );
}
