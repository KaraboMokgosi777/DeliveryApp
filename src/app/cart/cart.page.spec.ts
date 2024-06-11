import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { cartPage } from './cart.page';

describe('cartPage', () => {
  let component: cartPage;
  let fixture: ComponentFixture<cartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cartPage, IonicModule, ExploreContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(cartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
