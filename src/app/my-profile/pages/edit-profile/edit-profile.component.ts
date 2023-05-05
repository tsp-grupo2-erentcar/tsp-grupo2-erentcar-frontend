import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from "../../model/client";
import {ClientService} from "../../services/client.service";

export interface DialogProfileData {
  client: Client;
  clientId : string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  client !: Client;
  clientId !: string;

  url="./assets/users-images/";
  constructor(@Optional() @Inject(MAT_DIALOG_DATA)public data: DialogProfileData,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private clientService: ClientService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // openEditProfile(): void {
  //   const dialogRef = this.dialog.open(EditProfileComponent, {
  //     width: "400px",
  //     data: {
  //       clientId: localStorage.getItem('clientId'),
  //       client : JSON.parse(localStorage.getItem("clientInfo") || "{}"),
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((response: any) => {
  //     if (response !== undefined) {
  //       console.log("Worked!");
  //     }
  //   })
  // }

  cancel(){
    this.dialogRef.close();
  }

  confirm() {
    console.log('clientId:', this.data.clientId);
    console.log('client:', this.data.client);
      this.clientService.update(this.data.client.id, this.data.client).subscribe((response: any) => {
        console.log(response);
      });
  }

  onselectFile(image: any) {
    if (image.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(image.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }
  }
}


