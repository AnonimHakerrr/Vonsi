import { useState } from "react";
import { Star, Info } from "lucide-react";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import { Label } from "../../components/Label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/Select";
import type { EquipmentCardProps } from "./types";

export default function EquipmentCard({
  item,
  onAddToCart,
  rentalDays,
  startDate,
  endDate,
  cart,
}: EquipmentCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const addedCount = cart
    .filter(
      (cartItem) =>
        cartItem.id === item.id &&
        (item.availableSizes ? cartItem.selectedSize === selectedSize : true)
    )
    .reduce((sum, ci) => sum + ci.quantity, 0);

  const maxAvailable = selectedSize
    ? item.availableSizes.find((s) => s.size === selectedSize)?.quantity ??
      item.totalQuantityAvailable
    : item.totalQuantityAvailable;

  return (
    <Card className="mt-1 border-2 hover:border-yellow-400 transition-colors hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <img
            src={item.images[0] || "/placeholder.svg"}
            alt={item.type}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs border rounded px-1">{item.brand}</div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {item.rating}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">
              {{
                ski: "Лижі",
                snowboard: "Сноуборд",
                boots: "Черевики",
                helmet: "Шолом",
                suit: "Костюм",
              }[item.type] || item.type}{" "}
              {item.brand}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
          </div>

          {item.availableSizes && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Розмір</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="rounded-2">
                  <SelectValue placeholder="Оберіть розмір" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {item.availableSizes.map((size, index) => (
                    <SelectItem key={index} value={size.size}>
                      {size.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">₴{item.pricePerDay}</div>
              <div className="text-xs text-muted-foreground">за день</div>
              {rentalDays > 1 && (
                <div className="text-sm font-medium text-yellow-600">
                  ₴{item.pricePerDay * rentalDays} за {rentalDays} дн.
                </div>
              )}
            </div>
            <Button
              onClick={() => onAddToCart(item, selectedSize)}
              disabled={
                (item.availableSizes && !selectedSize) ||
                !startDate ||
                !endDate ||
                addedCount >= maxAvailable
              }
              className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-2 !flex !w-1/2"
            >
              Додати
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>В наявності: {item.totalQuantityAvailable} шт.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
