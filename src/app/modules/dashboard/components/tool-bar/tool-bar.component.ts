import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ExpandedService } from '../../services/expanded.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  expanded!:boolean
  show:boolean=false
  constructor(private expandedService:ExpandedService) { 

  }
  clickToggle(){
    this.expanded=!this.expanded
    this.expandedService.expanded$.emit(this.expanded)
  }
  clickDropMenu(){
    this.show=!this.show
  }
  ngOnInit(): void {
    this.expandedService.expanded$.subscribe(response=>{
      this.expanded=response
    })
  }

}
