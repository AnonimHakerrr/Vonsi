
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarMenu } from "../../components/SidebarMenu";
import { AuthModal } from "../../components/AuthModal";
import type { ISubscription, IPass } from "./types";
import http_api from "../../services/http_api";
import { getToken } from "../../services/tokenService";
import { SkiPassHeader } from "./SkiPassHeader";
import { SkiPassCards } from "./SkiPassCards";
import { SkiPassPurchaseCard } from "./SkiPassPurchaseCard";
import { InfoCards } from "./InfoCards";

export default function SkiPassesPage() {
  // --- Стан компонента ---
  const [selectedPass, setSelectedPass] = useState<IPass | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [purchaseSuccessOpen, setPurchaseSuccessOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
  const navigate = useNavigate();

  // --- ДОПОМОЖНІ ФУНКЦІЇ ---

  /** Обчислює дату закінчення абонемента на основі дати початку та кількості днів */
  const calculateEndDate = (start: Date, durationDays: number): Date => {
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays);
    return end;
  };

  /** Перевіряє, чи користувач авторизований */
  const isUserAuthenticated = (): boolean => {
    return Boolean(getToken());
  };

  // --- ОБРОБНИКИ ПОДІЙ ---

  /** Обробляє вибір абонемента */
  const handleSelectPass = (pass: IPass) => {
    if (!isUserAuthenticated()) {
      setAuthModalOpen(true);
      return;
    }
    setSelectedPass(pass);
  };

  /** Обробляє покупку абонемента */
  const handlePurchase = async () => {
    if (!startDate || !selectedPass) {
      alert("Будь ласка, оберіть дату та абонемент.");
      return;
    }

    const endDate = calculateEndDate(startDate, selectedPass.durationDays);
    const payload = {
      subscriptionId: selectedPass.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const response = await http_api.post(
        "api/Subscribers/addSubscription",
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPurchaseSuccessOpen(true);
      } else {
        throw new Error("Не вдалося створити бронювання абонемента.");
      }
    } catch (error) {
      console.error(error);
      alert("Не вдалося створити бронювання. Спробуйте пізніше.");
    }
  };

  // --- API ЗАПИТИ ---

  /** Отримує всі доступні абонементи з API */
  const fetchSubscriptions = async () => {
    try {
      const response = await http_api.get<ISubscription[]>(
        "api/Subscription/allSubscription"
      );
      setSubscription(response.data);
      console.log("Отримані абонементи:", response.data);
    } catch (err) {
      console.error("Помилка при отриманні абонементів:", err);
    }
  };

  // --- ХУКИ ---

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // --- JSX ---

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />

      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* --- Хедер --- */}
          <SkiPassHeader
            seasonLabel="Зимовий сезон 2025/26"
            title="Абонементи на катання"
            description="Оберіть найкращий абонемент для вашого зимового відпочинку на лижних трасах VONSI RESORT"
          />

          {/* --- Карточки абонементів --- */}
          <SkiPassCards
            passes={subscription}
            selectedPass={selectedPass}
            onSelectPass={handleSelectPass}
          />

          {/* --- Форма покупки (показується тільки якщо обрано абонемент) --- */}
          {selectedPass && (
            <SkiPassPurchaseCard
              selectedPass={selectedPass}
              startDate={startDate}
              setStartDate={setStartDate}
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              handlePurchase={handlePurchase}
            />
          )}

          {/* --- Інформаційні картки --- */}
          <InfoCards />
        </div>
      </div>

      {/* --- Модалка авторизації --- */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />

      {/* --- Модалка успішної покупки --- */}
      {purchaseSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
            {/* Іконка підтвердження */}
            <div className="flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-yellow-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Текст підтвердження */}
            <h2 className="text-lg font-bold mb-2">
              Абонемент успішно придбаний!
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Деталі покупки можна переглянути у вашому кабінеті.
            </p>

            {/* Кнопка OK */}
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-2 transition-colors"
              onClick={() => {
                setPurchaseSuccessOpen(false);
                navigate("/dashboard");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
