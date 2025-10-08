import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/Card";
import { Button } from "../../components/Button";
import { Calendar, Snowflake, CreditCard, QrCode } from "lucide-react";
import type { OverviewTabProps } from "./types";

/**
 * Компонент вкладки "Огляд" користувача
 * Показує активні бронювання, дні на схилах, витрачені гроші
 * та швидкі дії для навігації
 */
export const OverviewTab: React.FC<OverviewTabProps> = ({
  bookingData,
  subcription,
  totalMoneyInSeson,
  calculateSeasonDaysUnique,
}) => {
  // Фільтруємо активні бронювання на цей місяць
  const activeBookingsCount = bookingData.filter((b) => {
    const now = new Date();
    const checkIn = new Date(b.checkIn);
    const checkOut = new Date(b.checkOut);
    return (
      (checkIn.getMonth() === now.getMonth() && checkIn.getFullYear() === now.getFullYear()) ||
      (checkOut.getMonth() === now.getMonth() && checkOut.getFullYear() === now.getFullYear()) ||
      (checkIn < now && checkOut > now)
    );
  }).length;

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:scale-[1.05] transition-transform duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-400" />
              Активні бронювання
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{activeBookingsCount}</div>
            <p className="text-muted-foreground text-sm">На цей місяць</p>
          </CardContent>
        </Card>

        <Card className="hover:scale-[1.05] transition-transform duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-yellow-400" />
              Днів на схилах
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {calculateSeasonDaysUnique(subcription)}
            </div>
            <p className="text-muted-foreground text-sm">У цьому сезоні</p>
          </CardContent>
        </Card>

        <Card className="hover:scale-[1.05] transition-transform duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-yellow-400" />
              Витрачено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              ₴{totalMoneyInSeson.toLocaleString("uk-UA")}
            </div>
            <p className="text-muted-foreground text-sm">У цьому сезоні</p>
          </CardContent>
        </Card>
      </div>

      {/* Швидкі дії */}
      <Card>
        <CardHeader>
          <CardTitle>Швидкі дії</CardTitle>
          <CardDescription>Найпопулярніші функції для вашої зручності</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/booking" className="!no-underline">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-12 !flex !items-center !justify-center !font-semibold !text-lg !rounded-lg">
                <Calendar className="!h-5 !w-5 mr-2" />
                Забронювати номер
              </Button>
            </a>
            <a href="/rental" className="!no-underline">
              <Button
                variant="outline"
                className="w-full text-black !hover:bg-yellow-500 h-12 !flex !items-center !justify-center !font-semibold !text-lg !rounded-lg"
              >
                <Snowflake className="h-5 w-5 mr-2" />
                Орендувати обладнання
              </Button>
            </a>
            <a href="/ski-passes" className="!no-underline">
              <Button
                variant="outline"
                className="w-full text-black !hover:bg-yellow-500 h-12 !flex !items-center !justify-center !font-semibold !text-lg !rounded-lg"
              >
                <QrCode className="h-5 w-5 mr-2" />
                Купити абонемент
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
