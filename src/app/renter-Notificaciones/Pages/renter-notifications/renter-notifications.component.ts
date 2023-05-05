import { Component } from '@angular/core';
import { RenterNotification } from '../../models/renterNotificationModel';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDetailsComponent } from '../../dialogs/notificationDetails/notification-details/notification-details.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-renter-notifications',
  templateUrl: './renter-notifications.component.html',
  styleUrls: ['./renter-notifications.component.css']
})
export class RenterNotificationsComponent {
  notifications: any;
  constructor(private dialog: MatDialog) {}
  getNotifications(): RenterNotification[] {
    const response: RenterNotification[] = [
      { id: 1, carId: 1, message: "Your Mazda is receiving a Solictude to Be rented", title: "Reservation Solicitude" },
      { id: 2, carId: 2, message: "Your BMW is receiving a Solictude to Be rented", title: "Reservation Solicitude" },
      { id: 3, carId: 3, message: "Your TOYOTA is receiving a Solictude to Be rented", title: "Reservation Solicitude" },
      { id: 4, carId: 4, message: "Your SUSUKI is receiving a Solictude to Be rented", title: "Reservation Solicitude" }
    ];
  
    return response;
  }
  openDialog(notification: RenterNotification) {
    const dialogRef = this.dialog.open(NotificationDetailsComponent, {
      width: '400px',
      data: notification.carId
    });
  
   
  }
  onDecline() {
    this.dialog.closeAll();
  }
  onAccept() {
    this.dialog.closeAll();
  }
  
  
  ngOnInit(): void {
    this.notifications=this.getNotifications();
  }
}
