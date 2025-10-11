import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/Card"; 
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/TextArea";
import type { BookingDetailsStepProps } from "./type";



const BookingDetailsStep: React.FC<BookingDetailsStepProps> = ({
  step,
  user,
  handleInputChange,
  setStep,
}) => {
  if (step !== 2) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Деталі бронювання</CardTitle>
        <CardDescription>Перегляньте контактну інформацію</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 w-full">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Ім'я</Label>
            <Input
              id="firstName"
              value={user?.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Введіть ім'я"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Прізвище</Label>
            <Input
              id="lastName"
              value={user?.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Введіть прізвище"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              value={user?.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+380 (67) 123-45-67"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requests">Особливі побажання</Label>
          <Textarea
            id="requests"
            onChange={(e) =>
              handleInputChange("specialRequests", e.target.value)
            }
            placeholder="Вкажіть будь-які особливі побажання або потреби..."
            rows={4}
          />
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => setStep(3)}
            className="bg-yellow-400 text-black hover:bg-yellow-500 !w-1/4 rounded-2 font-semibold"
          >
            Далі
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              localStorage.removeItem("selectedRoom");
            }}
            className="bg-transparent !w-1/4 rounded-2 font-semibold"
          >
            Назад
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetailsStep;
