import { Component, Input, OnInit } from '@angular/core';
import { ImageCar } from '../../models/imageCar';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() images!:ImageCar[]
  @Input() buttons:boolean=false

  timer:any
  selectedImage:number=0
  animation:String="none"
  durationAnimation:string="0.0s"

  constructor() { }

  selectImage(i:number):void{
    this.selectedImage=i
    this.animation="fade"
    this.durationAnimation="1.5s"
  }

  autoSlideImage():void{
    this.timer=setInterval(()=>{
      this.clickNext()
      this.animation="fade"
      this.durationAnimation="1.5s"
    },4000)
  }

  clear():void{
    clearInterval(this.timer)
    this.selectedImage=0
    this.animation="none"
    this.durationAnimation="0.0s"
  }

  clickPrev():void{
    if(this.selectedImage==0){
      this.selectedImage=this.images.length-1
    }else{
      this.selectedImage--
    }
  }

  clickNext():void{
    if(this.selectedImage==this.images.length-1){
      this.selectedImage=0
    }else{
      this.selectedImage++
    }
  }

  ngOnInit(): void {
  }

}
