import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/service/OtherService/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
  fgPassword: FormGroup;

  constructor(private authService: AuthService,
              private routerService: Router,
              private snackBar: MatSnackBar) {
  }

  public get Validators(){
    return Validators;
  }

  ngOnInit() {
    this.fgPassword = new FormGroup({
      password: new FormControl({value: null}, Validators.required)
    }
    )
    this.fgPassword.controls['password'].setValue('')
  }

  onClickLogin():void {
    const tryPassword = this.fgPassword.controls['password'].value
    this.authService.login$(tryPassword).subscribe(result => {
      if (result)
        localStorage.setItem('access_token', result);
      else{
        this.snackBar.open('Неверный пароль', '', {
          duration: 1500,
        })
      }

      this.routerService.navigate(['/admin'])
    })
  }
}
