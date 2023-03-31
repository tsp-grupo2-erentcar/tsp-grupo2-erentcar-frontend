import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';

const routes: Routes = [
  {
    path:'',
    component:CarDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarDetailRoutingModule { }
