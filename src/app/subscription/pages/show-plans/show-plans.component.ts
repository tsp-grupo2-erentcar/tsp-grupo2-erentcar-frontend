import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../../my-profile/services/client.service";
import {Plan} from "../../model/plan";
import {PlansService} from "../../services/plans.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent implements OnInit {
  plans:any;
  @Output() planStatusChangeCreate = new EventEmitter<string>() ;
  clientData:any
  constructor(private clientService: ClientService, private subscriptionService:PlansService,private router: Router) {

  }

  ngOnInit(): void {
    this.retrieveClient()
    this.retrievePlans()
  }

  updatePlanValueFromPlans(str: string) {
    this.planStatusChangeCreate.emit(str);
  }
  retrieveClient(): void {
    let clientId: string | null = localStorage.getItem('clientId');

    this.clientService.getById(clientId).subscribe((response: any) => {
      this.clientData = response;
    });
  }
  retrievePlans() {

    this.subscriptionService.getAll().subscribe( (response)=>{
      console.log(response)
      this.plans=response.content
    }  );
  }

  async addPlan(planId: any){
    let clientId: string | null = localStorage.getItem('clientId');
    await this.clientService.updatePlan(
      clientId,
      planId,
      this.clientData
      ).subscribe((response: any) => {
       this.updatePlanValueFromPlans(response.planId);
    });
    this.router.navigate(['/client/subscription']);
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
