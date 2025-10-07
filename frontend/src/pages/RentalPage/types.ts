// Типи
export interface sizeRental {
  equipmentVId?: string;
  size: string;
  quantity: number;
}

export interface Equipmentt {
  id: string;
  type: string;
  brand: string;
  rating: number;
  description: string;
  pricePerDay: number;
  availableSizes: sizeRental[];
  totalQuantityAvailable: number;
  images: string[];
}

export interface CartItem extends Equipmentt {
  quantity: number;
  selectedSize?: string;
  rentalDays: number;
}

export interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, size: string | undefined, quantity: number) => void;
  onRemoveItem: (itemId: string, size?: string) => void;
  totalPrice: number;
  onConfirmRental: () => void;
  isLoggedIn: boolean;
}

export interface EquipmentCardProps {
  item: Equipmentt;
  onAddToCart: (item: Equipmentt, size?: string) => void;
  rentalDays: number;
  startDate?: Date;
  endDate?: Date;
  cart: CartItem[];
}

export interface LoginPromptCardProps {
  onLoginClick: () => void;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface RentalCategoryCardProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

export interface RentalPeriodCardProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}