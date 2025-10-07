import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../../components/Button";
import { Card, CardContent } from "../../components/Card";
import type { CartViewProps } from "./types";

export default function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onConfirmRental,
  isLoggedIn,
}: CartViewProps) {
  if (cart.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Кошик порожній</h3>
          <p className="text-muted-foreground">Додайте обладнання для оренди</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
      {cart.map((item) => {
        const maxQuantity = item.selectedSize
          ? item.availableSizes.find((s) => s.size === item.selectedSize)
              ?.quantity || item.totalQuantityAvailable
          : item.totalQuantityAvailable;

        return (
          <Card key={`${item.id}-${item.selectedSize}`} className="w-full">
            <CardContent className="p-4">
              <div className="space-y-4">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.type}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="flex flex-col gap-1">
                  <h3 className="!font-bold text-base sm:text-lg md:text-xl m-0">
                    {{
                      ski: "Лижі",
                      snowboard: "Сноуборд",
                      boots: "Черевики",
                      helmet: "Шолом",
                      suit: "Костюм",
                    }[item.type] || item.type}{" "}
                    {item.brand}
                  </h3>
                  {item.selectedSize && (
                    <p className="text-xs sm:text-sm m-0">
                      Розмір: {item.selectedSize}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ₴{item.pricePerDay} × {item.rentalDays} дн. ×{" "}
                    {item.quantity} шт.
                  </p>
                </div>

                <div className="flex justify-center items-center gap-2 mt-2 sm:mt-0">
                  <Button
                    size="sm"
                    className="!w-1/3 sm:!w-10 md:!w-12 lg:!w-14 !flex justify-center rounded-2 bg-yellow-400 hover:bg-yellow-500 transition-colors"
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <Button
                    size="sm"
                    className="!w-1/3 sm:!w-10 md:!w-12 lg:!w-14 !flex justify-center rounded-2 bg-yellow-400 hover:bg-yellow-500 transition-colors"
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    disabled={item.quantity >= maxQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <div className="font-bold text-xl sm:text-xl md:text-2xl">
                    ₴
                    {(
                      item.pricePerDay *
                      item.quantity *
                      item.rentalDays
                    ).toLocaleString()}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onRemoveItem(item.id, item.selectedSize)}
                    className="!text-xs !w-1/2 text-black bg-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold rounded-2"
                  >
                    Видалити
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Card className="border-2 border-yellow-400 xl:col-span-3">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-center gap-4 text-lg font-bold">
              <span>Загальна сума:</span>
              <span className="text-2xl text-yellow-500">
                ₴{totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button
                className={`!w-1/2 !text-md md:!w-full lg:!w-1/2 md:!text-sm lg:!text-lg font-bold py-1 rounded-2 !flex justify-center items-center ${
                  isLoggedIn
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
                onClick={onConfirmRental}
              >
                {isLoggedIn ? "Оформити" : "Увійдіть для оформлення"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Обладнання можна забрати в день початку оренди з 8:00 до 20:00
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
