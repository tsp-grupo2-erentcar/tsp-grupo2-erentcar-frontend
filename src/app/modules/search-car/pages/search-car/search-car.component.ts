import { Component, OnInit,HostListener } from '@angular/core';
import { ClickOutService } from 'src/app/core/services/click-out.service';
import { Car } from 'src/app/shared/models/car';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {
  aux:string="2"
  showFilter:boolean=false
  cars:Car[]
  constructor(private clickOutService:ClickOutService) { 
    this.cars=[
      {id:1,fuel:'Petrol',gearBox:'Automatic',
      mileage:430.45,model:'Eco Sport 1.5L',licensePlate:'LX5-S82',
      pricePerDay:73.2,rating:4,seats:5,type:'Car',
      brand:{name:'Ford',url:'https://logos-world.net/wp-content/uploads/2021/03/Ford-Logo.png'},
      images:[
        {url:'https://www.leonford.pe/data/autos/ford-ecosport/ford-ecosport-titanium-1-5-mt.jpg'},
        {url:'https://live.dealer-asset.co/images/ph1355/stockvehicles/1007443_0fb62d35-0041-4dbc-924a-6e404aaa8047.jpg?s=1024'},
        {url:'https://www.autopista.es/uploads/s1/79/57/04/8/fordecosport01.jpeg'}
      ],
      features:[
        {name:'Bluetooth'},
        {name:'AC'},
        {name:'Bluetooth'},
        {name:'GPS'},
        {name:'Bluetooth'},
        {name:'Bluetooth'},
      ]
      },
      {id:1,fuel:'Petrol',gearBox:'Automatic',
      mileage:430.45,model:'Eco Sport 1.5L',
      pricePerDay:73.2,rating:4,seats:5,type:'Car',licensePlate:'LX5-S82',
      brand:{name:'Ford',url:'https://logos-world.net/wp-content/uploads/2021/03/Ford-Logo.png'},
      images:[
        {url:'https://www.leonford.pe/data/autos/ford-ecosport/ford-ecosport-titanium-1-5-mt.jpg'},
        {url:'https://live.dealer-asset.co/images/ph1355/stockvehicles/1007443_0fb62d35-0041-4dbc-924a-6e404aaa8047.jpg?s=1024'},
        {url:'https://www.autopista.es/uploads/s1/79/57/04/8/fordecosport01.jpeg'}
      ],
      features:[
        {name:'Bluetooth'},
        {name:'AC'},
        {name:'Bluetooth'},
        {name:'GPS'},
        {name:'Bluetooth'},
        {name:'Bluetooth'},
      ]
      }
    ]
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.clickOutService.documentClickedTarget.next(event.target);
    /*aqui si emite un elemento html para cerrar los select*/
  }

  @HostListener("window:resize",[])hiddenFilter(){
    if(window.innerWidth>728 ){
      this.showFilter=false
    }
  }

  clickShowFilter(){
    this.showFilter=!this.showFilter
  }

  ngOnInit(): void {
  }

}
