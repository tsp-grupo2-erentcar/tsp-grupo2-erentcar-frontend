import { Component, OnInit, HostListener } from '@angular/core';
import { ExpandedService } from '../../services/expanded.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expanded!:boolean
  constructor(private expandedService:ExpandedService) {
    this.updateExpanded();
  }
  @HostListener("window:resize",[])updateExpanded(){
    if(window.innerWidth>1024 ){
      this.expandedService.expanded$.emit(true)
      this.expanded=true
    }else if(window.innerWidth<=1024 ){
      this.expandedService.expanded$.emit(false)
      this.expanded=false
    }
  }
  ngOnInit(): void {
    this.expandedService.expanded$.subscribe(response=>{
      this.expanded=response
    })
  }

}
