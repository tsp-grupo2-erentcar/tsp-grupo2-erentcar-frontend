import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input() rating!:number
  @Input() changeStars:boolean=false
  @Output() ratingChange:EventEmitter<number>=new EventEmitter<number>()

  constructor() { 

  }

  returnStars(index:number):string{
    if(index<this.rating){
      return 'bx bxs-star'
    }
    return 'bx bx-star'
  }
  selectStar(index:number){
    this.rating=index+1
    this.ratingChange.emit(this.rating)
  }

  ngOnInit(): void {
  }

}
