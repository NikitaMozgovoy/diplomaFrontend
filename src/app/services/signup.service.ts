import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  signUp(username: string, email: string, password: string) {
   return this.http.post<any>(this.apiServerUrl + '/auth/signup', {
      username,
      email,
      password
    })
  }
}
