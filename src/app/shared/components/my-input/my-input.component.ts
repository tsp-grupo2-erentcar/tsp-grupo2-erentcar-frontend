import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements OnInit {
  @Input() placeholder:string="placeholder"
  @Input() border:string|null=null

  @Input() model:string=""/*para el enlace doble*/
  @Output() modelChange:EventEmitter<string>=new EventEmitter<string>();/*para el enlace doble*/

  constructor() { }

  ngOnInit(): void {
  }

}
