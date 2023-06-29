import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {Car} from "../../../search-car/model/car";
import {Language} from "../../model/language";
import {MatDialog as MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {EditProfileComponent, DialogProfileData } from '../edit-profile/edit-profile.component';
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

  constructor(public dialog: MatDialog,
              private router: Router,
              private clientService: ClientService,) {
    this.client = JSON.parse(localStorage.getItem("clientInfo") || "{}");
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
  }

  ngOnInit(): void {
  this.getCars()
  }
  getCars(){

    let clientId: string | null = localStorage.getItem('clientId');
    this.clientService.getById(clientId).subscribe(response=>{
      this.clientCars=response.cars
      console.log(this.clientCars)
      console.log("aaaa")

    })
  }
  handleSize(event: Event) {
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
  }
  openEditProfile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: "400px",
      data: {
        clientId: localStorage.getItem('clientId'),
        client : JSON.parse(localStorage.getItem("clientInfo") || "{}"),
      }
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response !== undefined) {
        console.log("Worked!");
      }
    })
  }

  getMoreInformationCarUrl(carId: number) {
    return `${this.router.url}/car/${carId}`;
  }
}
