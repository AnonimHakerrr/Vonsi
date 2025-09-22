// src/pages/RentalPage.tsx
import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import {
  CalendarIcon,
  Plus,
  Minus,
  Star,
  Snowflake,
  Info,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import { equipment, type Equipment } from "../Data/mockData";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/Card";
import { Label } from "../components/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Calendar } from "../components/Calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import { SidebarMenu } from "../components/SidebarMenu";
import { RentalConfirmationModal } from "../components/RentalConfirmationModal";
import { AuthModal } from "../components/AuthModal";

interface CartItem extends Equipment {
  quantity: number;
  selectedSize?: string;
  rentalDays: number;
}

export default function RentalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showCart, setShowCart] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isLoggedIn] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const categories = [
    { id: "all", name: "Все обладнання", icon: Snowflake },
    { id: "skis", name: "Лижі", icon: Snowflake },
    { id: "snowboards", name: "Сноуборди", icon: Snowflake },
    { id: "boots", name: "Черевики", icon: Snowflake },
    { id: "helmets", name: "Шоломи", icon: Snowflake },
    { id: "accessories", name: "Аксесуари", icon: Snowflake },
  ];

  const filteredEquipment =
    selectedCategory === "all"
      ? equipment
      : equipment.filter((item) => item.category === selectedCategory);

  const calculateRentalDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const addToCart = (item: Equipment, size?: string) => {
    const rentalDays = calculateRentalDays();
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.selectedSize === size
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        { ...item, quantity: 1, selectedSize: size, rentalDays },
      ]);
    }
  };

  const removeFromCart = (itemId: string, size?: string) => {
    setCart(
      cart.filter((item) => !(item.id === itemId && item.selectedSize === size))
    );
  };

  const updateQuantity = (
    itemId: string,
    size: string | undefined,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, size);
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId && item.selectedSize === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity * item.rentalDays,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleRentalConfirmation = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    setConfirmationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />

      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl !font-bold mb-4 text-balance">
              Оренда <span className="text-yellow-400">обладнання</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Орендуйте найкраще лижне обладнання від провідних брендів
            </p>
          </div>

          {!isLoggedIn && cart.length > 0 && (
            <Card className="mb-6 border-yellow-400 bg-yellow-50">
              <CardContent className="p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Лівий блок з іконкою і текстом */}
                  <div className="flex items-start sm:items-center gap-2">
                    <LogIn className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800 m-0 text-sm sm:text-base">
                        Увійдіть для оформлення оренди
                      </p>
                      <p className="text-xs sm:text-sm text-yellow-700 m-0">
                        Для продовження потрібна авторизація
                      </p>
                    </div>
                  </div>

                  {/* Кнопка */}
                  <Button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 !rounded-md font-semibold text-xs sm:text-sm px-3 py-2"
                  >
                    Увійти
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 md:col-span-2 xl:col-span-1   space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Період оренди
                  </CardTitle>
                  <CardDescription>
                    Оберіть дати оренди для розрахунку вартості
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Дата початку</Label>
                    <Popover>
                      <PopoverTrigger asChild className="rounded-2">
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal bg-transparent !flex "
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {startDate
                            ? format(startDate, "dd MMM yyyy", { locale: uk })
                            : "Оберіть дату"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelectDate={setStartDate} // твій новий проп
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // обнуляємо час
                            return date < today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">Дата закінчення</Label>
                    <Popover>
                      <PopoverTrigger asChild className="rounded-2">
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal bg-transparent !flex "
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate
                            ? format(endDate, "dd MMM yyyy", { locale: uk })
                            : "Оберіть дату"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelectDate={setEndDate} // твій новий проп
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // обнуляємо час
                            return date < today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {startDate && endDate && (
                    <div className="bg-yellow-50 p-3 rounded-lg flex items-center">
                      <p className="text-sm font-medium">
                        Кількість днів: {calculateRentalDays()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Категорії</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 ">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "default" : "ghost"
                        }
                        className={`w-full !flex justify-start rounded-2 ${
                          selectedCategory === category.id
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-transparent"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 md:col-span-2 xl:col-span-3">
              <Tabs
                value={showCart ? "cart" : "equipment"}
                onValueChange={(value) => setShowCart(value === "cart")}
              >
                <TabsList className="flex flex-wrap justify-around bg-gray-200  rounded-lg px-1 py-0">
                  <TabsTrigger
                    value="equipment"
                    className="w-1/2 rounded-2 data-[state=active]:bg-yellow-400 hover:bg-gray-100"
                  >
                    Обладнання
                  </TabsTrigger>
                  <TabsTrigger
                    value="cart"
                    className="w-1/2 rounded-2 data-[state=active]:bg-yellow-400 hover:bg-gray-100"
                  >
                    Кошик ({getTotalItems()})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="equipment" className="space-y-6">
                  <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
                    {filteredEquipment.map((item) => (
                      <EquipmentCard
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                        rentalDays={calculateRentalDays()}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cart" className="space-y-6">
                  <CartView
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeFromCart}
                    totalPrice={getTotalPrice()}
                    onConfirmRental={handleRentalConfirmation}
                    isLoggedIn={isLoggedIn}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <RentalConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        cart={cart}
        totalPrice={getTotalPrice()}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

function EquipmentCard({
  item,
  onAddToCart,
  rentalDays,
}: {
  item: Equipment;
  onAddToCart: (item: Equipment, size?: string) => void;
  rentalDays: number;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <Card className="border-2 hover:border-yellow-400 transition-colors">
      <CardContent className="p-6">
        <div className="space-y-4">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
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
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
          </div>

          {item.sizes && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Розмір</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="rounded-2">
                  <SelectValue placeholder="Оберіть розмір" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {item.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">₴{item.price}</div>
              <div className="text-xs text-muted-foreground">за день</div>
              {rentalDays > 1 && (
                <div className="text-sm font-medium text-yellow-600">
                  ₴{item.price * rentalDays} за {rentalDays} дн.
                </div>
              )}
            </div>
            <Button
              onClick={() => onAddToCart(item, selectedSize)}
              disabled={item.sizes && !selectedSize}
              className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-2 !flex !w-1/2"
            >
              <Plus className="h-4 w-4" />
              Додати
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>В наявності: {item.inStock} шт.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onConfirmRental,
  isLoggedIn,
}: {
  cart: CartItem[];
  onUpdateQuantity: (
    itemId: string,
    size: string | undefined,
    quantity: number
  ) => void;
  onRemoveItem: (itemId: string, size?: string) => void;
  totalPrice: number;
  onConfirmRental: () => void;
  isLoggedIn: boolean;
}) {
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
      {cart.map((item) => (
        <Card key={`${item.id}-${item.selectedSize}`} className="w-full">
          <CardContent className="p-4">
            <div className="space-y-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="flex flex-col gap-1">
                <h3 className="!font-bold text-base sm:text-lg md:text-xl m-0">{item.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground m-0">{item.brand}</p>
                {item.selectedSize && <p className="text-xs sm:text-sm m-0">Розмір: {item.selectedSize}</p>}
                <p className="text-xs sm:text-sm text-muted-foreground">
                  ₴{item.price} × {item.rentalDays} дн. × {item.quantity} шт.
                </p>
              </div>

              <div className="flex justify-center items-center gap-2 mt-2 sm:mt-0">
                <Button
                  size="sm"
                  className="!w-1/3 sm:!w-10 md:!w-12 lg:!w-14 !flex justify-center rounded-2 bg-yellow-400 hover:bg-yellow-500 transition-colors"
                  onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  size="sm"
                  className="!w-1/3 sm:!w-10 md:!w-12 lg:!w-14 !flex justify-center rounded-2 bg-yellow-400 hover:bg-yellow-500 transition-colors"
                  onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="font-bold text-xl sm:text-2xl md:text-3xl">
                  ₴{(item.price * item.quantity * item.rentalDays).toLocaleString()}
                </div>
                <Button
                  size="sm"
                  onClick={() => onRemoveItem(item.id, item.selectedSize)}
                  className=" !text-xs !w-1/2 text-black bg-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold rounded-2"
                >
                  Видалити
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Підсумок */}
      <Card className="border-2 border-yellow-400 xl:col-span-3">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Загальна сума:</span>
              <span>₴{totalPrice.toLocaleString()}</span>
            </div>
            <Button
              className={`w-full text-lg py-6 ${
                isLoggedIn
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
              onClick={onConfirmRental}
            >
              {isLoggedIn ? "Оформити оренду" : "Увійдіть для оформлення"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Обладнання можна забрати в день початку оренди з 8:00 до 20:00
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
