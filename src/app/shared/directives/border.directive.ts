import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {
  @HostBinding('style.border-radius')
  borderRadius:string|null=null

  @HostBinding('style.border-right')
  borderRight:string|null=null

  @HostBinding('style.border-left')
  borderLeft:string|null=null

  @Input() set appBorder(value:string|null){
    this.borderRadius=value
  }
  @Input() set appBorderRight(value:string|null){
    this.borderRight=value
  }
  @Input() set appBorderLeft(value:string|null){
    this.borderLeft=value
  }

  constructor() {}

}
