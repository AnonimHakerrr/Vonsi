// src/components/BookingSteps.tsx
import React from "react";
import { Check } from "lucide-react";
import type { BookingStepsProps } from "./type";


export const BookingSteps: React.FC<BookingStepsProps> = ({ step }) => {
  return (
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
              step >= 1 ? "bg-yellow-400 text-black font-semibold" : "bg-muted"
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
              step >= 2 ? "bg-yellow-400 text-black font-semibold" : "bg-muted"
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
              step >= 3 ? "bg-yellow-400 text-black font-semibold" : "bg-muted"
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
  );
};
