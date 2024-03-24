import { Routes } from '@angular/router';

import { LeagueComponent, StartComponent } from './modules';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'leagues/:url',
    component: LeagueComponent,
  },
];
