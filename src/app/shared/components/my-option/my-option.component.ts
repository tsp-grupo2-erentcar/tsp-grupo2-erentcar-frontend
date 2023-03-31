import { Component, OnInit, HostListener, HostBinding,
  ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-my-option',
  templateUrl: './my-option.component.html',
  styleUrls: ['./my-option.component.css']
})
export class MyOptionComponent implements OnInit {
  
  selected:boolean=false /*para detectar si el componente ha sido selecionado*/

  @Input() value:string="" /*valor que tendrá el optionComponente, se le pasa en el html*/
  @Output() selectionChange:EventEmitter<MyOptionComponent>=new EventEmitter();/*no sé para que sirve xd*/
  
  protected click$:Subject<MyOptionComponent>=new Subject<MyOptionComponent>();/*sujeto de optionsComponent*/

  constructor(protected elementRef: ElementRef,) { 

  }
  get click():Observable<MyOptionComponent>{/*retorna un observable del sujeto de optionComponent*/
    return this.click$.asObservable();
  }

  get content():string {/*regresa el contenido(texto) dentro del ngContent*/
    return this.elementRef.nativeElement.textContent;
  }
  
  @HostListener('click', ['$event'])/*Evento click,el observable emite un optionComponent*/
  onClick():void{
    this.click$.next(this) /*importante*/
  }

  select(){/*se setea el select, es el optionComponent seleccionado*/
    this.setSelect(true)
  }
  setSelect(selected:boolean){
    this.selected=selected
    this.selectionChange.emit(this)/*no se si esto es util xd*/
  }

  deselect(){/*para dejar de seleccionar a este optionComponent*/
    this.selected=false
  }
  
  ngOnInit(): void {
  }

}
