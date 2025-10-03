// src/components/BookingHeader.tsx
import React from "react";

export const BookingHeader: React.FC = () => {
  return (
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
    </div>
  );
};
