import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RenterNotificationsComponent } from 'src/app/renter-Notificaciones/Pages/renter-notifications/renter-notifications.component';
import { Car } from 'src/app/search-car/model/car';
import {RenterNotificationsServiceService} from "../../../services/renter-notifications-service.service";
import {ClientService} from "../../../../my-profile/services/client.service";
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent {
  car:any;
  client:any;
  cars: Car[] = [
    {
      id: 1,
      address: '123 Main St',
      year: 2019,
      mileage: 15000,
      seating: 5,
      manual: false,
      carValueInDollars: 25000,
      extraInformation: 'Includes GPS and sunroof',
      rate: 4.8,
      rentAmountDay: 75,
      imagePath: 'https://phantom-marca.unidadeditorial.es/be7c065dc4f3e0fc4b368c6ac4507a8f/crop/0x0/1978x1318/resize/1320/f/jpg/assets/multimedia/imagenes/2023/04/15/16815429230718.jpg',
      category: 'Sedan',
      mechanicConditions: 'Excellent',
      carModel: {id: 1, name: 'Mazda'},
      clientId: 100
    },
    {
      id: 2,
      address: '456 Oak St',
      year: 2020,
      mileage: 10000,
      seating: 7,
      manual: true,
      carValueInDollars: 35000,
      extraInformation: 'Includes DVD player and navigation',
      rate: 4.5,
      rentAmountDay: 100,
      imagePath: 'https://cosystatic.bmwgroup.com/bmwweb/cosySec?COSY-EU-100-2545xM4RIyFnbm9Mb3AgyyIJrjG0suyJRBODlsrjGpuaprQbhSIqppglBgSwQJl384MlficYiGHqoQxYLW7%25f3tiJ0PCJirQbLDWcQW7%251uSJUqoQh47wMvcYi9h5aJMb3islBglUbv8cRScH8emMbnMdoIayJGy53LUrQ%25r9RXsW8zWubxMqogqaFH8l3ilUjJmcRScH7o3MbnMd03YyJGx030yJGy5B31rQ%25r9YicW8zWunUUqogqaGbHl3ilU%25JjcRScHzoBMbnMdg30yJGy5iS3rQ%25r9SnJW8zWunDRqogqaGJ8l3ilU%25D8cRScHzwmMbnMdgbOyJGy5iJQrQ%25r9S1aW8zWunmCqogqaGs0l3ilUC7JcRScH4g7MbnMdeooyJGy5m3SrQ%25r9sRNW8zWuKbYqogqaDJKl3ilUCQIcRScH4%25bMbnMdJ9oyJGy5QoarQ%25r98KGW8zWuob9qogqa3Jal3ilURQGcRScHb8VMbnMdJoJyJGy5Q32rQ%25r98StW8zWuo9bqogqa3uDl3ilURaZcRScHbRfMbnMdJCeyJGy5Q4ErQ%25r98vSW8zWuuaRqogqaaUFl3ilUU6ucRScHHrsMb37ur1MESZrMcRoHSWRzMES208bq2b7uRI',
      category: 'SUV',
      mechanicConditions: 'Good',
      carModel: {id: 2, name: 'BMW'},
      clientId: 101
    },
    {
      id: 3,
      address: '789 Pine St',
      year: 2018,
      mileage: 20000,
      seating: 4,
      manual: false,
      carValueInDollars: 20000,
      extraInformation: 'Includes leather seats and backup camera',
      rate: 4.2,
      rentAmountDay: 60,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/2021_Toyota_Corolla_SE_Hatchback.jpg/800px-2021_Toyota_Corolla_SE_Hatchback.jpg',
      category: 'Coupe',
      mechanicConditions: 'Fair',
      carModel: {id: 3, name: 'TOYOTA'},
      clientId: 102
    },
    {
      id: 4,
      address: '789 Pine St',
      year: 2018,
      mileage: 20000,
      seating: 4,
      manual: false,
      carValueInDollars: 20000,
      extraInformation: 'Includes leather seats and backup camera',
      rate: 4.2,
      rentAmountDay: 60,
      imagePath: 'https://derco-pe-prod.s3.amazonaws.com/images/models/2023-02-14-Pendiente%20%281%29.jpg',
      category: 'Coupe',
      mechanicConditions: 'Fair',
      carModel: {id: 3, name: 'SUSUKI'},
      clientId: 102
    },
    {
      id: 5,
      address: '789 Pine St',
      year: 2018,
      mileage: 20000,
      seating: 4,
      manual: false,
      carValueInDollars: 20000,
      extraInformation: 'Includes leather seats and backup camera',
      rate: 4.2,
      rentAmountDay: 60,
      imagePath: 'https://img.freepik.com/premium-psd/sport-car-transparent-background-3d-rendering-illustration_494250-40917.jpg',
      category: 'Coupe',
      mechanicConditions: 'Fair',
      carModel: {id: 3, name: 'FERRARI'},
      clientId: 102
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<RenterNotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public notificationId: number,
    private notificationService: RenterNotificationsServiceService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    let renterNotification: any;
    console.log(localStorage.getItem('auth-user'))
    this.notificationService.getById(Number(this.notificationId)).subscribe((response: any) => {
      //this.isFavourite = true;
      renterNotification = response;
      console.log(renterNotification)
      this.car = renterNotification.car

      //this.clientService.getById(Number(renterNotification.clientId)).subscribe((response: any) =>{
        //console.log((response))
      //})
    })
  }
  onAcceptClick(): void {
    // perform accept action
    this.dialogRef.close();
  }

  onDeclineClick(): void {
    // perform decline action
    this.dialogRef.close();
  }

  getCarDetail(carId:number):void{
    this.car=this.cars.find(a => a.id === carId);
  }
}
