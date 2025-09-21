
import { useState } from "react"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { skiPassess } from "../Data/mockData"

import { Button } from "../components/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card"
import { Badge } from "../components/Badge"
import { Calendar } from "../components/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select"
import { SidebarMenu } from "../components/SidebarMenu"
import { AuthModal } from "../components/AuthModal"
import { Mountain, CalendarIcon, Users, Clock, Check, Star, Snowflake } from "lucide-react"

export default function SkiPassesPage() {
  const [selectedPass, setSelectedPass] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [quantity, setQuantity] = useState("1")
  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handlePurchase = () => {
    /*if (!isLoggedIn) {
      setAuthModalOpen(true)
      return
    }
    */
    const pass = skiPassess.find((p) => p.id === selectedPass)
    if (!pass) return

    console.log("Ski pass purchase:", {
      pass: selectedPass,
      startDate,
      quantity,
      total: pass.price * Number.parseInt(quantity),
    })

    alert("Абонемент успішно придбано!")
  }

  const calculateTotal = () => {
    const pass = skiPassess.find((p) => p.id === selectedPass)
    return pass ? pass.price * Number.parseInt(quantity) : 0
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />

      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Snowflake className="h-8 w-8 text-yellow-400" />
              <Badge className="bg-yellow-400 text-black text-lg px-4 py-2">Зимовий сезон 2024/25</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Абонементи на <span className="text-yellow-400">катання</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Оберіть найкращий абонемент для вашого зимового відпочинку на лижних трасах VONSI RESORT
            </p>
          </div>

          {/* Ski Pass Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {skiPassess.map((pass) => (
              <Card
                key={pass.id}
                className={`relative border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPass === pass.id ? "border-yellow-400 shadow-lg" : "border-border hover:border-yellow-200"
                } ${pass.popular ? "ring-2 ring-yellow-400" : ""}`}
                onClick={() => setSelectedPass(pass.id)}
              >
                {pass.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-400 text-black px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Популярний
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${pass.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Mountain className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{pass.name}</CardTitle>
                  <CardDescription className="text-sm">{pass.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">₴{pass.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pass.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {pass.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      selectedPass === pass.id
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-transparent border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    {selectedPass === pass.id ? "Обрано" : "Обрати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Purchase Form */}
          {selectedPass && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Оформлення абонемента</CardTitle>
                <CardDescription>
                  Вкажіть деталі для придбання: {skiPassess.find((p) => p.id === selectedPass)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Дата початку дії</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "dd MMMM yyyy", { locale: uk }) : "Оберіть дату"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Кількість абонементів</label>
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 абонемент</SelectItem>
                        <SelectItem value="2">2 абонементи</SelectItem>
                        <SelectItem value="3">3 абонементи</SelectItem>
                        <SelectItem value="4">4 абонементи</SelectItem>
                        <SelectItem value="5">5 абонементів</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Абонемент:</span>
                    <span>{skiPassess.find((p) => p.id === selectedPass)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ціна за одиниць:</span>
                    <span>₴{skiPassess.find((p) => p.id === selectedPass)?.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Кількість:</span>
                    <span>{quantity}</span>
                  </div>
                  {startDate && (
                    <div className="flex justify-between">
                      <span>Дата початку:</span>
                      <span>{format(startDate, "dd MMMM yyyy", { locale: uk })}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Загальна сума:</span>
                      <span>₴{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                  disabled={!startDate}
                >
                  Придбати абонемент
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mountain className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">15 трас різної складності</h3>
                <p className="text-muted-foreground text-sm">
                  Від зелених трас для початківців до чорних для експертів
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Режим роботи</h3>
                <p className="text-muted-foreground text-sm">
                  Щодня з 8:00 до 22:00
                  <br />
                  Нічне катання до 22:00
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Групові знижки</h3>
                <p className="text-muted-foreground text-sm">
                  Знижка 15% при покупці від 5 абонементів
                  <br />
                  Знижка 25% від 10 абонементів
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode="login" />
    </div>
  )
}
