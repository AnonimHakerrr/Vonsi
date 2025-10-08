import React from "react";
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Calendar, QrCode, Download } from "lucide-react";
import type { ISkiPassesTabProps } from "./types"; // Тип абонементу



export const SkiPassesTab: React.FC<ISkiPassesTabProps> = ({
  sortedSubscriptions,
  generatePDF,
}) => {
  const months = [
    "січ", "лют", "бер", "квіт", "трав", "черв",
    "лип", "серп", "вер", "жовт", "лист", "груд",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      {/* Заголовок + кнопка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl !font-bold">Мої абонементи</h2>
        <a href="/ski-passes" className="!no-underline w-full sm:w-auto">
          <Button className="w-full sm:w-auto !px-3 !py-3 !bg-yellow-400 !text-black !hover:bg-yellow-500 !flex !items-center !justify-center !rounded-lg !font-semibold">
            <QrCode className="!h-5 !w-5 mr-2" />
            Купити абонемент
          </Button>
        </a>
      </div>

      {/* Список абонементів */}
      <div className="space-y-4">
        {sortedSubscriptions.map((pass, index) => {
          const start = new Date(pass.startDate);
          const end = new Date(pass.endDate);
          const isActive = end.getTime() >= today.getTime();

          return (
            <Card
              key={index}
              className="hover:scale-[1.05] transition-transform duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Ліва частина */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline">
                        {pass.durationDays}{" "}
                        {pass.durationDays === 1
                          ? "день"
                          : pass.durationDays >= 2 && pass.durationDays <= 4
                          ? "дні"
                          : "днів"}
                      </Badge>
                      <Badge
                        className={
                          isActive
                            ? "bg-green-100 text-green-800 px-2 py-1 rounded"
                            : "bg-gray-100 text-gray-800 px-2 py-1 rounded"
                        }
                      >
                        {isActive ? "Активний" : "Використаний"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {pass.name} абонемент
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {`${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]}`}
                      </div>
                    </div>
                  </div>

                  {/* Права частина */}
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <div className="text-2xl font-bold mb-2">
                      ₴{pass.price.toLocaleString("uk-UA")}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!flex !items-center !justify-center !rounded-lg"
                      onClick={() => generatePDF(pass)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Завантажити
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
