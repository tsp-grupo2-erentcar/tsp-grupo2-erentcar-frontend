import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpandedService {
  /*expanded:boolean=true*/
  expanded$=new EventEmitter<boolean>(true)
  constructor() { }
}
