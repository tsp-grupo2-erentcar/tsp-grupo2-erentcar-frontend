import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {Car} from "../../model/car";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { v4 as uuid } from 'uuid';
import {RentCarService} from "../../services/rent-car.service";
import {MatLegacySnackBar as MatSnackBar} from "@angular/material/legacy-snack-bar";

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

  constructor(public dialogRef: MatDialogRef<RentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private rentCarService: RentCarService,
              private snackBar: MatSnackBar) {
    this.today = new Date();
    const day = this.today.getDate();
    const month = this.today.getMonth();
    const year = this.today.getFullYear();

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

    return `${day}/${month}/${year}`;
  }

  getPaymentAmount(): number {
    return this.getDaysDiff() * this.data.car.rentAmountDay;
  }

  rentCar(): void {
    const rent = {
      startDate: this.getDateFormat(this.date.value.start),
      finishDate: this.getDateFormat(this.date.value.end),
      paymentAmount: this.getPaymentAmount(),
      rate: 0
    }

    this.rentCarService.create(this.data.clientId, this.data.car.id, rent).subscribe((response: any) => {
      console.log(response);
    });

    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open("Successful rental!", "",{
      duration: 5000
    });
  }
}
