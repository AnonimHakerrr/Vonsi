import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Badge } from "../components/Badge";
import { SidebarMenu } from "../components/SidebarMenu";
import { Mountain, Snowflake, MapPin, Phone, Mail, Star } from "lucide-react";
import bgImage from "../assets/fon.jpg";
import resortImage from "../assets/resort.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden md:ml-64">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Snowflake className="h-8 w-8 text-yellow-400" />
              <Badge className="bg-yellow-400 text-black text-lg px-4 py-2 font-semibold">
                Зимовий сезон 2025/26
              </Badge>
            </div>
            <h1 className="!text-[clamp(2rem,5vw,11rem)] !font-black !mb-7 !text-balance leading-tight">
              Ваш ідеальний
              <span className="text-yellow-400"> зимовий </span>
              відпочинок
            </h1>
            <p className="font-semibold text-[clamp(1rem,2.5vw,1.5rem)] md:text-[clamp(1rem,2.5vw,1.5rem)] mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Насолоджуйтесь найкращими лижними трасами, комфортним готелем та
              незабутніми враженнями в серці Карпат
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/booking" className="!no-underline">
                <Button
                  size="lg"
                  className="!flex !items-center !justify-center bg-yellow-400 text-black hover:bg-yellow-500 !text-lg px-8 py-4 !rounded-lg font-bold !no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Забронювати номер
                </Button>
              </a>
              <a href="/rental" className="!no-underline">
                <Button
                  size="lg"
                  variant="outline"
                  className="!flex !items-center !justify-center border-white text-white !hover:bg-white !hover:text-black !text-lg !px-8 !py-4 !rounded-lg font-bold !no-underline"
                >
                  Орендувати обладнання
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            <Card className="border-2 hover:border-yellow-400 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mountain className="h-10 w-10 text-black" />
                </div>
                <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">
                  15 лижних трас
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Від початкового до експертного рівня. Сучасні підйомники та
                  ідеально підготовлені траси
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-400 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Snowflake className="h-10 w-10 text-black" />
                </div>
                <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">
                  Комфортний готель
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Затишні номери з панорамним видом на гори, ресторан та
                  SPA-центр
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-400 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-10 w-10 text-black" />
                </div>
                <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">
                  Прокат обладнання
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Найновіше лижне обладнання від провідних брендів. Професійна
                  підгонка та консультації
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-black text-white py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 border-4 border-yellow-400 rounded-full inline-block px-4 py-2">
                15
              </div>
              <div className="text-lg">Лижних трас</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 border-4 border-yellow-400 rounded-full inline-block px-4 py-2">
                120
              </div>
              <div className="text-lg">Номерів готелю</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 border-4 border-yellow-400 rounded-full inline-block px-4 py-2">
                5
              </div>
              <div className="text-lg">Зірок сервісу</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 border-4 border-yellow-400 rounded-full inline-block px-4 py-2">
                24/7
              </div>
              <div className="text-lg">Підтримка гостей</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl !font-black mb-6 text-balance">
                Готові до <span className="text-yellow-400">пригод</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Зв'яжіться з нами для бронювання або отримання додаткової
                інформації
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span>Карпати, Україна</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>+380 (67) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>info@alpineresort.ua</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src={resortImage}
                alt="Затишний інтер'єр готелю"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mountain className="h-8 w-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">VONSI RESORT</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              © 2024 VONSI RESORT. Всі права захищені.
            </p>
            <div className="flex justify-center gap-8">
              <a
                href="/privacy"
                className="hover:text-yellow-400 transition-colors"
              >
                Політика конфіденційності
              </a>
              <a
                href="/terms"
                className="hover:text-yellow-400 transition-colors"
              >
                Умови використання
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
