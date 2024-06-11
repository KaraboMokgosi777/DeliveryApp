import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { restaurantService } from "../service/restaurant.service";
import { restaurant } from '../shared/restaurant';
import { AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class SearchPage {
  mydataSource: restaurant[] =[];
  cart: any[] = [];
  constructor(private restaurantService: restaurantService,private tabs: TabsPage,private alertController: AlertController) { }

  searchItems(event: any) {
    this.restaurantService.getRestaurant().subscribe(allrestaurants =>{
      let restaurants:any[] = allrestaurants
      restaurants.forEach((element) =>{
        this.mydataSource.push(element)
      });
    })

    const searchQuery = event.target.value.toLowerCase();
    this.mydataSource = this.mydataSource.filter((myrestaurant) => {
      const name = myrestaurant.name.toLowerCase();
      const dishType = myrestaurant.dishType.toLowerCase();
      const rating = myrestaurant.rating;
      const distance = myrestaurant.distance.toLowerCase();
      return name.indexOf(searchQuery) !== -1 || dishType.indexOf(searchQuery) !== -1 || distance.indexOf(searchQuery) !== -1;
    });

  }

  addCart(item: any) {
    let mycart = localStorage.getItem('cart');
    
    if (mycart?.length == null || mycart.length == 0) {
      //clear the array to allow it to push new restaurant 
      this.cart.length = 0;
      //push new restaurant to the array
      this.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.tabs.ngOnInit();
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
