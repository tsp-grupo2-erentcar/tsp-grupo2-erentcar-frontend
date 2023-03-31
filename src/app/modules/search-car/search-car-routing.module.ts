import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCarComponent } from './pages/search-car/search-car.component';

const routes: Routes = [
  {
    path:'',
    component:SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCarRoutingModule { }
