import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { restaurant } from '../shared/restaurant';
import { restaurantService } from "../service/restaurant.service";
import { user } from '../shared/useraccount';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class AccountPage {
  myUser: any[] = [];
  allmyOrders: any[] = [];
  newOrder: any[] = [];
  data: any = [];
  constructor(private restaurantService: restaurantService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    //localStorage.clear();
    this.allmyOrders = JSON.parse(localStorage.getItem('myorders') || '[]');
    this.getUser();
    // this.allmyOrders.forEach((order) =>{
    // });
    this.allmyOrders = this.allmyOrders.reverse();
    console.log(this.allmyOrders);
    console.log(this.myUser);
  }


  ionViewWillEnter() {
    this.allmyOrders = JSON.parse(localStorage.getItem('myorders') || '[]');
    this.allmyOrders = this.allmyOrders.reverse();
  }



  getUser() {
    this.restaurantService.getUser().subscribe(allusers => {
      let restaurants: any[] = allusers
      restaurants.forEach((element) => {
        this.myUser.push(element)
      });
    })
  }

  
  edit() {
    this.myEdit();
  }

  help() {
    this.myHelp();
  }

  async myHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'Visit for support: https://ionic.io/support',
      buttons: ['OK']
    });
    await alert.present();
  }
  backtoCartAdd() {
    this.router.navigateByUrl('tabs/cart');
  }
 
  orderAgain(order: any) {
    console.log('Reordering:', order);
    // Retrieve existing orders from localStorage, if any
    let existingOrders = JSON.parse(localStorage.getItem('myorders') || '[]');
  
    // Add the reordered item to the existing orders array
    existingOrders.push(order);
  
    // Save the updated array back to localStorage
    localStorage.setItem('myorders', JSON.stringify(existingOrders));
  
    // Show a confirmation message
    this.alertController.create({
      header: 'Order Re-added',
      message: 'The order has been re-added to your past orders!',
      buttons: ['OK']
    }).then(alert => alert.present());
  
    // Optionally, you can update the local view model if you are keeping track of orders in a variable
    this.allmyOrders = existingOrders; // assuming you have allmyOrders variable that holds the orders for display
  }
  
  
  async myEdit() {
    // Retrieve the data you want to edit from local storage
    const storedData = localStorage.getItem('user');
    this.data = JSON.parse(storedData || '[]');

    const alert = await this.alertController.create({
      header: 'Edit Details',
      inputs: [{
        name: 'name',
        placeholder: 'Name',
        value: this.data[0].name
      },
      {
        name: 'phonenumber',
        placeholder: 'Phonenumber (max 13 characters)',
        attributes: {
          maxlength: 13,
        },
        value: "0"+this.data[0].phonenumber
      },
      {
        name: 'address',
        type: 'textarea',
        placeholder: 'Address',
        value: this.data[0].address
      },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Edit cancelled');
          }
        },
        {
          text: 'Save',
          handler: (formValues) => {
            // Retrieve the updated values from the form inputs
            //this.data.length = 0;
            this.data[0].name = formValues.name;
            this.data[0].phonenumber = formValues.phonenumber;
            this.data[0].address = formValues.address;

            
            // Update the values in local storage
            localStorage.setItem('user', JSON.stringify(this.data));
            console.log(this.data);
            console.log('Edit saved');
            this.myUser = JSON.parse(localStorage.getItem('user') || '[]');
          }
        }
      ],
    });
    await alert.present();
  }

}

