
export interface ISubscription {
    id: string,
    name: string,
    description: string,
    price: number,
    durationDays: number,
    features: string[],
    popular: boolean
}

export interface IPass {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  features: string[];
  popular: boolean;
}

export interface ISkiPassHeaderProps {
  seasonLabel?: string; 
  title?: string;       
  description?: string; 
}

export interface ISkiPassPurchaseCardProps {
  selectedPass: IPass | null;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  popoverOpen: boolean;
  setPopoverOpen: (open: boolean) => void;
  handlePurchase: () => void;
}

export interface ISkiPassCardsProps {
  passes: IPass[];
  selectedPass: IPass | null;
  onSelectPass: (pass: IPass) => void;
}