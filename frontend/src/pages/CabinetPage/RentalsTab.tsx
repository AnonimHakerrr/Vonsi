
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Calendar, Eye, Snowflake } from "lucide-react";
import type { IRentalsTabProps } from "./types"; // визначений тип для оренди



export const RentalsTab: React.FC<IRentalsTabProps> = ({
  sortedRentals,
  setRentalDetailsModal,
}) => {
  const months = [
    "січ", "лют", "бер", "квіт", "трав", "черв",
    "лип", "серп", "вер", "жовт", "лист", "груд",
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок + кнопка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl !font-bold">Оренда обладнання</h2>
        <a href="/rental" className="!no-underline w-full sm:w-auto">
          <Button className="w-full sm:w-auto !px-3 !py-3 !bg-yellow-400 !text-black !hover:bg-yellow-500 !flex !items-center !justify-center !rounded-lg !font-semibold">
            <Snowflake className="!h-5 !w-5 mr-2" />
            Орендувати обладнання
          </Button>
        </a>
      </div>

      {/* Список оренд */}
      <div className="space-y-4">
        {sortedRentals.map((rental, index) => {
          const checkInDate = new Date(rental.checkIn);
          const checkOutDate = new Date(rental.checkOut);
          checkInDate.setHours(0, 0, 0, 0);
          checkOutDate.setHours(0, 0, 0, 0);

          const diffTime = checkOutDate.getTime() - checkInDate.getTime();
          const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const total = rental.pricePerDay * nights;

          return (
            <Card key={index} className="hover:scale-[1.05] transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Ліва частина */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge
                        className={
                          checkOutDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {checkOutDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
                          ? "Активна оренда"
                          : "Минула оренда"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {{
                        ski: "Лижі",
                        snowboard: "Сноуборд",
                        boots: "Черевики",
                        helmet: "Шолом",
                        suit: "Костюм",
                      }[rental.type] || rental.type}{" "}
                      {rental.brand}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      {`${checkInDate.getDate()}-${checkOutDate.getDate()} ${
                        months[checkInDate.getMonth()]
                      }`}
                    </div>
                  </div>

                  {/* Права частина */}
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <div className="text-2xl font-bold mb-2">
                      ₴{total.toLocaleString("uk-UA")}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!flex !items-center !justify-center !rounded-lg"
                      onClick={() => setRentalDetailsModal(rental)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Деталі
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
