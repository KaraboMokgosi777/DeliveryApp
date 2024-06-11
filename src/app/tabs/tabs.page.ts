import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent, FormsModule, ExploreContainerComponent],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  cart: any[] = [];
  constructor() {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

}
