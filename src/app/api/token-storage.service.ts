import { Injectable } from '@angular/core';
import {ClientService} from "../my-profile/services/client.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const CLIENT_ID = 'clientId';
const CLIENT_INFO = "clientInfo";

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  constructor( private clientService: ClientService,) { }
  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.clientService.getByUserId(Number(user.id)).subscribe((response: any) => {
      window.localStorage.setItem(CLIENT_ID, JSON.stringify(response.id));
      console.log('el cliente id es '+localStorage.getItem('clientId'));
    })
    console.log(localStorage.getItem('clientId'));
  }
  public saveClientInfo(client: any): void {
    window.localStorage.setItem(CLIENT_INFO, JSON.stringify(client));
  }
  public getUser = () => JSON.parse(<string>sessionStorage.getItem(USER_KEY));
}
