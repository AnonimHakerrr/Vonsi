
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Mountain, Clock, Star, Check } from "lucide-react";
import { Button } from "../../components/Button";
import type { ISkiPassCardsProps } from "./types"; // або там, де у тебе описан тип



export const SkiPassCards: React.FC<ISkiPassCardsProps> = ({
  passes,
  selectedPass,
  onSelectPass,
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {passes.map((pass, index) => (
        <Card
          key={pass.id}
          className={`relative border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] transition-transform transition-color duration-300 ${
            selectedPass?.id === pass.id
              ? "!border-yellow-400 shadow-lg scale-[1.02]"
              : "border-border hover:border-yellow-200"
          } ${pass.popular ? "ring-2 ring-yellow-400" : ""}`}
          onClick={() => onSelectPass(pass)}
        >
          {pass.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-yellow-400 font-semibold text-black px-3 py-1">
                <Star className="!h-4 !w-4 mr-1" />
                Популярний
              </Badge>
            </div>
          )}

          <CardHeader className="text-center pb-4">
            <div
              className={`w-18 h-18 ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                  ? "bg-yellow-500"
                  : index === 2
                  ? "bg-green-500"
                  : index === 3
                  ? "bg-purple-500"
                  : "bg-gray-400"
              } rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <Mountain className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-xl font-bold">
              {pass.name}{" "}
              <span className="text-yellow-400 lg:!text-md">абонемент</span>
            </CardTitle>
            <CardDescription className="text-sm">{pass.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="h-4 w-4" />
              {pass.durationDays}{" "}
              {pass.durationDays === 1
                ? "день"
                : pass.durationDays >= 2 && pass.durationDays <= 4
                ? "дні"
                : "днів"}
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold">₴{pass.price.toLocaleString()}</div>
            </div>

            <div className="space-y-2">
              {pass.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 !text-black bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full rounded-2 font-bold ${
                selectedPass?.id === pass.id
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-transparent font-medium border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              {selectedPass?.id === pass.id ? "Обрано" : "Обрати"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
