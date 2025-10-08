import type { IUser } from "../../services/tokenService";

export interface IHeaderProps {
  onOpenSettings: () => void;
  onLogout: () => void;
}

export interface IBookingDetails {
  room: {
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    type: string;
    images: string[];
    amenities: string[];
    details: {
      roomNumber: string;
      floor: string;
      size: string;
      bedType: string;
    };
  };
  checkIn: string;
  checkOut: string;
}
export interface IEquipmentRental {
  type: string;
  brand: string;
  description: string;
  pricePerDay: number;
  size: string;
  quantity: number;
  checkIn: string; // ISO дата у форматі рядка
  checkOut: string; // ISO дата у форматі рядка
}
export interface ISubscription {
  subscriptionId: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
}

export interface OverviewTabProps {
  bookingData: IBookingDetails[];
  subcription: ISubscription[]; // типізуй залежно від структури ваших абонементів
  totalMoneyInSeson: number;
  calculateSeasonDaysUnique: (subs: ISubscription[]) => number;
}

export interface IBookingsTabProps {
  sortedBookingData: IBookingDetails[];
  setBookingDetailsModal: (booking: IBookingDetails) => void;
}
export interface IRentalsTabProps {
  sortedRentals: IEquipmentRental[];
  setRentalDetailsModal: (rental: IEquipmentRental) => void;
}

export interface ISkiPassesTabProps {
  sortedSubscriptions: ISubscription[];
  generatePDF: (pass: ISubscription) => void;
}

export interface IBookingDetailsDialogProps {
  bookingDetailsModal: IBookingDetails | null;
  setBookingDetailsModal: (value: IBookingDetails | null) => void;
}

export interface IProfileSettingsDialogProps {
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
  editableUserData: IUser;
  setEditableUserData: React.Dispatch<React.SetStateAction<IUser>>;
  fieldErrors: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
  };
  setFieldErrors: React.Dispatch<
    React.SetStateAction<{
      firstName: boolean;
      lastName: boolean;
      email: boolean;
      phone: boolean;
    }>
  >;
  setPhotoFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleSettingsChange: (field: keyof IUser, value: string) => void;
  handleSaveSettings: () => void;
  user?: { firstName: string };
}

export interface IRentalDetailsDialogProps {
  rentalDetailsModal: IEquipmentRental | null;
  setRentalDetailsModal: (value: IEquipmentRental | null) => void;
}
