import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadComponent: () => import('./features/account/account-details.component').then(m => m.AccountDetailsComponent) },
  { path: 'badges/:id', loadComponent: () => import('./features/badge-detail/badge-detail.component').then(m => m.BadgeDetailComponent) },
  // ...existing routes...
];
