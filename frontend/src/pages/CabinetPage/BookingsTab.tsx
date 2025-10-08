
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Calendar, Users, Eye } from "lucide-react";
import type { IBookingsTabProps } from "./types";



export const BookingsTab: React.FC<IBookingsTabProps> = ({
  sortedBookingData,
  setBookingDetailsModal,
}) => {
  const months = [
    "січ", "лют", "бер", "квіт", "трав", "черв",
    "лип", "серп", "вер", "жовт", "лист", "груд",
  ];

  

  return (
    <div className="space-y-6">
      {/* Заголовок + кнопка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl !font-bold">Мої бронювання</h2>
        <a href="/booking" className="!no-underline">
          <Button className="w-full sm:w-auto !px-3 !py-3 !bg-yellow-400 !text-black !hover:bg-yellow-500 !flex !items-center !justify-center !rounded-lg !font-semibold">
            <Calendar className="!h-5 !w-5 mr-2" />
            Нове бронювання
          </Button>
        </a>
      </div>

      {/* Список бронювань */}
      <div className="space-y-4">
        {sortedBookingData.map((booking, index) => {
          const checkIn = new Date(booking.checkIn);
          const checkOut = new Date(booking.checkOut);
          const price =
            ((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) *
            booking.room.pricePerNight;

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
                      <Badge variant="outline">{booking.room.type}</Badge>
                      <Badge
                        className={
                          new Date(booking.checkOut) < new Date()
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {new Date(booking.checkOut) < new Date()
                          ? "Пройшло"
                          : "Підтверджено"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {booking.room.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {booking
                          ? `${checkIn.getDate()}-${checkOut.getDate()} ${
                              months[checkIn.getMonth()]
                            }`
                          : ""}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {booking.room.capacity}{" "}
                        {booking.room.capacity === 1 ? "гість" : "гості"}
                      </div>
                    </div>
                  </div>

                  {/* Права частина */}
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <div className="text-2xl font-bold mb-2">
                      ₴{price.toLocaleString("uk-UA")}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="!flex !items-center !justify-center !rounded-lg"
                      onClick={() => setBookingDetailsModal(booking)}
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
