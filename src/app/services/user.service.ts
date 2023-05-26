import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/UserModel";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getUsers():Observable<UserModel[]>{
        return this.http.get<UserModel[]>(`${this.apiServerUrl}/users/all`);
    }

    public createUser(user : UserModel):Observable<UserModel>{
        return this.http.post<UserModel>(`${this.apiServerUrl}/users/add`, user);
    }

    public updateUser(user: UserModel, userId: number):Observable<UserModel>{
        return this.http.put<UserModel>(`${this.apiServerUrl}/users/update/${userId}`, user);
    }

    public deleteUser(userId: number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
    }

    public getUserById(userId:number):Observable<UserModel>{
        return this.http.get<UserModel>(`${this.apiServerUrl}/users/find/${userId}`);
    }
}
