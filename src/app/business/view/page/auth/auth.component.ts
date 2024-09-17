import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/service/OtherService/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { timer } from 'rxjs';
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
  fgPassword: FormGroup;
  isDisabledButtonLogin: boolean = false;

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
    }, error => {
      if(error.statusText == 'TOO MANY REQUESTS'){
        this.isDisabledButtonLogin = true;

        const minutes = 1;
        const seconds = minutes * 60;
        let remainingTime = seconds;
        let snackBarRef;

        snackBarRef = this.snackBar.open('Слишком много попыток, повторите через ' + minutes + ' минут', '', {
          duration: 999999999999,
        })

        const interval$ = timer(0, 1000).pipe(
          takeWhile(() => remainingTime > 0)
        ).subscribe( () => {
          remainingTime --;
          const minutesRemaining = Math.floor(remainingTime / 60);
          const secondsRemaining = remainingTime % 60;
          snackBarRef = this.snackBar.open(`Слишком много попыток, повторите через ${minutesRemaining} минут ${secondsRemaining} секунд`);
        },
          null,
          () => {
          // snackBarRef.dismiss();
          // this.isDisabledButtonLogin = false;
        });


        setTimeout(() => {
          interval$.unsubscribe(); // Завершите подписку
          snackBarRef.dismiss(); // Закрыть Snackbar
          this.isDisabledButtonLogin = false; // Включить кнопку
        }, seconds * 1000);

      } else{
        this.snackBar.open('Неизвестная ошибка сервера', '', {
          duration: 2500,
        })
      }
    })
  }
}
