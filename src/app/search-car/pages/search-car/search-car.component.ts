import {Component, OnInit, ViewChild} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {Car} from "../../model/car";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDrawer} from "@angular/material/sidenav";
import {UntypedFormGroup, UntypedFormControl} from "@angular/forms";
import {CarModelsService} from "../../services/car-models.service";
import {CarBrandsService} from "../../services/car-brands.service";

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {
  rangePrices: number[] = [60, 160, 300, 500, 650];
  //specifications: string[] = ["Air conditioning", "4+ doors"];
  transmissions: string[] = ["Manual", "Automatic"];
  categoriesOfCars: string[] = ["Little", "Medium", "Large", "Premium", "Minivan", "SUVs"];
  selectedPrice: number = 0;
  //selectedSpecifications: string[] = [];
  selectedTransmission: string = '';
  selectedCategories: string[] = [];
  carsData: Car[];
  clientId: string | null;
  date: UntypedFormGroup;
  today: Date;

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(private carsService: CarsService,
              private carModelsService: CarModelsService,
              private carBrandsService: CarBrandsService,
              private observer: BreakpointObserver) {
    this.carsData = [];
    this.clientId = localStorage.getItem('clientId');
    console.log(this.clientId)
    this.today = new Date();
    const day = this.today.getDate();
    const month = this.today.getMonth();
    const year = this.today.getFullYear();

    this.date = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, day)),
      end: new UntypedFormControl(new Date(year, month, day))
    });
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 1150px)'])
        .subscribe(response => {
          if (response.matches) {
            this.drawer.mode = 'over';
            this.drawer.close();
          } else {
            this.drawer.mode = 'side';
            this.drawer.open();
          }
        });
    }, 0);
  }

  getAllCars() {
    this.carsService.getAll().subscribe((response: any) => {
      this.carsData = response.content;
      this.applyFilters();
    });
  }
  updateSelectedPrice(price: number) {
    if (this.selectedPrice === price) { this.selectedPrice = 0;}
    else {
      this.selectedPrice = price;
    }
    console.log("Selected Price: "+ this.selectedPrice + "Price: "+price);
    this.getAllCars();
  }
  updateSelectedTransmission(transmission: string) {
    if (this.selectedTransmission === transmission) { this.selectedTransmission = '';}
    else {
      this.selectedTransmission = transmission;
    }
    this.getAllCars();
  }

  updateSelectedCategory(category: string) {
    const index = this.selectedCategories.indexOf(category.toUpperCase());

    if (index === -1) {
      this.selectedCategories.push(category.toUpperCase());
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.getAllCars();
  }

  applyFilters() {
    this.carsData = this.carsData.filter((car: Car) => {
      // Filtrar por precio
      if (this.selectedPrice && car.rentAmountDay > this.selectedPrice) {
        return false;
      }

      // Filtrar por especificaciones
/*      if (this.selectedSpecifications.length > 0) {
        for (const spec of this.selectedSpecifications) {
          if (!car.extraInformation.includes(spec)) {
            return false;
          }
        }
      }*/

      // Filtrar por transmisiones
      if (this.selectedTransmission) {
        if (car.manual && this.selectedTransmission !== 'Manual') {
          return false;
        }
        if (!car.manual && this.selectedTransmission !== 'Automatic') {
          return false;
        }
      }

      // Filtrar por categorías
      if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(car.category)) {
        return false;
      }

      return true;
    });
  }
}
