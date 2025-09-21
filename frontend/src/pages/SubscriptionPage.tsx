import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { skiPassess } from "../Data/mockData";

import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
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
import { SidebarMenu } from "../components/SidebarMenu";
import { AuthModal } from "../components/AuthModal";
import {
  Mountain,
  CalendarIcon,
  Users,
  Clock,
  Check,
  Star,
  Snowflake,
} from "lucide-react";

export default function SkiPassesPage() {
  const [selectedPass, setSelectedPass] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [quantity, setQuantity] = useState("1");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePurchase = () => {
    const pass = skiPassess.find((p) => p.id === selectedPass);
    if (!pass) return;

    console.log("Ski pass purchase:", {
      pass: selectedPass,
      startDate,
      quantity,
      total: pass.price * Number.parseInt(quantity),
    });

    alert("Абонемент успішно придбано!");
  };

  const calculateTotal = () => {
    const pass = skiPassess.find((p) => p.id === selectedPass);
    return pass ? pass.price * Number.parseInt(quantity) : 0;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />

      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8 text-center px-4 sm:px-6 lg:px-8">
            {/* Badge і іконка */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
              <Snowflake className="!h-8 !w-8 !sm:h-8 !sm:w-8 text-yellow-400" />
              <Badge className="bg-yellow-400 text-black text-base sm:text-lg font-semibold px-3 sm:px-4 py-1 sm:py-2">
                Зимовий сезон 2025/26
              </Badge>
            </div>

            {/* Заголовок */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-snug sm:leading-tight !font-bold">
              Абонементи на <span className="text-yellow-400">катання</span>
            </h1>

            {/* Опис */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
              Оберіть найкращий абонемент для вашого зимового відпочинку на
              лижних трасах VONSI RESORT
            </p>
          </div>

          {/* Ski Pass Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {skiPassess.map((pass) => (
              <Card
                key={pass.id}
                className={`relative border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPass === pass.id
                    ? "!border-yellow-400 shadow-lg"
                    : "border-border hover:border-yellow-200"
                } ${pass.popular ? "ring-2 ring-yellow-400" : ""}`}
                onClick={() => setSelectedPass(pass.id)}
              >
                {pass.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-400 font-semibold text-black px-3 py-1">
                      <Star className="!h-4 !w-4 mr-1" />
                      Популярний
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-18 h-18 ${pass.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Mountain className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {pass.name} <span className="text-yellow-400">абонемент</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {pass.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      ₴{pass.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pass.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {pass.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 !text-black bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full rounded-2 font-bold ${
                      selectedPass === pass.id
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-transparent font-medium border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    {selectedPass === pass.id ? "Обрано" : "Обрати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Purchase Form */}
          {selectedPass && (
            <Card className="max-w-2xl mx-auto w-full px-2 sm:px-4">
              <CardHeader>
                <CardTitle className="font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">
                  Оформлення абонемента
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg lg:text-base">
                  Вкажіть деталі для придбання:{" "}
                  {skiPassess.find((p) => p.id === selectedPass)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {/* Date Picker */}
                  <div className="space-y-2 w-full">
                    <label className="text-sm sm:text-base md:text-base font-medium">
                      Дата початку дії
                    </label>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full !flex rounded-2  justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="!font-medium mr-1 !h-5 !w-5 sm:h-6 sm:w-6" />
                          <span className="text-sm sm:text-base md:text-base">
                            {startDate
                              ? format(startDate, "dd MMMM yyyy", {
                                  locale: uk,
                                })
                              : "Оберіть дату"}
                          </span>
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelectDate={(date: Date | undefined) => {
                            setStartDate(date);
                            setPopoverOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2 w-full">
                    <label className="text-sm sm:text-base md:text-base font-medium">
                      Кількість абонементів
                    </label>
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger className="rounded-2 !font-base bg-transparent w-full">
                        <SelectValue className="text-sm sm:text-base md:text-base" />
                      </SelectTrigger>
                      <SelectContent className="!rounded-2 bg-white">
                        <SelectItem
                          className="text-sm sm:text-base md:text-base"
                          value="1"
                        >
                          1 абонемент
                        </SelectItem>
                        <SelectItem
                          className="text-sm sm:text-base md:text-base"
                          value="2"
                        >
                          2 абонементи
                        </SelectItem>
                        <SelectItem
                          className="text-sm sm:text-base md:text-base"
                          value="3"
                        >
                          3 абонементи
                        </SelectItem>
                        <SelectItem
                          className="text-sm sm:text-base md:text-base"
                          value="4"
                        >
                          4 абонементи
                        </SelectItem>
                        <SelectItem
                          className="text-sm sm:text-base md:text-base"
                          value="5"
                        >
                          5 абонементів
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-muted p-4 rounded-lg space-y-2 w-full">
                  <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
                    <span>Абонемент:</span>
                    <span>
                      {skiPassess.find((p) => p.id === selectedPass)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
                    <span>Ціна за одиниць:</span>
                    <span>
                      ₴
                      {skiPassess
                        .find((p) => p.id === selectedPass)
                        ?.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
                    <span>Кількість:</span>
                    <span>{quantity}</span>
                  </div>
                  {startDate && (
                    <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
                      <span>Дата початку:</span>
                      <span>
                        {format(startDate, "dd MMMM yyyy", { locale: uk })}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-base sm:text-base md:text-lg lg:text-xl font-bold">
                      <span>Загальна сума:</span>
                      <span>₴{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="flex justify-center w-full">
                  <Button
                    onClick={handlePurchase}
                    className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-2 text-sm sm:!text-base md:text-lg lg:text-xl"
                    disabled={!startDate}>
                    Придбати абонемент
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mountain className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg !font-bold mb-2">
                  15 трас різної складності
                </h4>
                <p className="text-muted-foreground text-sm">
                  Від зелених трас для початківців до чорних для експертів
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg !font-bold mb-2">Режим роботи</h4>
                <p className="text-muted-foreground text-sm">
                  Щодня з 8:00 до 22:00
                  <br />
                  Нічне катання до 22:00
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg !font-bold mb-2">Групові знижки</h4>
                <p className="text-muted-foreground text-sm">
                  Знижка 15% при покупці від 5 абонементів
                  <br />
                  Знижка 25% від 10 абонементів
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
}
