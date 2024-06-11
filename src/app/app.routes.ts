import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'Home',
    loadComponent: () => import('./Home/Home.page').then( m => m.HomePage)
  },
];
