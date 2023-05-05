import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

//const AUTH_API = environment.production ? 'https://erentcar.herokuapp.com/api/v1/users/auth/' : 'http://localhost:8080/api/v1/users/auth/';
const baseURL = 'https://tsp-grupo2-erentcar-backend-production.up.railway.app/';
//const baseURL = environment.baseUrlService;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {
    return this.http.post(baseURL+"api/v1/users/auth/" + 'sign-in', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  register(user: any): Observable<any> {
    return this.http.post(baseURL+"api/v1/users/auth/" + 'sign-up', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
