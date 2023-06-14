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
  plans!: Plan[];
  clientData!: Client;

  constructor(
    private subscriptionService: PlansService,
    private clientService: ClientService,
  )  {
    this.clientData = {} as Client;
  }

  ngOnInit(): void {
    this.retrievePlans();
    this.retrieveClient();
  }

  retrieveClient(): void {
    let clientId: string | null = localStorage.getItem('clientId');

    this.clientService.getById(clientId).subscribe((response: any) => {
      this.clientData = response;
    });
  }

  retrievePlans() {
    this.plans= [
      {
        id: 1,
        name: "Basic Plan",
        price: 9.99,
        benefits: ["Feature 1", "Feature 2", "Feature 3","Feature 4"],
        image: "path/to/basic_plan_image.jpg",
      },
      {
        id: 2,
        name: "Standard Plan",
        price: 19.99,
        benefits: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        image: "path/to/standard_plan_image.jpg",
      },
      {
        id: 3,
        name: "Premium Plan",
        price: 29.99,
        benefits: ["Feature 1", "Feature 2", "Feature 3", "Feature 4" ],
        image: "path/to/premium_plan_image.jpg",
      },
    ];
  }

  deletePlanStatusChange(ev: any) {
    this.clientData.planId = ev;
  }

  createPlanStatusChange(ev: any) {
    this.clientData.planId = ev;
  }
}
