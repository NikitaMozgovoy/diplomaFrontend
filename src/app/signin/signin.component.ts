import { Component } from '@angular/core';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private signinService: SigninService) { }

  onSubmit(): void {
    const { username, password } = this.form;
    this.signinService.signin(username, password).subscribe(
      data => {
        this.isLoggedIn = true;
        window.location.href = '/';
      },
      err => {
        alert(err.message);
      }
    );
  }

  redirectToProfile() {
    window.location.href = '/';
  }

}
