import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {Car} from "../../../search-car/model/car";
import {Language} from "../../model/language";
import {MatDialog as MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  client !: Client;
  clientCars !: Car[];
  clientLanguages !: Language[];
  breakpoint: number;
  client_data: {};
  constructor(public editProfile: MatDialog,
              private router: Router,
              private clientService: ClientService) {
    this.client = JSON.parse(localStorage.getItem("clientInfo") || "{}");
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
    this.client_data = {};
  }

  getClientInfo(){
    this.clientService.getById(localStorage.getItem("clientId")).subscribe((response:any) =>{
      this.client_data = response.content;
      console.log(this.client_data);
    })
  }
  ngOnInit(): void {
    console.log(localStorage.getItem("clientInfo"));
    this.getClientInfo();
  }


  handleSize(event: Event) {
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
  }

  getMoreInformationCarUrl(carId: number) {
    return `${this.router.url}/car/${carId}`;
  }
}
