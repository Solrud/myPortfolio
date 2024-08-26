import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/service/OptionalService/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
  private password: string = 'mattheweb'

  fgPassword: FormGroup;
  // fcPassword: FormControl = new FormControl({value: null}, Validators.required);

  constructor(private authService: AuthService,
              private routerService: Router) {
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

    this.fgPassword.controls['password'].valueChanges.subscribe(value => {
      console.log(value)
      console.log(this.fgPassword.controls['password'].valid)
    })
  }

  onClickLogin():void {
    if (this.fgPassword.controls['password'].value === this.password)
      this.authService.loginAuthAdmin();
    this.routerService.navigate(['/admin'])
  }
}
