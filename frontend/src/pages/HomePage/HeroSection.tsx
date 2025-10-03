import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Snowflake } from "lucide-react";
import bgImage from "../../assets/font1.png";
export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Snowflake className="h-8 w-8 text-yellow-400" />
          <Badge className="bg-yellow-400/50 text-black text-lg px-4 py-2 font-semibold">
            Зимовий сезон 2025/26
          </Badge>
        </div>
        <h1 className="!text-[clamp(2rem,5vw,11rem)] !font-black !mb-7 !text-balance leading-tight">
          Ваш ідеальний <span className="text-yellow-400"> зимовий </span> відпочинок
        </h1>
        <p className="font-semibold text-[clamp(1rem,2.5vw,1.5rem)] mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
          Насолоджуйтесь найкращими лижними трасами, комфортним готелем та незабутніми враженнями в серці Карпат
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/booking" className="!no-underline">
            <Button
              size="lg"
              className="!flex !items-center !justify-center bg-yellow-400 text-black hover:bg-yellow-500 !text-lg md:!text-base sm:!text-sm px-8 py-4 md:px-6 md:py-3 sm:px-4 sm:py-2 !rounded-lg font-bold !no-underline"
            >
              Забронювати номер
            </Button>
          </a>
          <a href="/rental" className="!no-underline">
            <Button
              size="lg"
              variant="outline"
              className="!flex !items-center !justify-center border-white text-white !hover:bg-white !hover:text-black !text-lg md:!text-base sm:!text-sm !px-8 !py-4 md:!px-6 md:!py-3 sm:!px-4 sm:!py-2 !rounded-lg font-bold !no-underline"
            >
              Орендувати обладнання
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
