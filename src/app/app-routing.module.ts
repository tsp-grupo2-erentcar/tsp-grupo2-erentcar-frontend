import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
<<<<<<< Updated upstream
    path:'DashboardClient',
    component:DashboardComponent,
    loadChildren:()=>import('src/app/modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
=======
    path: '',
    component: FreeviewComponent,
    children: [
      {path: '',  component: LoginComponent},
      {path: 'about',  component: AboutComponent},
      {path: 'login',  component: LoginComponent},
      {path: 'register',  component: RegisterComponent},
    ]
  },
  {
    path: 'client',
    component: ClientNavigationComponent,
    children: [
      {path: 'search', component: SearchCarComponent},
      {path: 'my-car',  component: MyCarComponent},
      {path: 'favourites', component: MyFavouritesComponent},
      {path: 'rentals', component: MyRentalsComponent},
      {path: 'reservations', component: MyReservationsComponent},
      {path: 'subscription', component: SubscriptionComponent},
      {path: 'profile', component: MyProfileComponent},
      {path: 'search/car/:carId', component: CarComponent},
      {path: 'profile/car/:carId', component: CarComponent}
    ]
>>>>>>> Stashed changes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
