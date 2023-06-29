import {Component, OnInit} from '@angular/core';
import {PlansService} from "../../services/plans.service";
import {Plan} from "../../model/plan";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../my-profile/services/client.service";
import {Client} from "../../../my-profile/model/client";
import {Parser} from "@angular/compiler";


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plans!: any;
  clientData!: Client;

  constructor(
    private subscriptionService: PlansService,
    private clientService: ClientService,
  )  {
    this.clientData = {} as Client;
  }

  ngOnInit(): void {
    this.retrieveClient();
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

  deletePlanStatusChange(ev: any) {
    this.clientData.planId = ev;
  }

  createPlanStatusChange(ev: any) {
    this.clientData.planId = ev;
  }
}
