import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../../my-profile/services/client.service";
import {Plan} from "../../model/plan";

@Component({
  selector: 'app-show-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent implements OnInit {
  @Input() plans!: Plan[];
  @Input() myId!: number;
  @Input() myPlanId!: number;
  @Output() planStatusChangeCreate = new EventEmitter<string>() ;

  constructor(private clientService: ClientService) {

  }

  ngOnInit(): void { }

  updatePlanValueFromPlans(str: string) {
    this.planStatusChangeCreate.emit(str);
  }

  async addPlan(planId: any){
    /*await this.clientService.partialUpdate(this.myId, {"planId": planId}).subscribe((response: any) => {
       this.updatePlanValueFromPlans(response.planId);
    });*/
  }
  getCardColorClass(index: number): string {
    if (index === 0) {
      return 'gray-card';
    } else if (index === 1) {
      return 'blue-card';
    } else if (index === 2) {
      return 'golden-card';
    } else {
      return '';
    }
  }

}
