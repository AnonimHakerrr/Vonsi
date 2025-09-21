import React, { useState } from "react";
import { DayPicker, type DayPickerProps, type DateRange } from "react-day-picker";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";

// Стилі кнопок днів
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
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

export const Calendar: React.FC<DayPickerProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  const [month, setMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  // Функції Prev/Next
  const handlePrev = () =>
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const handleNext = () =>
    setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  return (
    <div className="p-3 bg-black rounded-lg inline-block">
      {/* Кастомний заголовок */}
      <div className="flex justify-between items-center text-white mb-2">
        <button
          onClick={handlePrev}
          className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Prev
        </button>
        <span className="text-lg font-semibold">
          {month.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={handleNext}
          className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Next
        </button>
      </div>

      {/* DayPicker */}
      <DayPicker
        {...props}
        mode="range"
        selected={selectedRange}
        onSelect={setSelectedRange}
        showOutsideDays={showOutsideDays}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={2} // два місяці одночасно
        className={cn("bg-black p-4 rounded-lg", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "space-y-4",
          caption: "flex justify-between items-center p-1 text-white",
          caption_label: "text-lg font-semibold",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell: "text-yellow-400 w-9 font-medium text-center",
          row: "flex w-full mt-1",
          cell: "h-9 w-9 text-center p-0 relative",
          day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal"),
          day_selected: "bg-yellow-400 text-black",
          day_range_middle: "bg-yellow-200 text-black",
          day_outside: "bg-black text-gray-600 opacity-50",
          day_disabled: "bg-black text-gray-800 opacity-50",
          ...classNames,
        }}
      />
    </div>
  );
};

Calendar.displayName = "Calendar";
