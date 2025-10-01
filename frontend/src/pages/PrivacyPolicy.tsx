// PrivacyPolicy.tsx
import React from "react";
import { FileText, Shield, Lock, User } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-yellow-400 text-black py-8 px-6 md:px-12 shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-wide">
          Політика конфіденційності
        </h1>
        <p className="text-center mt-2 md:mt-4 text-sm md:text-base font-medium">
          Ваші дані під надійним захистом
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
            Ми поважаємо вашу конфіденційність і прагнемо захищати ваші особисті дані. 
            Ця політика пояснює, які дані ми збираємо та як їх використовуємо.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-black/80 text-white p-6 md:p-10 rounded-3xl shadow-lg space-y-4 border-2 border-yellow-400 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Збір даних</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Ми можемо збирати такі дані:
          </p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Ім’я та прізвище</li>
            <li>Email та контактний телефон</li>
            <li>Інформація про використання сайту</li>
            <li>IP-адреса та технічні дані пристрою</li>
          </ul>
        </section>

        {/* Use of Data */}
        <section className="bg-white text-black p-6 md:p-10 rounded-3xl shadow-lg space-y-4 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Використання даних</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">Ми використовуємо ваші дані для:</p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Обробки ваших замовлень</li>
            <li>Покращення користувацького досвіду</li>
            <li>Надсилання повідомлень та новин</li>
            <li>Виконання юридичних вимог</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="bg-black/80 text-white p-6 md:p-10 rounded-3xl shadow-lg space-y-4 border-2 border-yellow-400 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Захист даних</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Ми використовуємо сучасні методи захисту даних, включаючи шифрування та обмежений доступ до ваших персональних даних.
          </p>
        </section>

        {/* Your Rights */}
        <section className="bg-white text-black p-6 md:p-10 rounded-3xl shadow-lg space-y-4 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Ваші права</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed">Ви маєте право:</p>
          <ul className="list-disc list-inside ml-5 space-y-1 text-sm md:text-base">
            <li>Доступу до своїх даних</li>
            <li>Виправлення або видалення даних</li>
            <li>Відмовитися від маркетингових розсилок</li>
            <li>Подати скаргу до контролюючого органу</li>
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
