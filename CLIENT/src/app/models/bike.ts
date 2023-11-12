import { Photo } from "./photo";

export interface Bike {
    id: number;
    name: string;
    description: string;
    referenceNumber: string;
    price: number;
    color: string;
    bikeType: number;
    created: number;
    quantity: number;
    location: number;
    photoUrl: string;
    discountedPrice: number;
    rating?: string;
    photos?: Photo[];
}
