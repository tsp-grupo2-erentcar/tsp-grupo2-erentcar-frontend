import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../../my-profile/services/client.service";
import {PlansService} from "../../services/plans.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-my-subscription',
  templateUrl: './card-my-subscription.component.html',
  styleUrls: ['./card-my-subscription.component.css']
})
export class CardMySubscriptionComponent implements OnInit {
  @Input() myId!: number;
  @Input() myPlanId!: number;
  @Output() planStatusChangeDelete = new EventEmitter<string>() ;

  plan: any;
  clientData:any;
  constructor(
    private clientService: ClientService,
    private subscriptionService: PlansService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('llegoaui')
     this.retrieveClient();

  }

  updatePlanValueFromMySubscription(str: string) {
    this.planStatusChangeDelete.emit(str);
  }

  async deletePlan(){
    this.router.navigate(['/client/all-subscriptions']);
  }

   retrieveClient() {
    let clientId: string | null = localStorage.getItem('clientId');
    console.log(clientId)
    this.clientService.getById(clientId).subscribe((response: any) => {
      this.clientData = response;
      this.retrieveMyPlan(this.clientData.planId);
    });
  }
   retrieveMyPlan(id: any) {
     this.subscriptionService.getById(id).subscribe((response: any) => {
      this.plan = response;
    });

  }

  createPlanStatusChange(ev: any) {
    this.clientData.planId = ev;
  }
  getCardColorClass(plan:any){
    if (plan.name==='BASIC') {
      return 'gray-card';
    } else if (plan.name==='STANDAR') {
      return 'blue-card';
    } else if (plan.name==='PREMIUN') {
      return 'golden-card';
    } else {
      return '';
    }
  }
}
