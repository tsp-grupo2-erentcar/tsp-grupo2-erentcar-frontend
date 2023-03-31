import { Component, OnInit,Input } from '@angular/core';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating!:Rating
  constructor() { }

  ngOnInit(): void {
  }

}
