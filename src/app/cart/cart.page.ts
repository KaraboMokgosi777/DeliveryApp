import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { restaurantService } from "../service/restaurant.service";
import { restaurant } from '../shared/restaurant';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent, FormsModule, ExploreContainerComponent]
})
export class cartPage implements OnInit {
  cart: any[] = [];
  myorders: any[] = [];
  existingOrder: any[] = [];
  constructor(private restaurantService: restaurantService, private tabs: TabsPage, private alertController: AlertController, private location: Location) { }

  ngOnInit() {
    //localStorage.clear();
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //console.log(this.cart);
  }


  ionViewWillEnter() {
    this.ngOnInit();
  }

  removeOrder() {
    localStorage.removeItem('cart');
    this.ngOnInit();
    this.tabs.ngOnInit();
    localStorage.removeItem('cart');

    //chek if lclstorage is clear
    let check = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(check);
  }


  makepayment(cartitem: any) {
    // Retrieve existing orders from localStorage, if any
    let existingOrders = JSON.parse(localStorage.getItem('myorders') || '[]');

    // Push the new order to the existing array of orders
    existingOrders.push(cartitem);

    // Save the updated array back to localStorage
    localStorage.setItem('myorders', JSON.stringify(existingOrders));

    console.log(existingOrders); // This will help you see what's being stored

    this.myAlert(); // Confirm the action to the user
}


  async myAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Payment successfull!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
