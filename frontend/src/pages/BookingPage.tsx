// src/pages/BookingPage.tsx
import { useState } from "react";
import { CalendarIcon, Users, Check, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Badge } from "../components/Badge";
import { Calendar } from "../components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import { Textarea } from "../components/TextArea";
import { SidebarMenu } from "../components/SidebarMenu";
import { AuthModal } from "../components/AuthModal";

import { roomTypes } from "../Data/mockData";

export default function BookingPage() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [step, setStep] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(roomTypes);
  const [isLoggedIn] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const isSearchFormValid = () => {
    return checkIn && checkOut && guests && checkIn < checkOut;
  };

  const handleSearch = () => {
    if (!isSearchFormValid()) return;
    const guestCount = Number.parseInt(guests);
    const filtered = roomTypes.filter(
      (room) => room.maxGuests >= guestCount && room.available
    );
    setAvailableRooms(filtered);
    setSearchPerformed(true);
    setSelectedRoom("");
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = roomTypes.find((r) => r.id === selectedRoom);
    if (room && checkIn && checkOut) {
      return room.price * calculateNights();
    }
    return 0;
  };

  const handleProceedToBooking = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    setStep(2);
  };

  const handleBooking = () => {
    console.log("Booking submitted:", {
      room: selectedRoom,
      checkIn,
      checkOut,
      guests,
      ...bookingData,
      total: calculateTotal(),
    });
    alert("Бронювання успішно створено!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />
      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Заголовок */}
          <div className="mb-8 px-4 sm:px-6 lg:px-0">
            <h1 className="!font-bold mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
              Бронювання <span className="text-yellow-400">номера</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty">
              Оберіть ідеальний номер для вашого зимового відпочинку
            </p>
          </div>

          {/* Кроки */}
          <div className="mb-8 px-6 sm:px-10 lg:px-20">
            <div className="flex flex-wrap items-center sm:items-center justify-start sm:justify-center gap-6 sm:gap-8">
              {/* Крок 1 */}
              <div
                className={`flex items-center gap-2 sm:gap-3 ${
                  step >= 1 ? "text-yellow-600" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-yellow-400 text-black font-semibold"
                      : "bg-muted"
                  }`}
                >
                  {step > 1 ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 !font-bold" />
                  ) : (
                    "1"
                  )}
                </div>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    step >= 1 ? "!font-semibold" : "font-medium"
                  }`}
                >
                  Вибір номера
                </span>
              </div>

              {/* Крок 2 */}
              <div
                className={`flex items-center gap-2 sm:gap-3 ${
                  step >= 2 ? "text-yellow-600" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-yellow-400 text-black font-semibold"
                      : "bg-muted"
                  }`}
                >
                  {step > 2 ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 !font-bold" />
                  ) : (
                    "2"
                  )}
                </div>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    step >= 2 ? "!font-semibold" : "font-medium"
                  }`}
                >
                  Деталі бронювання
                </span>
              </div>

              {/* Крок 3 */}
              <div
                className={`flex items-center gap-2 sm:gap-3 ${
                  step >= 3 ? "text-yellow-600" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    step >= 3
                      ? "bg-yellow-400 text-black font-semibold"
                      : "bg-muted"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    step >= 3 ? "!font-semibold" : "font-medium"
                  }`}
                >
                  Підтвердження
                </span>
              </div>
            </div>
          </div>

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
                      className={`border-2 ${
                        selectedRoom === room.id
                          ? "border-yellow-400"
                          : "border-border"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Картинка */}
                          <div className="md:col-span-1">
                            <img
                              src={room.image || "/placeholder.svg"}
                              alt={room.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>

                          {/* Інформація про номер */}
                          <div className="md:col-span-2">
                            <h3 className="text-xl font-bold mb-2">
                              {room.name}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {room.description}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                До {room.maxGuests} гостей
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
                                ₴{room.price.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                за ніч
                              </div>
                              {checkIn && checkOut && (
                                <div className="text-lg font-semibold text-yellow-600 mt-2">
                                  Всього: ₴
                                  {(
                                    room.price * calculateNights()
                                  ).toLocaleString()}
                                </div>
                              )}
                            </div>

                            <Button
                              className={`w-1/2 md:w-full rounded-2 font-semibold ${
                                selectedRoom === room.id
                                  ? "bg-yellow-400 text-black"
                                  : "bg-transparent border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                              }`}
                              variant={
                                selectedRoom === room.id ? "default" : "outline"
                              }
                              onClick={() => setSelectedRoom(room.id)}
                            >
                              {selectedRoom === room.id
                                ? "Обрано"
                                : "Обрати номер"}
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
                        className="bg-yellow-400 text-black hover:bg-yellow-500 !w-1/2 rounded-2 font-semibold"
                      >
                        Продовжити бронювання
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* === КРОК 2 === */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Деталі бронювання</CardTitle>
                <CardDescription>
                  Заповніть контактну інформацію
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="Введіть ім'я"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Введіть прізвище"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+380 (67) 123-45-67"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Особливі побажання</Label>
                  <Textarea
                    id="requests"
                    value={bookingData.specialRequests}
                    onChange={(e) =>
                      handleInputChange("specialRequests", e.target.value)
                    }
                    placeholder="Вкажіть будь-які особливі побажання або потреби..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="bg-transparent"
                  >
                    Назад
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Переглянути бронювання
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* === КРОК 3 === */}
          {step === 3 && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Підтвердження бронювання</CardTitle>
                    <CardDescription>
                      Перевірте деталі вашого бронювання
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Обраний номер</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        {roomTypes.find((r) => r.id === selectedRoom)?.name}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Дата заїзду</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          {checkIn
                            ? format(checkIn, "dd MMMM yyyy", { locale: uk })
                            : "Не обрано"}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Дата виїзду</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          {checkOut
                            ? format(checkOut, "dd MMMM yyyy", { locale: uk })
                            : "Не обрано"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Гості</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        {guests} гостей
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Контактні дані</h3>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div>
                          {bookingData.firstName} {bookingData.lastName}
                        </div>
                        <div>{bookingData.email}</div>
                        <div>{bookingData.phone}</div>
                        {bookingData.specialRequests && (
                          <div className="pt-2 border-t">
                            {bookingData.specialRequests}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold mb-2">Всього до сплати</h3>
                        <div className="text-2xl font-bold text-yellow-600">
                          ₴{calculateTotal().toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calculateNights()} ночей × ₴
                          {roomTypes
                            .find((r) => r.id === selectedRoom)
                            ?.price.toLocaleString()}
                        </div>
                      </div>
                      <Button
                        onClick={handleBooking}
                        className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg"
                      >
                        Підтвердити бронювання
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Важлива інформація</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Безкоштовне скасування бронювання можливе не пізніше ніж
                        за 7 днів до заїзду
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Заїзд можливий після 14:00, виїзд до 12:00
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        При заселенні необхідно пред'явити паспорт або ID-картку
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальне вікно авторизації */}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
