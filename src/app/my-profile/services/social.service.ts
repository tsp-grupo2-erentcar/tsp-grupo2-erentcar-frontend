import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Language} from "../model/language";
import {catchError, retry} from "rxjs/operators";
import {Social} from "../model/social";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  basePath = "https://app-tsp-grupo2-erentcar-backend-230628210157.azurewebsites.net/api/v1/clientSocialNetworks";
  //basePath = environment.baseUrlService + "api/v1/clientSocialNetworks";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type" : "application/json"
    })
  }
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError("Something happened with request, please try again later");
  }

  getAll(): Observable<Social> {
    return this.http.get<Social>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getSocialNetworksByIdClient(id: any): Observable<Social> {
    return this.http.get<Social>(`${this.basePath}/${id}/clientSocialNetworks`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
