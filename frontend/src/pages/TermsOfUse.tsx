// TermsOfUse.tsx
import React from "react";
import { FileText, Shield, Lock, User } from "lucide-react";

export const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-yellow-400 text-black py-8 px-6 md:px-12 shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-wide">
          Умови використання
        </h1>
        <p className="text-center mt-2 md:mt-4 text-sm md:text-base font-medium">
          Ознайомтеся з правилами користування нашим сервісом
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 py-12 max-w-6xl mx-auto space-y-12">
        {/* Introduction */}
        <section className="bg-white text-black p-6 md:p-10 rounded-3xl shadow-lg space-y-4 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Вступ</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Використовуючи наш сайт та сервіси, ви погоджуєтеся дотримуватися цих умов. 
            Будь ласка, уважно ознайомтеся з ними перед використанням.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="bg-black/80 text-white p-6 md:p-10 rounded-3xl shadow-lg space-y-4 border-2 border-yellow-400 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Обов’язки користувача</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Користувач повинен:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Надавати правдиву інформацію при реєстрації та оформленні замовлень</li>
            <li>Не порушувати права інших користувачів</li>
            <li>Не використовувати сайт для незаконних цілей</li>
            <li>Дотримуватися правил безпеки при використанні сервісу</li>
          </ul>
        </section>

        {/* Restrictions */}
        <section className="bg-white text-black p-6 md:p-10 rounded-3xl shadow-lg space-y-4 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Обмеження</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Забороняється:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Копіювати контент без дозволу</li>
            <li>Поширювати шкідливе програмне забезпечення</li>
            <li>Порушувати авторські права або права третіх осіб</li>
            <li>Використовувати сайт для шахрайства або спаму</li>
          </ul>
        </section>

        {/* Liability */}
        <section className="bg-black/80 text-white p-6 md:p-10 rounded-3xl shadow-lg space-y-4 border-2 border-yellow-400 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Відповідальність</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Ми не несемо відповідальності за:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Втрату даних користувача через технічні проблеми</li>
            <li>Наслідки неправомірного використання сайту</li>
            <li>Шкоду, спричинену сторонніми сервісами, на які ми не маємо впливу</li>
          </ul>
        </section>

        {/* Footer Note */}
        <section className="text-center text-sm md:text-base text-gray-400 space-y-1">
          <p>Останнє оновлення: 01.10.2025</p>
          <p>© 2025 VONSI RESORT. Усі права захищено.</p>
        </section>
      </main>
    </div>
  );
};
