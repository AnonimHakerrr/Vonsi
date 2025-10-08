import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/Dialog"; // 🔹 змінити шлях під твій проєкт
import { Badge } from "../../components/Badge";
import { Package, CreditCard, MapPin, Clock, Phone } from "lucide-react";
import type { IRentalDetailsDialogProps } from "./types";



export const RentalDetailsDialog: React.FC<IRentalDetailsDialogProps> = ({
  rentalDetailsModal,
  setRentalDetailsModal,
}) => {
  const rental = rentalDetailsModal;
  const today = new Date().setHours(0, 0, 0, 0);

  return (
    <Dialog open={!!rental} onOpenChange={() => setRentalDetailsModal(null)}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="!font-semibold">Деталі оренди</DialogTitle>
          <DialogDescription>
            Повна інформація про оренду обладнання
          </DialogDescription>
        </DialogHeader>

        {rental ? (
          <div className="space-y-6">
            {/* Назва і статус */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl !font-bold">
                {{
                  ski: "Лижі",
                  snowboard: "Сноуборд",
                  boots: "Черевики",
                  helmet: "Шолом",
                  suit: "Костюм",
                }[rental.type] || rental.type}{" "}
                {rental.brand}
              </h3>

              <Badge
                className={
                  new Date(rental.checkOut).setHours(0, 0, 0, 0) >= today
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {new Date(rental.checkOut).setHours(0, 0, 0, 0) >= today
                  ? "Активна оренда"
                  : "Майбутня оренда"}
              </Badge>
            </div>

            {/* Основна сітка */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ліва колонка */}
              <div className="space-y-4">
                {/* Обладнання */}
                <Section
                  icon={<Package className="h-5 w-5 text-yellow-400" />}
                  title="Обладнання"
                >
                  <InfoRow
                    label="Назва:"
                    value={`${{
                      ski: "Лижі",
                      snowboard: "Сноуборд",
                      boots: "Черевики",
                      helmet: "Шолом",
                      suit: "Костюм",
                    }[rental.type] || rental.type} ${rental.brand}`}
                  />
                  <InfoRow label="Розмір:" value={rental.size} />
                  <InfoRow label="Стан:" value="Відмінний" />
                </Section>

                {/* Вартість */}
                <Section
                  icon={<CreditCard className="h-5 w-5 text-yellow-400" />}
                  title="Вартість"
                >
                  <InfoRow
                    label="Оренда:"
                    value={`₴${calculateTotal(rental.checkIn, rental.checkOut, rental.pricePerDay)}`}
                    bold
                  />
                  <InfoRow
                    label="Застава:"
                    value="₴2,000 (повернеться після здачі)"
                  />
                </Section>
              </div>

              {/* Права колонка */}
              <div className="space-y-4">
                {/* Видача/Повернення */}
                <Section
                  icon={<MapPin className="h-5 w-5 text-yellow-400" />}
                  title="Видача/Повернення"
                >
                  <InfoRow
                    label="Видача:"
                    value="Пункт оренди (1-й поверх готелю)"
                  />
                  <InfoRow
                    label="Повернення:"
                    value="Пункт оренди (1-й поверх готелю)"
                  />
                </Section>

                {/* Дата видачі/повернення */}
                <Section
                  icon={<Clock className="h-5 w-5 text-yellow-400" />}
                  title="Дата видачі/повернення"
                >
                  <InfoRow
                    label="Видача:"
                    value={formatDate(rental.checkIn)}
                  />
                  <InfoRow
                    label="Повернення:"
                    value={formatDate(rental.checkOut)}
                  />
                </Section>

                {/* Контакти */}
                <Section
                  icon={<Phone className="h-5 w-5 text-yellow-400" />}
                  title="Контакти"
                >
                  <p className="text-sm">+380 (44) 123-45-68</p>
                </Section>
              </div>
            </div>
          </div>
        ) : (
          <p>Немає деталей для цієї оренди.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* 🔹 Допоміжні функції */

const calculateTotal = (checkIn: string, checkOut: string, price: number) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diff = end.getTime() - start.getTime();
  const days = Math.max(1, diff / (1000 * 60 * 60 * 24));
  const total = price * days;

  return new Intl.NumberFormat("uk-UA").format(total);
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/* 🔹 Допоміжні компоненти */

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h5 className="font-semibold mb-2 flex items-center gap-2">
      {icon} {title}
    </h5>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

const InfoRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string | number;
  bold?: boolean;
}) => (
  <div
    className={`flex justify-between ${bold ? "font-semibold" : ""}`}
  >
    <span className="text-muted-foreground">{label}</span>
    <span className="break-words">{value}</span>
  </div>
);
