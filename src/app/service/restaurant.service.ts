import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { restaurant } from "../shared/restaurant";
import { user } from '../shared/useraccount';

@Injectable({
    providedIn: 'root'
})
export class restaurantService {

    constructor() {
        if (!localStorage.getItem('restaurant')) {
            let restaurants = [
                {
                    "id": 1,
                    "name": "Kungfu Kitchen",
                    "rating": 3.7,
                    "address": "567 hillview St, Brooklyn, Pretoria, 3453",
                    "distance": "5.5 km",
                    //Dish details
                    "dishType": "Asian Cuisine",
                    "dishName": "Chicken Chow Fahn",
                    "prepTime": " 25 min",
                    "Price": 87.60,
                    "image": "assets/Kungfu.jpg",
                    "DeliveryFee": 40
                },
                {
                    "id": 2,
                    "name": "Mamba Samba",
                    "rating": 4.3,
                    "address": "45 Florida rd, Fleurhof, Johannesburg, 6754",
                    "distance": "2.2 km",
                    //Dish details
                    "dishType": "Sea Food",
                    "dishName": "Lobster",
                    "prepTime": " 45 min",
                    "Price": 106.90,
                    "image": "assets/mamba.jpg",
                    "DeliveryFee": 40
                },
                {
                    "id": 3,
                    "name": "Pedros",
                    "rating": 4.5,
                    "address": "17 Palala rd, West Cliff, Johannesburg, 2183",
                    "distance": "8.5 km",
                    //Dish details
                    "dishType": "South African",
                    "dishName": "Half Chicken & Chips",
                    "prepTime": " 20 min",
                    "Price": 95.70,
                    "image": "assets/chicken.jpeg",
                    "DeliveryFee": 40
                },
                {
                    "id": 4,
                    "name": "CrawDaddy's",
                    "rating": 4.8,
                    "address": "1115 Burnett St, Hatfield, Pretoria, 0028",
                    "distance": "4.1 km",
                    //Dish details
                    "dishType": "Prawn Dish",
                    "dishName": "Sea master",
                    "prepTime": " 45 min",
                    "Price": 91.90,
                    "image": "assets/Craw.jpg",
                    "DeliveryFee": 40
                },

            ]
            localStorage.setItem('restaurants', JSON.stringify(restaurants))
        }

        if (!localStorage.getItem('user')) {
            let myUser = [
                {
                    "id": 1,
                    "name": "Thabang",
                    "address": "17 Epping RD",
                    "phonenumber": 658453647
                }
            ]
            localStorage.setItem('user', JSON.stringify(myUser))
        }
    }

    getRestaurant(): Observable<any[]> {
        let restaurants: any[] = []
        if (localStorage.getItem('restaurants')) {
            restaurants = JSON.parse(localStorage.getItem('restaurants')!)
        }
        return of(restaurants)
    }

    getUser(): Observable<any[]> {
        let myUser: any[] = []
        if (localStorage.getItem('user')) {
            myUser = JSON.parse(localStorage.getItem('user')!)
        }
        return of(myUser)
    }
}