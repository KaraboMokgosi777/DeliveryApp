import { clrestaurant } from "./clrestaurant";   

export class restaurant implements clrestaurant {  
    id!: number;                      
    name!: string; 
    rating!: number; 
    address!: string;
    distance!: string;
    DeliveryFee!: number; 
    //dish details 
    prepTime!: string;
    dishType!: string;
    dishName!: string
    Price!: number;  
    image!: string;
}