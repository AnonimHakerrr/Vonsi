import { Card, CardContent } from "../../components/Card";
import { Mountain, Snowflake, Star } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <Card className="border-2 hover:border-yellow-400 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mountain className="h-10 w-10 text-black" />
            </div>
            <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">15 лижних трас</h3>
            <p className="text-muted-foreground leading-relaxed">
              Від початкового до експертного рівня. Сучасні підйомники та ідеально підготовлені траси
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-yellow-400 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Snowflake className="h-10 w-10 text-black" />
            </div>
            <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">Комфортний готель</h3>
            <p className="text-muted-foreground leading-relaxed">
              Затишні номери з панорамним видом на гори, ресторан та SPA-центр
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-yellow-400 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-black" />
            </div>
            <h3 className="font-black mb-4 text-[clamp(1rem,4vw,2.5rem)]">Прокат обладнання</h3>
            <p className="text-muted-foreground leading-relaxed">
              Найновіше лижне обладнання від провідних брендів. Професійна підгонка та консультації
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
