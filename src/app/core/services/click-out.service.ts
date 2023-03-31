import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickOutService {
  documentClickedTarget:Subject<HTMLElement>=new Subject<HTMLElement>();
  /*creo que es un observable que emite un elemento html*/
  constructor() { }
}
