// src/pages/RentalPage.tsx
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Snowflake } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import { SidebarMenu } from "../../components/SidebarMenu";
import { RentalConfirmationModal } from "../../components/RentalConfirmationModal";
import { AuthModal } from "../../components/AuthModal";
import http_api from "../../services/http_api";
import { LoginPromptCard } from "./LoginPromptCard";
import { useUser } from "../../store/UseContext";
import RentalPeriodCard from "./RentalPeriodCard";
import RentalCategoryCard from "./RentalCategoryCard";
import EquipmentCard from "./EquipmentCard";
import CartView from "./CartView";
import type { CartItem, Equipmentt } from "./types";

export default function RentalPage() {
  // --- Стан ---
  const [equipmentList, setEquipmentList] = useState<Equipmentt[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCart, setShowCart] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const { user } = useUser();
  const isLoggedIn = !!user; // Чи увійшов користувач

  // --- Визначаємо категорії ---
  const categories = [
    { id: "all", name: "Все обладнання", icon: Snowflake  },
    { id: "ski", name: "Лижі", icon: Snowflake   },
    { id: "snowboard", name: "Сноуборди", icon: Snowflake    },
    { id: "boots", name: "Черевики", icon: Snowflake    },
    { id: "helmet", name: "Шоломи", icon: Snowflake    },
    { id: "suit", name: "Костюми", icon: Snowflake   },
  ];

  // --- Допоміжні функції ---
  
  // Обчислює кількість днів оренди
  const calculateRentalDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  // Фільтрує обладнання по категорії
  const filteredEquipment =
    selectedCategory === "all"
      ? equipmentList
      : equipmentList.filter((item) => item.type === selectedCategory);

  // Обрахунок загальної ціни
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.pricePerDay * item.quantity * item.rentalDays, 0);

  // Загальна кількість предметів у кошику
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  // --- Функції для роботи з кошиком ---
  
  // Додаємо або збільшуємо кількість предмета
  const addToCart = (item: Equipmentt, selectedSize?: string) => {
    const rentalDays = calculateRentalDays(startDate, endDate);

    setCart((prevCart) => {
      const existing = prevCart.find(
        (ci) => ci.id === item.id && ci.selectedSize === selectedSize
      );

      if (existing) {
        // Якщо предмет вже в кошику — збільшуємо кількість
        return prevCart.map((ci) =>
          ci.id === item.id && ci.selectedSize === selectedSize
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      } else {
        // Якщо новий предмет — додаємо до кошика
        return [...prevCart, { ...item, quantity: 1, selectedSize, rentalDays }];
      }
    });
  };

  // Оновлюємо кількість предмета
  const updateQuantity = (itemId: string, size: string | undefined, newQuantity: number) => {
    setCart((prevCart) =>
      newQuantity <= 0
        ? prevCart.filter((ci) => !(ci.id === itemId && ci.selectedSize === size))
        : prevCart.map((ci) =>
            ci.id === itemId && ci.selectedSize === size ? { ...ci, quantity: newQuantity } : ci
          )
    );
  };

  // Видаляємо предмет з кошика
  const removeFromCart = (itemId: string, size?: string) => {
    setCart((prevCart) => prevCart.filter((ci) => !(ci.id === itemId && ci.selectedSize === size)));
  };

  // --- Функція підтвердження оренди ---
  const handleRentalConfirmation = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    setConfirmationModalOpen(true);
  };

  // --- Функція пошуку доступного обладнання ---
  const fetchAvailableEquipment = useCallback(async () => {
    if (!startDate || !endDate || startDate === endDate) {
      alert("Будь ласка, виберіть коректні дати оренди");
      return;
    }

    try {
      const response = await http_api.get("api/Equipment/getAllEquipmentAvailable", {
        params: { from: format(startDate, "yyyy-MM-dd"), to: format(endDate, "yyyy-MM-dd") },
      });

      if (response.status === 200) {
        setEquipmentList(response.data);
        console.log(response.data);
      } else {
        throw new Error("Не вдалося отримати обладнання");
      }
    } catch (error) {
      console.error(error);
      alert("Не вдалося отримати доступне обладнання. Спробуйте пізніше.");
    }
  }, [startDate, endDate]);

  // --- Ефекти ---
  useEffect(() => {
    fetchAvailableEquipment(); // Виконуємо пошук при зміні дат
    setCart([]); // Скидаємо кошик при зміні дат
  }, [fetchAvailableEquipment]);

  // --- JSX ---
  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />

      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Заголовок сторінки */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">
              Оренда <span className="text-yellow-400">обладнання</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Орендуйте найкраще лижне обладнання від провідних брендів
            </p>
          </div>

          {/* Підказка увійти, якщо кошик не порожній */}
          {!isLoggedIn && cart.length > 0 && <LoginPromptCard onLoginClick={() => setAuthModalOpen(true)} />}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {/* Ліва колонка: період оренди + категорії */}
            <div className="lg:col-span-2 md:col-span-2 xl:col-span-1 space-y-6">
              <RentalPeriodCard
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
              <RentalCategoryCard
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Права колонка: обладнання або кошик */}
            <div className="lg:col-span-2 md:col-span-2 xl:col-span-3">
              <Tabs value={showCart ? "cart" : "equipment"} onValueChange={(v) => setShowCart(v === "cart")}>
                <TabsList className="flex flex-wrap justify-around bg-gray-200 rounded-lg px-1 py-0">
                  <TabsTrigger value="equipment" className="w-1/2 rounded-2 data-[state=active]:bg-yellow-400 hover:bg-gray-100">
                    Обладнання
                  </TabsTrigger>
                  <TabsTrigger value="cart" className="w-1/2 rounded-2 data-[state=active]:bg-yellow-400 hover:bg-gray-100">
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
                        rentalDays={calculateRentalDays(startDate, endDate)}
                        startDate={startDate}
                        endDate={endDate}
                        cart={cart}
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

      {/* Модалки */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
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
