
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/Popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/Calendar";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import type { ISkiPassPurchaseCardProps } from "./types";



export const SkiPassPurchaseCard: React.FC<ISkiPassPurchaseCardProps> = ({
  selectedPass,
  startDate,
  setStartDate,
  popoverOpen,
  setPopoverOpen,
  handlePurchase,
}) => {
  return (
    <Card className="max-w-2xl mx-auto w-full px-2 sm:px-4">
      <CardHeader>
        <CardTitle className="font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">
          Оформлення абонемента
        </CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg lg:text-base">
          Вкажіть деталі для придбання: {selectedPass?.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 w-full">
        {/* Date Picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-2 w-full">
            <label className="text-sm sm:text-base md:text-base font-medium">
              Дата початку дії
            </label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full !flex rounded-2 justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="!font-medium mr-1 !h-5 !w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-base md:text-base">
                    {startDate
                      ? format(startDate, "dd MMMM yyyy", { locale: uk })
                      : "Оберіть дату"}
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelectDate={(date) => {
                    setStartDate(date);
                    setPopoverOpen(false);
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted rounded-lg space-y-2 w-full">
          <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
            <span>Абонемент:</span>
            <span>{selectedPass?.name}</span>
          </div>
          {startDate && (
            <div className="flex justify-between text-sm sm:text-base md:text-lg lg:text-lg">
              <span>Дата початку:</span>
              <span className="text-right">
                {format(startDate, "dd MMMM yyyy", { locale: uk })}
              </span>
            </div>
          )}
          <div className="border-t pt-2">
            <div className="flex justify-between text-base sm:text-base md:text-lg lg:text-xl font-bold">
              <span>Загальна сума:</span>
              <span>₴{selectedPass?.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <div className="flex justify-center w-full">
          <Button
            onClick={handlePurchase}
            className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-2 text-sm sm:text-base md:!text-sm lg:!text-xl"
            disabled={!startDate}
          >
            Придбати абонемент
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
