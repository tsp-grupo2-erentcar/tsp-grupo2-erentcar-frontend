import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../my-profile/services/client.service";
import {AuthService} from "../../../api/auth.service";
import {TokenStorageService} from "../../../api/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  wrongEmailOrPassword: Boolean = false;
  showPassword: Boolean = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  clientId!: string | null;

  constructor(private router: Router,
              private formBuilder: UntypedFormBuilder,
              private clientService: ClientService,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
  ) {
    this.form = formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  submit(): void {
    if (this.form.valid) {
      //console.log({username: this.form.value.userName, password: this.form.value.password});
      this.authService.login({username: this.form.value.userName, password: this.form.value.password}).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.resource.token);
          this.tokenStorageService.saveUser(data.resource);
          this.clientService.getByUserId(Number(data.resource.id)).subscribe((response: any) => {
            window.localStorage.setItem('clientId', JSON.stringify(response.id));
            this.clientId = localStorage.getItem('clientId');
            this.clientService.getById(Number(this.clientId)).subscribe((response: any) => {
              this.tokenStorageService.saveClientInfo(response);
            })
          })
          console.log(localStorage.getItem('clientInfo'));
          console.log('aqui esta entrando? '+ this.clientId);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorageService.getUser().roles;
          this.router.navigateByUrl("/client/search");
        },
        error => {
          this.errorMessage = error.error.errorMessage;
          this.isLoginFailed = true;
        }
      );


    }
  }
}
