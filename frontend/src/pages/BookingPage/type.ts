
export default interface Room  {
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    type: string;
    images: string[];
    amenities: string[];
};

export interface SearchStepProps {
  step: number
  checkIn: Date | undefined
  setCheckIn: (date: Date | undefined) => void
  checkOut: Date | undefined
  setCheckOut: (date: Date | undefined) => void
  guests: string
  setGuests: (value: string) => void
  handleSearch: () => void
  isSearchFormValid: () => boolean | string | Date | undefined
  searchPerformed: boolean
  availableRooms: Room[]
  selectedRoom: string | null
  setSelectedRoom: (id: string) => void
  calculateNights: () => number
  handleProceedToBooking: () => void
}

export interface BookingDetailsStepProps {
  step: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
  handleInputChange: (field: string, value: string) => void;
  setStep: (step: number) => void;
}

export interface BookingConfirmationStepProps {
  step: number;
  availableRooms: Room[];
  selectedRoom: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
  bookingData: {
    specialRequests: string;
  };
  calculateTotal: () => number;
  handleBooking: () => void;
}

export interface BookingStepsProps {
  step: number;
}