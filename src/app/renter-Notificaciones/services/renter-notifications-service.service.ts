import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MyFavourites} from "../../my-favourites/model/my-favourites";
import {catchError, retry} from "rxjs/operators";
import {RenterNotification} from "../models/renterNotificationModel";

@Injectable({
  providedIn: 'root'
})
export class RenterNotificationsServiceService {
  //basePath = "http://localhost:8080/api/v1/notification"
  basePath = 'https://app-tsp-grupo2-erentcar-backend-230628210157.azurewebsites.net/' + "api/v1/notification";
//basePath = environment.baseUrlService + "api/v1/favourites"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      // Default error
      console.log(`An error occurred: ${error.error.message}`)
    }
    else {
      // Unsuccessful Response Error Code returned
      console.error(
        `Backend returned code ${error.status},
         body was ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  // Get All Favourite
  getAll(): Observable<RenterNotification> {
    return this.http.get<RenterNotification>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Favourite by Id
  getById(id: any): Observable<RenterNotification> {
    return this.http.get<RenterNotification>(`${ this.basePath }/${ id }`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Favourite by CarId
  getByClientId(clientId: any): Observable<RenterNotification> {
    return this.http.get<RenterNotification>(`${ this.basePath }/client/${ clientId }`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Create Favourite
  create(clientId: any, carId: any, item: any): Observable<RenterNotification> {
    return this.http.post<RenterNotification>(
      `${ this.basePath }?clientId=${ clientId }&carId=${ carId }`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Favourite
  delete(id: any): Observable<RenterNotification> {
    return this.http.delete<RenterNotification>(`${ this.basePath }/${ id }`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
