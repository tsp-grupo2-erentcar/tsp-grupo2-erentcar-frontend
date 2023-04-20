import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Comment} from "../model/comment";
import {catchError, retry} from "rxjs/operators";
import {Language} from "../model/language";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //basePath = "https://tsp-grupo2-erentcar-backend-production.up.railway.app/api/v1/clientLanguages";
  basePath = environment.baseUrlService + "api/v1/clientLanguages";

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

  getAll(): Observable<Language> {
    return this.http.get<Language>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getLanguagesByIdClient(id: any): Observable<Language> {
    return this.http.get<Language>(`${this.basePath}/${id}/clientLanguages`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
