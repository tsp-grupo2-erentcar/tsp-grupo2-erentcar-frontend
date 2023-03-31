import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeatureSelect } from 'src/app/core/models/featureSelect';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ClickOutService } from 'src/app/core/services/click-out.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-select-features',
  templateUrl: './select-features.component.html',
  styleUrls: ['./select-features.component.css'],
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
export class SelectFeaturesComponent implements OnInit {
  @ViewChild('selectComponent',{ static: false }) selectComponent!: ElementRef;

  show:boolean=false
  features:FeatureSelect[]=[{'name':'Bluetooh','icon':'bx bx-bluetooth','select':false},
  {'name':'Bike Rack','icon':'bx bx-cycling','select':false},
  {'name':'USB Input','icon':'bx bx-usb','select':false},
  {'name':'Pet Friendly','icon':'bx bxl-baidu','select':false},
  {'name':'GPS','icon':'bx bx-map','select':false},
  {'name':'AC','icon':'bx bx-wind','select':false}]

  clickMenuSubject$=new BehaviorSubject<boolean>(false);/*sujeto de bools que se activa al mostar las opciones*/
  clickMenu$:Observable<boolean>=this.clickMenuSubject$.asObservable();/*observable del sujeto de bools*/
  clickMenuSub!:Subscription /*subscripcion al observable de arriba*/
  clickSub:Subscription|null=null;/*subscripcion al servicio clickOut para poder desuscribirse luego*/
  constructor(private clickOutService:ClickOutService) { }
  
  clickShow(){
    this.clickMenuSubject$.next(!this.show)
  }
  clickSelect(feature:FeatureSelect){
    feature.select=!feature.select
  }
  documentClickListener(target: HTMLElement): void {
    const clickInside=this.selectComponent.nativeElement.contains(target);
    if (!clickInside){
      this.clickMenuSubject$.next(false);
    }
  }
  ngOnInit(): void {
    this.clickMenuSub=this.clickMenu$.pipe(
      tap(show=>{
        this.show=show
        if(show){
          this.clickSub=this.clickOutService.documentClickedTarget
          .subscribe(target=>this.documentClickListener(target));
        }else if(!show && this.clickSub!==null){
          this.clickSub.unsubscribe();
        }
      })
    ).subscribe();
  }
  ngOnDestroy(){
    this.clickMenuSub.unsubscribe();
  }
}
