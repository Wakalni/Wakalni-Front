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
import { CheckCircle, XCircle, Tag } from "lucide-react";

interface PromoCodeValidatorProps {
  orderAmount: number;
  onPromoApplied: (discount: number, promoCode: string) => void;
}

export function PromoCodeValidator({
  orderAmount,
  onPromoApplied,
}: PromoCodeValidatorProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    error?: string;
    discount?: number;
    promotion?: any;
  } | null>(null);

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;

    setIsValidating(true);
    try {
      const response = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode.trim(),
          orderAmount,
        }),
      });

      const result = await response.json();
      setValidationResult(result);

      if (result.valid && result.discount) {
        onPromoApplied(result.discount, promoCode.trim());
      }
    } catch (error) {
      console.error("[v0] Failed to validate promo code:", error);
      setValidationResult({ valid: false, error: "Failed to validate code" });
    } finally {
      setIsValidating(false);
    }
  };

  const clearPromoCode = () => {
    setPromoCode("");
    setValidationResult(null);
    onPromoApplied(0, "");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Promo Code
        </CardTitle>
        <CardDescription>
          Enter a promotional code to get a discount
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="promo">Promo Code</Label>
            <Input
              id="promo"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              disabled={validationResult?.valid}
            />
          </div>
          <div className="flex items-end">
            {validationResult?.valid ? (
              <Button onClick={clearPromoCode} variant="outline">
                Remove
              </Button>
            ) : (
              <Button
                onClick={validatePromoCode}
                disabled={!promoCode.trim() || isValidating}
              >
                {isValidating ? "Validating..." : "Apply"}
              </Button>
            )}
          </div>
        </div>

        {validationResult && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              validationResult.valid
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {validationResult.valid ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <div className="flex-1">
              {validationResult.valid ? (
                <div>
                  <p className="font-medium">Promo code applied!</p>
                  <p className="text-sm">
                    You saved ${validationResult.discount?.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="font-medium">{validationResult.error}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
