import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../models/car';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.css']
})
export class CardCarComponent implements OnInit {
  @Input() car!:Car
  @ViewChild('carouselComponent')carouselComponent!:CarouselComponent
  map:Map<string,string> = new Map<string, string>();
  constructor() { 
    this.map.set('Bluetooth','bx bx-bluetooth')
    this.map.set('AC','bx bx-wind')
    this.map.set('Pet Friendly','bx bxl-baidu')
    this.map.set('GPS','bx bx-map')
  }

  returnIconFeature(feature:string):string{
    return this.map.get(feature) as string
  }

  returnStars(index:number):string{
    if(index<this.car.rating){
      return 'bx bxs-star'
    }
    return 'bx bx-star'
  }

  autoSlide():void{
    this.carouselComponent.autoSlideImage();
  }
  clearAutoSlide():void{
    this.carouselComponent.clear();
  }

  ngOnInit(): void {
  }

}
