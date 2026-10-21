import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'BabiTix — Ta billetterie à Abidjan' },
  {
    path: 'evenements/:slug',
    loadComponent: () => import('./pages/event/event').then(m => m.EventPage)
  },
  {
    path: 'confirmation/:ref',
    loadComponent: () => import('./pages/confirmation/confirmation').then(m => m.ConfirmationPage),
    title: 'Ton billet — BabiTix'
  },
  { path: '**', redirectTo: '' }
];
