import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form: any = {
    username: null,
    email: null,
    password: null
  };

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.signupService.signUp(username, email, password).subscribe(
      ( response: string) => {
        console.log(response);
        location.replace('/signin');
      }
    )
  }
}
