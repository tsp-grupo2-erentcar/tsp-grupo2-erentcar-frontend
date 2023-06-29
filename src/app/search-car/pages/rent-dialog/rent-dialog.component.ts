import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef as MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../model/car";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { v4 as uuid } from 'uuid';
import {RentCarService} from "../../services/rent-car.service";
import {MatSnackBar as MatSnackBar} from "@angular/material/snack-bar";
import {RenterNotification} from "../../../renter-Notificaciones/models/renterNotificationModel";
import {
  RenterNotificationsServiceService
} from "../../../renter-Notificaciones/services/renter-notifications-service.service";

export interface DialogData {
  car: Car;
  clientId: string;
}

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrls: ['./rent-dialog.component.css']
})
export class RentDialogComponent implements OnInit {
  date: UntypedFormGroup;
  today: Date;
  monthString: string;
  dayString: string;
  notification: RenterNotification = {
    id: 0,
    carId: 0,
    message:"Se ah rentado el auto correctamente",
    tittle:"Alerta de renta",
  }
  constructor(public dialogRef: MatDialogRef<RentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private rentCarService: RentCarService,
              private notificationService: RenterNotificationsServiceService,
              private snackBar: MatSnackBar) {
    this.today = new Date();
    const day = this.today.getDate();
    const month = this.today.getMonth();
    const year = this.today.getFullYear();
    this.monthString = '';
    this.dayString = '';
    this.date = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, day)),
      end: new UntypedFormControl(new Date(year, month, day))
    });
  }

  ngOnInit(): void {
  }

  getDaysDiff(): number {
    const startDate: Date = this.date.value.start;
    const finishDate: Date = this.date.value.end ? this.date.value.end : this.date.value.start;
    return Math.floor(Math.abs(<any>startDate - <any>finishDate) / (1000*60*60*24)) + 1;
  }

  getDateFormat(date: Date): string {
    if (date === null) return "";

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10){
      this.monthString = '0' + month;
    } else {
      this.monthString = '' + month;
    }
    if (day < 10){
      this.dayString = '0' + day;
    } else {
      this.dayString = '' + day;
    }
    return `${year}-${this.monthString}-${this.dayString}`;
  }

  getPaymentAmount(): number {
    return this.getDaysDiff() * this.data.car.rentAmountDay;
  }

  rentCar(): void {
    const rent = {
      startDate: this.getDateFormat(this.date.value.start),
      finishDate: this.getDateFormat(this.date.value.end),
      amount: this.getPaymentAmount(),
      rate: 1
    }
    console.log(rent);
    this.rentCarService.create(this.data.clientId, this.data.car.id, rent).subscribe((response: any) => {
      console.log(response);
      this.addNotification();
    });

    this.openSnackBar();
  }
  addNotification() {
    this.notification.carId = Number(this.data.car.id);
    //this.notification.clientId = Number(this.data.clientId);

    const newFav = {
      clientId:Number(this.data.clientId),
      carId:Number(this.data.car.id),
      message: this.notification.message,
      tittle: this.notification.tittle
    }

    this.notificationService.create(Number(this.data.clientId), Number(this.data.car.id), newFav).subscribe((response: any) => {
      //this.isFavourite = true;
      this.notification = response;

      // Agregar el item al localStorage
      let value = localStorage.getItem('clientInfo');
      let client = typeof value === "string" ? JSON.parse(value) : "";
      console.log(client)
      client.notifications.push(this.notification);
      localStorage.setItem("clientInfo", JSON.stringify(client));
    })
  }

  openSnackBar() {
    this.snackBar.open("Successful rental!", "",{
      duration: 5000
    });
  }
}
