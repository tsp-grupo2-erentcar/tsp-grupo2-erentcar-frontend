import { Component } from '@angular/core';
import { RenterNotification } from '../../models/renterNotificationModel';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDetailsComponent } from '../../dialogs/notificationDetails/notification-details/notification-details.component';
import { MatDialogRef } from '@angular/material/dialog';
import {RenterNotificationsServiceService} from "../../services/renter-notifications-service.service";

@Component({
  selector: 'app-renter-notifications',
  templateUrl: './renter-notifications.component.html',
  styleUrls: ['./renter-notifications.component.css']
})
export class RenterNotificationsComponent {
  notifications: any;
  clientId!: string | null;
  constructor(private dialog: MatDialog,private notificationService: RenterNotificationsServiceService,) {
    this.clientId = localStorage.getItem('clientId');
  }
  getNotifications(){
    /*const response: RenterNotification[] = [
      { id: 1, carId: 1, message: "Your Mazda is receiving a Solictude to Be rented", tittle: "Reservation Solicitude" },
      { id: 2, carId: 2, message: "Your BMW is receiving a Solictude to Be rented", tittle: "Reservation Solicitude" },
      { id: 3, carId: 3, message: "Your TOYOTA is receiving a Solictude to Be rented", tittle: "Reservation Solicitude" },
      { id: 4, carId: 4, message: "Your SUSUKI is receiving a Solictude to Be rented", tittle: "Reservation Solicitude" }
    ];
    return response;*/
    let renterNotifications: any;
    this.notificationService.getByClientId(this.clientId).subscribe((response) =>{
      renterNotifications = response;
      this.notifications = renterNotifications.content;
      console.log(renterNotifications)
    })

  }
  openDialog(notification: any) {
    const dialogRef = this.dialog.open(NotificationDetailsComponent, {
      width: '400px',
      data: notification.id
    });


  }
  onDecline() {
    this.dialog.closeAll();
  }
  onAccept() {
    this.dialog.closeAll();
  }


  ngOnInit(): void {
    this.getNotifications();
  }
}
