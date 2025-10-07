
export interface ISubscription {
    id: string,
    name: string,
    description: string,
    price: number,
    durationDays: number,
    features: string[],
    popular: boolean
}