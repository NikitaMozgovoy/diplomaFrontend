import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/UserModel";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import {UserDTO} from "../dto/UserDTO";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getUserById(userId:number):Observable<UserDTO>{
        return this.http.get<UserDTO>(`${this.apiServerUrl}/users/${userId}/profile`);
    }
}
