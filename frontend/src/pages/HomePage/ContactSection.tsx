import { MapPin, Phone, Mail } from "lucide-react";
import resortImage from "../../assets/resort.jpg"
export default function ContactSection() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl !font-black mb-6 text-balance">
            Готові до <span className="text-yellow-400">пригод</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Зв'яжіться з нами для бронювання або отримання додаткової інформації
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
              <span>VONSI_RESORT@gmail.com</span>
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
  );
}
