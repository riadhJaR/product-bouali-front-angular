import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import {CodeInputModule} from 'angular-code-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CodeInputModule,CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {


  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private  router : Router,
    private authService: AuthenticationService
  ){

  }

  onCodeCompleted(token : string){
  this.confirmAccount(token);
  }
  confirmAccount(tokenValue: string) {
    this.authService.confirm({
      token : tokenValue
    }).subscribe({
      next: () => {
        this.message = 'Your account has benn suuccessfully activated . \n Now you can procced to login!';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () =>{
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
    }
}
