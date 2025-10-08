import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/Dialog";
import { Badge } from "../../components/Badge";
import { MapPin, Clock, CreditCard, Phone } from "lucide-react";
import type { IBookingDetailsDialogProps } from "./types";



export const BookingDetailsDialog: React.FC<IBookingDetailsDialogProps> = ({
  bookingDetailsModal,
  setBookingDetailsModal,
}) => {
  const booking = bookingDetailsModal;

  return (
    <Dialog open={!!booking} onOpenChange={() => setBookingDetailsModal(null)}>
      <DialogContent className="w-full max-w-full sm:max-w-2xl mx-2 bg-white max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="!font-semibold">
            Деталі бронювання
          </DialogTitle>
          <DialogDescription>
            Повна інформація про ваше бронювання
          </DialogDescription>
        </DialogHeader>

        {booking ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl !font-semibold">{booking.room.title}</h3>
              <Badge
                className={
                  new Date(booking.checkOut) < new Date()
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }
              >
                {new Date(booking.checkOut) < new Date()
                  ? "Пройшло"
                  : "Підтверджено"}
              </Badge>
            </div>

            {/* Інформація про номер */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Деталі кімнати */}
                <div>
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="!h-5 !w-5 text-yellow-400" /> Інформація
                    про номер
                  </h5>
                  <div className="space-y-2 text-sm">
                    <InfoRow label="Номер:" value={booking.room.details.roomNumber} />
                    <InfoRow label="Поверх:" value={booking.room.details.floor} />
                    <InfoRow label="Площа:" value={booking.room.details.size} />
                    <InfoRow label="Ліжко:" value={booking.room.details.bedType} />
                  </div>
                </div>

                {/* Зручності */}
                <div>
                  <h4 className="font-semibold mb-2">Зручності</h4>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    {booking.room.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Права частина */}
              <div className="space-y-4">
                {/* Дати */}
                <Section
                  icon={<Clock className="h-5 w-5 text-yellow-400" />}
                  title="Дата заїзду/виїзду"
                >
                  <InfoRow
                    label="Заїзд:"
                    value={new Date(booking.checkIn)
                      .toISOString()
                      .split("T")[0]}
                  />
                  <InfoRow
                    label="Виїзд:"
                    value={new Date(booking.checkOut)
                      .toISOString()
                      .split("T")[0]}
                  />
                  <InfoRow
                    label="Ночей:"
                    value={
                      (new Date(booking.checkOut).getTime() -
                        new Date(booking.checkIn).getTime()) /
                      (1000 * 60 * 60 * 24)
                    }
                  />
                </Section>

                {/* Вартість */}
                <Section
                  icon={<CreditCard className="h-5 w-5 text-yellow-400" />}
                  title="Вартість"
                >
                  <InfoRow
                    label="За ніч:"
                    value={`₴${booking.room.pricePerNight.toLocaleString("uk-UA")}`}
                  />
                  <InfoRow
                    label="Загалом:"
                    value={`₴${(
                      ((new Date(booking.checkOut).getTime() -
                        new Date(booking.checkIn).getTime()) /
                        (1000 * 60 * 60 * 24)) *
                      booking.room.pricePerNight
                    ).toLocaleString("uk-UA")}`}
                    bold
                  />
                </Section>

                {/* Контакти */}
                <Section
                  icon={<Phone className="h-5 w-5 text-yellow-400" />}
                  title="Контакти"
                >
                  <p className="text-sm">+38098204815</p>
                </Section>
              </div>
            </div>
          </div>
        ) : (
          <p>Немає деталей для цього бронювання.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* 🔹 Малі допоміжні компоненти для чистоти коду */

const InfoRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string | number;
  bold?: boolean;
}) => (
  <div
    className={`flex justify-between text-sm ${
      bold ? "font-semibold" : ""
    }`}
  >
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h5 className="font-semibold mb-2 flex items-center gap-2">
      {icon} {title}
    </h5>
    <div className="space-y-2">{children}</div>
  </div>
);
