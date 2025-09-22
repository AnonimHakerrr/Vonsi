// RentalConfirmationModal.tsx
import React, { useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { Textarea } from "./TextArea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog"
import { Mountain, CreditCard, Calendar, MapPin } from "lucide-react"

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
  selectedSize?: string
  rentalDays: number
  image: string
}

interface RentalConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  totalPrice: number
  startDate?: Date
  endDate?: Date
}

export const RentalConfirmationModal: React.FC<RentalConfirmationModalProps> = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  startDate,
  endDate,
}) => {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfirmRental = () => {
    console.log("Rental confirmed:", {
      customer: customerData,
      cart,
      totalPrice,
      startDate,
      endDate,
      paymentMethod,
    })

    alert("Оренда успішно оформлена! Ви отримаєте підтвердження на email.")
    onClose()
  }

  const isFormValid = () => {
    return customerData.firstName && customerData.lastName && customerData.email && customerData.phone
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">VONSI RESORT</span>
          </div>
          <DialogTitle className="text-center text-2xl">Підтвердження оренди</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rental Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Деталі оренди
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Дата початку:</span>
                <div className="font-medium">{startDate?.toLocaleDateString("uk-UA") ?? "Не вказано"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Дата закінчення:</span>
                <div className="font-medium">{endDate?.toLocaleDateString("uk-UA") ?? "Не вказано"}</div>
              </div>
            </div>
          </div>

          {/* Equipment List */}
          <div>
            <h3 className="font-semibold mb-3">Обране обладнання</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.brand} {item.selectedSize && `• ${item.selectedSize}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ₴{(item.price * item.quantity * item.rentalDays).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} шт. × {item.rentalDays} дн.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Контактна інформація</h3>
            <div className="grid grid-cols-2 gap-4">
              {["firstName", "lastName", "email", "phone"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>
                    {field === "firstName"
                      ? "Ім'я *"
                      : field === "lastName"
                      ? "Прізвище *"
                      : field === "email"
                      ? "Email *"
                      : "Телефон *"}
                  </Label>
                  <Input
                    id={field}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    value={customerData[field as keyof typeof customerData]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={`Введіть ${field === "firstName" ? "ім'я" : field === "lastName" ? "прізвище" : field}`}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="notes">Додаткові побажання</Label>
              <Textarea
                id="notes"
                value={customerData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Вкажіть будь-які особливі побажання..."
                rows={3}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Спосіб оплати
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className={paymentMethod === "card" ? "bg-yellow-400 text-black" : ""}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Картка
              </Button>
              <Button
                className={paymentMethod === "cash" ? "bg-yellow-400 text-black" : ""}
                onClick={() => setPaymentMethod("cash")}
              >
                Готівка при отриманні
              </Button>
            </div>
          </div>

          {/* Pickup Info */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Інформація про отримання
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Адреса:</strong> VONSI RESORT, Карпати, Україна
              </p>
              <p>
                <strong>Час роботи:</strong> Щодня з 8:00 до 20:00
              </p>
              <p>
                <strong>Телефон:</strong> +380 (67) 123-45-67
              </p>
            </div>
          </div>

          {/* Total and Actions */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Загальна сума:</span>
              <span className="text-2xl font-bold text-yellow-600">₴{totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Скасувати
              </Button>
              <Button
                onClick={handleConfirmRental}
                disabled={!isFormValid()}
                className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Підтвердити оренду
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Натискаючи "Підтвердити оренду", ви погоджуєтесь з умовами оренди
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
