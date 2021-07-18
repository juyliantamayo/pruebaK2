import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new FormControl('', [Validators.required, Validators.nullValidator,Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  login() {
    this.loginService.signIn(this.user.value, this.password.value)
  }

}
