import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

const routes = [
  { path: '', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
