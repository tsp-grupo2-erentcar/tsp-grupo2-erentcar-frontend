import { Component, OnInit } from '@angular/core';
import {MyFavouritesService} from "../../services/my-favourites.service";
import {ActivatedRoute} from "@angular/router";
import {CarsService} from "../../../search-car/services/cars.service";
import {MyFavourites} from "../../model/my-favourites";
import {Car} from "../../../search-car/model/car";
import {ClientService} from "../../../my-profile/services/client.service";

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {
  clientId!: string | null;
  favouritesData: any //: MyFavourites[];
  carsData: Car[];

  constructor(
    private clientService: ClientService,
    private favouriteService: MyFavouritesService,
    private carService: CarsService
  ) {
    this.clientId = localStorage.getItem('clientId');
    this.favouritesData = [];
    this.carsData = [];
  }

  ngOnInit(): void {
    this.retrieveFavourites();
  }

  retrieveCars() {
    this.favouritesData.map((favourite: any) => {
      this.carService.getById(favourite.car.id).subscribe((response: any) => {
        this.carsData.push(response)
      });
    });
  }

  retrieveFavourites() {
    /*this.clientService.getFavoritesByIdClient(this.clientId).subscribe((response: any) => {
      this.favouritesData = response;
      this.retrieveCars();
    });*/

    let value = localStorage.getItem('clientInfo');
    let client = typeof value === "string" ? JSON.parse(value) : "";

    this.favouritesData = client.favourites
    console.log(this.favouritesData)
    this.retrieveCars();

  }
}
