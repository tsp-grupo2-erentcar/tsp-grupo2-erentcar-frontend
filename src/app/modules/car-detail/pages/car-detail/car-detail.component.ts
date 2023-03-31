import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/shared/models/car';
import { ImageCar } from 'src/app/shared/models/imageCar';
import { Owner } from 'src/app/shared/models/owner';
import { Rating } from 'src/app/shared/models/rating';

export interface ItemImageCar{
    image:ImageCar;
    selected:boolean;
}

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @ViewChild('imageContainer')imageContainer!:ElementRef
  
  car!:Car
  images:ImageCar[]=[]
  itemImages:ItemImageCar[]=[]
  imageSelected!:ItemImageCar
  owner!:Owner
  ratings:Rating[]=[]
  /*index:number=0
  indexImage:number=0
  animation:string="all 0.5s"*/

  zoom:number=1
  zoomX!:number/*coordenadas del mouse para que sean el centro del zoom*/
  zoomY!:number
  coorX!:number/*coordenadas del contenedor con respecto a la pantalla*/
  coorY!:number
  width!:number
  height!:number

  constructor() { 
    this.car={id:1,fuel:'Petrol',gearBox:'Automatic',
      mileage:430.45,model:'Eco Sport 1.5L',licensePlate:'LX5-S82',
      pricePerDay:73.2,rating:4,seats:5,type:'Car',
      brand:{name:'Ford',url:'https://logos-world.net/wp-content/uploads/2021/03/Ford-Logo.png'},
      images:[
        {url:'https://www.leonford.pe/data/autos/ford-ecosport/ford-ecosport-titanium-1-5-mt.jpg'},
        {url:'https://live.dealer-asset.co/images/ph1355/stockvehicles/1007443_0fb62d35-0041-4dbc-924a-6e404aaa8047.jpg?s=1024'},
        {url:'https://www.autopista.es/uploads/s1/79/57/04/8/fordecosport01.jpeg'},
        {url:'https://www.autopista.es/uploads/s1/79/57/04/8/fordecosport01.jpeg'},
        {url:'https://www.autopista.es/uploads/s1/79/57/04/8/fordecosport01.jpeg'},
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
    this.images=this.car.images
    this.itemImages=this.images.map(image=>({image:image,selected:false}));
    this.owner={name:"Name",lastName:"LastName",
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque tortor nisi, viverra eget velit quis, tempus tincidunt enim. Aenean id tortor felis. Donec consequat ut neque at lobortis. Morbi posuere molestie lorem non maximus. Vivamus sapien augue, efficitur ac ante consectetur, ultrices rutrum purus. Praesent vulputate erat non massa fringilla, in maximus tellus ullamcorper.',
    age:35,rating:4,img:'https://static.diariofemenino.com/uploads/amor/196745-hombres-40.jpg'
    }
    this.ratings=[
      {
        rating:4,comment:"Esto es un comentario de prueba. Espero funcione",
        userRating:{name:'Name',lastName:'LastName',
        img:'https://www.oficinaempleo.com/blog/wp-content/uploads/2018/01/trabajo.jpg'}
      },
      {
        rating:4,comment:"Esto es un comentario de prueba. Espero funcione",
        userRating:{name:'Name',lastName:'LastName',
        img:'https://www.oficinaempleo.com/blog/wp-content/uploads/2018/01/trabajo.jpg'}
      },
      {
        rating:4,comment:"Esto es un comentario de prueba. Espero funcione",
        userRating:{name:'Name',lastName:'LastName',
        img:'https://www.oficinaempleo.com/blog/wp-content/uploads/2018/01/trabajo.jpg'}
      }
    ]
  }
  
  clickSelectImage(select:ItemImageCar){
    this.itemImages.forEach(element => {
      if(select!=element){
        element.selected=false
      }
      else{
        element.selected=true
        this.imageSelected=element
      }
    });
  }

  mouseEnter(){
    /*Se obtiene la posición del contenedor de la imagen con respecto a la pantalla*/
    const element=this.imageContainer.nativeElement
    this.coorX=element.getBoundingClientRect().x
    this.coorY=element.getBoundingClientRect().y
    this.width=element.getBoundingClientRect().width
    this.height=element.getBoundingClientRect().height
  }
  mouseMove(event:MouseEvent){
    /*event permite obtener las coordenadas del mouse con respecto a la pantalla
      transform-origin: 0% 0% -> arriba izquierda, 100% 100% abajo derecha
      const x-> porcentaje al que corresponde el lugar del mouse con respecto a la 
      parte más a la derecha del contenedor(100%)
      const y-> porcenta al que corresponde el lugar del mouse con respecto a la 
      parte más abajo del contenedor(100%)
    */
    const x=((event.clientX-this.coorX)/this.width)*100
    const y=((event.clientY-this.coorY)/this.height)*100
    this.zoomX=x
    this.zoomY=y
    this.zoom=2
  }
  mouseLeave(){
    /*Se reinicia el zoom*/
    this.zoomX=50
    this.zoomY=50
    this.zoom=1
  }

  /*next(){
    this.index=this.index-60
    
    if(this.index<=-360){
      this.index=0
    }
    this.indexImage++

    let a=setInterval(()=>{
      this.animation="none"
      let aux=this.images[0]
      this.images.splice(0,1)
      this.images.push(aux)
      this.index=0
      clearInterval(a)
    },800)
    this.animation="all 0.5s"
  }
  prev(){
    this.index=this.index+60
    if(this.index==60){
      this.index=-300
    }
  }*/

  ngOnInit(): void {
    this.imageSelected=this.itemImages[0]
    this.itemImages[0].selected=true
  }
}
