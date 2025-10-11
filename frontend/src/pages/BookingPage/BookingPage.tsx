
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SidebarMenu } from "../../components/SidebarMenu";
import { AuthModal } from "../../components/AuthModal";
import { useUser } from "../../store/UseContext";
import http_api from "../../services/http_api";
import { getToken } from "../../services/tokenService";
import type Room from "./type";
import { BookingHeader } from "./BookingHeader";
import { BookingSteps } from "./BookingSteps";
import SearchStep from "./SearchStep";
import BookingDetailsStep from "./BookingDetailsStep";
import BookingConfirmationStep from "./BookingConfirmationStep";

export default function BookingPage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [step, setStep] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const { user } = useUser();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialRequests: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const isSearchFormValid = () => {
    return checkIn && checkOut && guests && checkIn < checkOut;
  };

  //отримати список вільних номерів
  const handleSearch = async () => {
    if (!isSearchFormValid()) return;

    try {
      const response = await http_api.get("api/Rooms/rooms", {
        params: {
          from: checkIn ? format(checkIn, "yyyy-MM-dd") : undefined,
          to: checkOut ? format(checkOut, "yyyy-MM-dd") : undefined,
          capacity: Number(guests),
        },
      });

      if (response.status === 200) {
        setAvailableRooms(response.data); // отримані з бекенду вільні номери
        setSearchPerformed(true);
        setSelectedRoom("");
      } else {
        throw new Error("Не вдалося отримати вільні номери");
      }
    } catch (error) {
      console.error(error);
      alert("Не вдалося отримати доступні номери. Спробуйте пізніше.");
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = availableRooms.find((r) => r.id === selectedRoom);
    if (room && checkIn && checkOut) {
      return room.pricePerNight * calculateNights();
    }
    return 0;
  };

  const handleProceedToBooking = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setStep(2);
  };

  const handleBooking = async () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      alert("Будь ласка, оберіть номер та дати.");
      return;
    }

    const token = getToken();
    if (!token) {
      setAuthModalOpen(true);
      return;
    }

    const payload = {
      roomId: selectedRoom,
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : undefined,
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : undefined,
    };

    try {
      const response = await http_api.post(
        "api/Booking/createBooking",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Бронювання успішно створено!");
        localStorage.removeItem("selectedRoom"); // очистка
        setStep(1); // або редірект на іншу сторінку
        navigate("/dashboard");
      } else {
        throw new Error("Не вдалося створити бронювання");
      }
    } catch (error) {
      console.error(error);
      alert("Не вдалося створити бронювання. Спробуйте пізніше.");
    }
  };

  useEffect(() => {
    const savedRoom = localStorage.getItem("selectedRoom");
    if (savedRoom) setSelectedRoom(savedRoom);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarMenu />
      <div className="md:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Заголовок */}
          <BookingHeader />

          {/* Кроки */}
          <BookingSteps step={step} />

          {/* === КРОК 1 === */}
          <SearchStep
            step={step}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            handleSearch={handleSearch}
            isSearchFormValid={isSearchFormValid}
            searchPerformed={searchPerformed}
            availableRooms={availableRooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            calculateNights={calculateNights}
            handleProceedToBooking={handleProceedToBooking}
          />

          <BookingDetailsStep
            step={step}
            user={user}
            handleInputChange={handleInputChange}
            setStep={setStep}
          />

          <BookingConfirmationStep
            step={step}
            availableRooms={availableRooms}
            selectedRoom={selectedRoom}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            user={user}
            bookingData={bookingData}
            calculateTotal={calculateTotal}
            handleBooking={handleBooking}
          />
        </div>
      </div>

      {/* Модальне вікно авторизації */}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
