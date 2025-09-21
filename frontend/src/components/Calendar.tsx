import React, { useState } from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";

// Стилі кнопок днів
const buttonVariants = cva(
  "rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 p-2 text-center",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-black hover:bg-yellow-300",
        ghost: "hover:bg-yellow-100 hover:text-black",
        outline: "border bg-white text-black hover:bg-yellow-50 hover:text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Українські скорочення днів тижня
const ukShortWeekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export const Calendar: React.FC<DayPickerProps> = ({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}) => {
  const [month, setMonth] = useState(new Date());

  // Тепер просто Date
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
  };

  const handlePrev = () =>
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const handleNext = () =>
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  return (
    <div className="p-4 bg-black rounded-lg inline-block relative">
      <h3 className="text-white text-center text-base font-semibold mb-2">
        Виберіть дату
      </h3>

      <div className="flex justify-center text-sm mb-3 text-yellow-400">
        {month.toLocaleString("uk", { month: "long", year: "numeric" })}
      </div>

      <DayPicker
        {...props}
        mode="single"
        selected={selected} // <-- тут тепер Date | undefined
        onSelect={handleSelect}
        showOutsideDays={showOutsideDays}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={1}
        weekStartsOn={1}
        formatters={{
          formatWeekdayName: day =>
            ukShortWeekdays[day.getDay() === 0 ? 6 : day.getDay() - 1],
        }}
        className={cn("bg-black rounded-lg text-white", className)}
        classNames={{
          months: "px-3 py-2",
          table: "",
          head_cell: "",
          row: "",
          cell: "",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 text-sm font-normal"
          ),
          day_selected: "bg-yellow-400 text-black",
          day_outside: "bg-white text-gray-600 opacity-50",
          day_disabled: "bg-black text-gray-800 opacity-50",
          ...classNames,
        }}
      />

      <button
        onClick={handlePrev}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 px-2 py-2 bg-yellow-400 font-bold text-black rounded hover:bg-yellow-300"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 py-2 bg-yellow-400 font-bold text-black rounded hover:bg-yellow-300"
      >
        ›
      </button>
    </div>
  );
};

Calendar.displayName = "Calendar";
