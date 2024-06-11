import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { restaurantService } from "../service/restaurant.service";
import { restaurant } from '../shared/restaurant';
import { AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent]
})
export class HomePage implements OnInit {
  mydataSource: restaurant[] = [];
  cart: any[] = [];

  constructor(private restaurantService: restaurantService,private tabs: TabsPage, private alertController: AlertController) { }

  ngOnInit() {
    //localStorage.removeItem('cart');
    this.getRestaurants();
    console.log(this.mydataSource)

  }

  ionViewWillEnter() {
    let crt: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(crt.length)
  }

  getRestaurants() {
    this.restaurantService.getRestaurant().subscribe(allrestaurants => {
      let restaurants: any[] = allrestaurants
      restaurants.forEach((element) => {
        this.mydataSource.push(element)
      });
    })
  }

 
  addCart(item: any) {
    let mycart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log("This is it "+mycart.length)

    if(mycart.length == 0) {
      //clear the array to allow it to push new restaurant 
      this.cart.length = 0;
      //push new restaurant to the array
      this.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.tabs.ngOnInit();
      console.log(this.cart);
    }
    else{
      this.myAlert();
    }
    
  }

  async myAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There is an item already in your cart, you can only order from one restaurant at a time!',
      buttons: ['OK']
    });
    await alert.present();
  }

} 
