import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/service/OptionalService/auth.service";
import {Router} from "@angular/router";
import {ApiBackendService} from "../../../data/service/OptionalService/api-backend.service";

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
              private routerService: Router,
              private apiService: ApiBackendService) {
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
    this.apiService.checkPassword(tryPassword).subscribe( result => {
      if (result.result)
        this.authService.loginAuthAdmin();

      this.routerService.navigate(['/admin'])
    })
  }
}
