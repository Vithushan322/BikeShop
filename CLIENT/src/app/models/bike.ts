import { Photo } from "./photo";

export interface Bike {
    id: number;
    name: string;
    description: string;
    referenceNumber: string;
    price: number;
    color: string;
    bikeType: BikeType;
    created: number;
    quantity: number;
    location: number;
    photoUrl: string;
    discountedPrice: number;
    rating?: string;
    photos?: Photo[];
}

export enum BikeType {
    General = "General",
    Sport = "Sport",
    Mountain = "Mountain",
    Kid = "Kid"
}
