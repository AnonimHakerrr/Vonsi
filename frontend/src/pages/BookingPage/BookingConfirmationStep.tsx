import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/Card";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Button } from "../../components/Button";
import type { BookingConfirmationStepProps } from "./type";

const BookingConfirmationStep: React.FC<BookingConfirmationStepProps> = ({
  step,
  availableRooms,
  selectedRoom,
  checkIn,
  checkOut,
  guests,
  user,
  bookingData,
  calculateTotal,
  handleBooking,
}) => {
  if (step !== 3) return null;

  const selectedRoomData = availableRooms.find((r) => r.id === selectedRoom);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-xl">
              Підтвердження бронювання
            </CardTitle>
            <CardDescription>
              Перевірте деталі вашого бронювання
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              <h4 className="!text-base md:!text-base lg:!text-lg xl:!text-xl font-medium">
                Обраний номер:
              </h4>
              <div className="bg-muted rounded-lg px-2 py-1">
                <h5 className="!text-base md:!text-base lg:!text-lg xl:!text-xl !font-bold">
                  {selectedRoomData?.title || "Не обрано"}
                </h5>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 mt-4">
              <div className="flex justify-between">
                <h4 className="!text-base md:!text-base lg:!text-lg xl:!text-xl">
                  Дата заїзду
                </h4>
                <div className="bg-muted rounded-lg font-bold !text-base md:!text-base lg:!text-lg xl:!text-xl">
                  {checkIn
                    ? format(checkIn, "dd MMMM yyyy", { locale: uk })
                    : "Не обрано"}
                </div>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold !text-base md:!text-base lg:!text-lg xl:!text-xl">
                  Дата виїзду
                </h4>
                <div className="bg-muted rounded-lg font-bold !text-base md:!text-base lg:!text-lg xl:!text-xl">
                  {checkOut
                    ? format(checkOut, "dd MMMM yyyy", { locale: uk })
                    : "Не обрано"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <h4 className="!text-base md:!text-base lg:!text-lg xl:!text-xl">
                Гості:
              </h4>
              <div className="bg-muted rounded-lg font-bold">
                <h5 className="!font-bold !text-base md:!text-base lg:!text-lg xl:!text-xl">
                  {guests} гостей
                </h5>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-start md:justify-between mt-4">
              <h4 className="font-semibold !text-base md:!text-base lg:!text-lg xl:!text-xl m-0">
                Контактні дані:
              </h4>
              <div className="bg-muted rounded-lg flex flex-col w-full md:w-3/4 justify-start md:justify-around font-bold !text-base md:!text-base lg:!text-lg xl:!text-xl text-left md:text-right">
                <div className="break-all">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="break-all">{user?.email}</div>
                <div className="break-all">{user?.phone}</div>
                {bookingData.specialRequests && (
                  <div className="pt-2 border-t break-all text-sm md:text-sm lg:text-base">
                    {bookingData.specialRequests}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between pb-10">
                <h4 className="font-semibold mb-2">Всього до сплати:</h4>
                <div className="!text-3xl font-bold text-yellow-600">
                  ₴{calculateTotal().toLocaleString()}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleBooking}
                  className="!flex items-center !w-1/2 justify-center bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg rounded-2 font-bold"
                >
                  Готово
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Важлива інформація</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="!h-6 !w-10 text-yellow-600" />
              <p className="text-sm text-muted-foreground">
                Безкоштовне скасування бронювання можливе не пізніше ніж за 7
                днів до заїзду
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="!h-6 !w-5 text-yellow-600 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Заїзд можливий після 14:00, виїзд до 12:00
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="!h-6 !w-7 text-yellow-600 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                При заселенні необхідно пред'явити паспорт або ID-картку
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmationStep;
