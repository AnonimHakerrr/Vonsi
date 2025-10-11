
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/Popover"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Badge } from "../../components/Badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/Select";

import { Calendar } from "../../components/Calendar"; 
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import type { SearchStepProps } from "./type"; 

export default function SearchStep({
  step,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  handleSearch,
  isSearchFormValid,
  searchPerformed,
  availableRooms,
  selectedRoom,
  setSelectedRoom,
  calculateNights,
  handleProceedToBooking,
}: SearchStepProps) {
  if (step !== 1) return null;

  return (
    <div className="space-y-8">
      {/* === КРОК 1 === */}
      {step === 1 && (
        <div className="space-y-8">
          {/* Пошук */}
          <Card>
            <CardHeader>
              <CardTitle className="!font-bold">Параметри пошуку</CardTitle>
              <CardDescription>
                Вкажіть дати та кількість гостей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Дата заїзду */}
                <div className="space-y-2">
                  <Label className="font-semibold !text-sm sm:text-base">
                    Дата заїзду
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full !flex justify-center items-center font-normal bg-transparent rounded-2 !text-sm sm:text-base"
                      >
                        <CalendarIcon className="!h-4 !w-4" />
                        {checkIn
                          ? format(checkIn, "dd MMMM yyyy", { locale: uk })
                          : "Оберіть дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelectDate={(date: Date | undefined) =>
                          setCheckIn(date)
                        }
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // обнуляємо час
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Дата виїзду */}
                <div className="space-y-2">
                  <Label className="font-semibold !text-sm sm:text-base">
                    Дата виїзду
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full !flex justify-center items-center font-normal bg-transparent rounded-2 !text-sm sm:text-base"
                      >
                        <CalendarIcon className="!h-4 !w-4" />
                        {checkOut
                          ? format(checkOut, "dd MMMM yyyy", { locale: uk })
                          : "Оберіть дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelectDate={(date: Date | undefined) =>
                          setCheckOut(date)
                        }
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // обнуляємо час
                          return checkIn ? date < checkIn : date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Кількість гостей */}
                <div className="space-y-2">
                  <Label className="font-semibold !text-sm sm:text-base">
                    Кількість гостей
                  </Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="flex  items-center rounded-2 w-full !text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white !text-sm sm:text-base">
                      <SelectItem value="1">1 гість</SelectItem>
                      <SelectItem value="2">2 гості</SelectItem>
                      <SelectItem value="3">3 гості</SelectItem>
                      <SelectItem value="4">4 гості</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Кнопка пошуку */}
                <div className="flex items-end w-full">
                  <Button
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2 !text-sm sm:text-base"
                    onClick={handleSearch}
                    disabled={!isSearchFormValid()}
                  >
                    Знайти номери
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Список номерів */}
          {searchPerformed && (
            <div className="space-y-6">
              <h2 className="text-2xl !font-semibold">
                {availableRooms.length > 0
                  ? "Доступні номери"
                  : "Номери не знайдено"}
              </h2>

              {availableRooms.map((room) => (
                <Card
                  key={room.id}
                  className={`border-2 hover:scale-[1.02] duration-300
${
                    selectedRoom === room.id
                      ? "border-yellow-400 scale-[1.02]"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Картинка */}
                      <div className="md:col-span-1">
                        <img
                          src={room.images[0] || room.images[1]}
                          alt={room.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Інформація про номер */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {room.description}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            До {room.capacity} гостей
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="outline"
                              className="text-xs"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Ціна та кнопка */}
                      <div className="md:col-span-1 text-right flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="text-3xl font-bold">
                            ₴{room.pricePerNight?.toLocaleString() ?? "Н/Д"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            за ніч
                          </div>
                          {checkIn && checkOut && (
                            <div className="text-lg font-semibold text-yellow-600 mt-2">
                              Всього: ₴
                              {room.pricePerNight && calculateNights()
                                ? (
                                    room.pricePerNight * calculateNights()
                                  ).toLocaleString()
                                : "Н/Д"}
                            </div>
                          )}
                        </div>

                        <Button
                          className={`w-1/2 md:w-full rounded-2 font-semibold lg:!text-md !text-base ${
                            selectedRoom === room.id
                              ? "bg-yellow-400 text-black"
                              : "bg-transparent border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                          }`}
                          variant={
                            selectedRoom === room.id ? "default" : "outline"
                          }
                          onClick={() => {
                            setSelectedRoom(room.id);
                            localStorage.setItem("selectedRoom", room.id);
                          }}
                        >
                          {selectedRoom === room.id ? "Обрано" : "Обрати"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Кнопка продовження бронювання */}
              {selectedRoom && checkIn && checkOut && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleProceedToBooking}
                    className="bg-yellow-400 text-black hover:bg-yellow-500 
                        w-full sm:!w-1/2 rounded-2 font-semibold 
                        !text-xs md:!text-sm lg:!text-lg sm:!text-sm"
                  >
                    Продовжити бронювання
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
