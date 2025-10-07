
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/Popover";
import { Calendar } from "../../components/Calendar";
import type { RentalPeriodCardProps } from "./types";



export default function RentalPeriodCard({
  startDate,
  endDate,
  onChange,
}: RentalPeriodCardProps) {
  const calculateRentalDays = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Період оренди</CardTitle>
        <CardDescription>
          Оберіть дати оренди для розрахунку вартості
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Дата початку */}
        <div className="space-y-2">
          <Label className="font-semibold">Дата початку</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left font-normal bg-transparent !flex"
              >
                <CalendarIcon className="h-4 w-4" />
                {startDate
                  ? format(startDate, "dd MMM yyyy", { locale: uk })
                  : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelectDate={(date) => {
                  if (!date) return;

                  const selectedDate = new Date(date);
                  selectedDate.setHours(0, 0, 0, 0);

                  if (endDate) {
                    const end = new Date(endDate);
                    end.setHours(0, 0, 0, 0);
                    if (selectedDate >= end) {
                      const newStart = new Date(end.getTime() - 86400000);
                      onChange(newStart, end);
                      return;
                    }
                  }

                  onChange(selectedDate, endDate);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  return (
                    d < today ||
                    (endDate ? d >= new Date(endDate.setHours(0, 0, 0, 0)) : false)
                  );
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Дата закінчення */}
        <div className="space-y-2">
          <Label className="font-semibold">Дата закінчення</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left font-normal bg-transparent !flex"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate
                  ? format(endDate, "dd MMM yyyy", { locale: uk })
                  : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelectDate={(date) => {
                  if (!date) return;

                  const selectedDate = new Date(date);
                  selectedDate.setHours(0, 0, 0, 0);

                  if (startDate) {
                    const start = new Date(startDate);
                    start.setHours(0, 0, 0, 0);
                    if (selectedDate <= start) {
                      const newEnd = new Date(start.getTime() + 86400000);
                      onChange(start, newEnd);
                      return;
                    }
                  }

                  onChange(startDate, selectedDate);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  return (
                    d < today ||
                    (startDate
                      ? d <= new Date(startDate.setHours(0, 0, 0, 0))
                      : false)
                  );
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Кількість днів */}
        {startDate && endDate && (
          <div className="bg-yellow-50 p-3 rounded-lg flex items-center">
            <p className="text-sm font-medium">
              Кількість днів: {calculateRentalDays()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
