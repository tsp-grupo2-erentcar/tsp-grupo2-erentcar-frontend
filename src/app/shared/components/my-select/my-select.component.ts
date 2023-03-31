import { Component, Input, OnInit,
  ContentChildren,QueryList,Output, 
  EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { MyOptionComponent } from '../my-option/my-option.component';
import {startWith,switchMap,tap} from 'rxjs/operators'
import { merge,BehaviorSubject,Observable,Subscription } from 'rxjs';
import { ClickOutService } from 'src/app/core/services/click-out.service';
import { trigger,style,transition,animate, state } from '@angular/animations';

@Component({
  selector: 'app-my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        state('void',style({
          transform:'translateY(-10px)',
          opacity:0,
        })),
        transition(':enter',[
          animate(200,style({
            transform:'translateY(0)',
            opacity:1
          }))
        ])
      ]
    )
  ]
})
export class MySelectComponent implements OnInit {
  @ViewChild('selectComponent',{ static: false }) selectComponent!: ElementRef;
  
  thereSelectedOption:number=0
  show:boolean=false
  nameShow:string=''
  selectionModel:MyOptionComponent[]=[]

  @Input()model:string|null=null/*para el enlace doble*/
  @Output() modelChange:EventEmitter<string>=new EventEmitter<string>();/*para el enlace doble*/
  @Input() placeholder:string="placeholder"
  
  @ContentChildren(MyOptionComponent,{descendants:true}) options!:QueryList<MyOptionComponent>;
  
  clickMenuSubject$=new BehaviorSubject<boolean>(false);/*sujeto de bools que se activa al mostar las opciones*/
  clickMenu$:Observable<boolean>=this.clickMenuSubject$.asObservable();/*observable del sujeto de bools*/
  clickMenuSub!:Subscription /*subscripcion al observable de arriba*/
  clickSub:Subscription|null=null;/*subscripcion al servicio clickOut para poder desuscribirse luego*/


  constructor(private clickOutService:ClickOutService) {

  }

  subscribeOnOptionClick(){/*aqui solo se subscribe a lo que esta dentro del ngcontent(las opciones del select)*/
    this.options.changes.pipe(
      startWith(this.options),
      switchMap((options:QueryList<MyOptionComponent>)=>{
        /*el switchMap retorna el observable dentro, se subscribe y lo mapea*/
        return merge(...options.map((option)=>option.click));/*regresa un observable de optionComponent*/
      })
    ).subscribe((clickedOption:MyOptionComponent)=>this.selectOption(clickedOption));
    /*cuando se emite un optionComponent desde ese componente, se llama a la funcion selectOption*/
  }
  protected selectOption(option:MyOptionComponent){/*
    se coloca el componente como seleccionado
    el nameShow se setea con el contenido(texto) que hay en el optionComponent
    se itera las opciones
    se setea el show para ocultar
  */
    option.select();
    this.thereSelectedOption=1
    this.nameShow=option.content/*Texto dentro de las opciones*/
    this.modelChange.emit(option.value)
    this.model=option.value
    this.iterateOptions(option)
    this.show=false
    this.clickMenuSubject$.next(false)
  }

  iterateOptions(option:MyOptionComponent){/*
    se itera lo que hay dentro del ngContent(una lista de optionComponents)
    se compara cada elemento de la lista con el option pasado por parametro(que es el option seleccionado)
    a los que no coincidan, se les marca como deselecionados
  */
    this.options.forEach(optionAux => {
      if(optionAux!=option){
        optionAux.deselect();
      }
    });
  }

  initIterateOptions(){/*
    esto es en caso que se paso un valor por defecto al select
    model es el valor que se le pasa desde la etiqueta my-select, si no se pasa algo, es null
    se itera la lista para seleccionar al elemento que coincida
    se compara el value de cada optionComponent(value que se le pasa en la etiqueta) con el valor
    que se le paso por defecto
  */
    if(this.model){
      this.options.forEach(optionAux=>{
        if(optionAux.value==this.model){
          this.thereSelectedOption=1
          optionAux.select()
          this.nameShow=optionAux.content
        }
      })
    }
  }

  clickShow(){
    this.clickMenuSubject$.next(!this.show)
    /*se emite un bool*/
  }

  documentClickListener(target: HTMLElement): void {/*
    target es el html donde se ha hecho click
    funcion para comprobar si se hace click afuera del elemento html
    si el selectComponent es el mismo que el target, es porque se ha hecho click dentro
  */
    const clickInside=this.selectComponent.nativeElement.contains(target);
    if (!clickInside){/*si es falso es que se da un click afuera*/
      this.clickMenuSubject$.next(false);/*se emite un bool en el sujeto de bools*/
    }
  }

  ngOnInit(): void {/*
    se guarda la subscripcion al observable de bools(clickMenu$)
  */
    this.clickMenuSub=this.clickMenu$.pipe(
      /*map retorna un observable*/
      tap(show=>{/*tap no devuelve observador, pero si permite usar las notificaciones que se emiten*/
        this.show=show
        if(show){/*si es true, es decir que se ha hecho click en el select para desplegar las opciones*/
          this.clickSub=this.clickOutService.documentClickedTarget/*se guarda la subscripcion al observable de htmlElement*/
          .subscribe(target=>this.documentClickListener(target));/*el observable devuelve un htmlElement*/
        }else if(!show && this.clickSub!==null){/*si es false, es decir se ha hecho click afuera y existe
          una subscripcion al observable de htmlElement
        */
          this.clickSub.unsubscribe(); /*Se desuscribe para no seguir atendiendo a los clicks que se hacen fuera*/
        }
      })
    ).subscribe();
  }

  ngAfterViewInit(){
    this.subscribeOnOptionClick()
  }

  ngAfterContentInit(){/*despues que se inicia el ngContent*/
    this.initIterateOptions()
  }

  ngOnDestroy(){
    this.clickMenuSub.unsubscribe();/*Se desuscribe al observador de bools*/
  }
}