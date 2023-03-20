import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomUser } from "../models/customUser";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getUsers():Observable<CustomUser[]>{
        return this.http.get<CustomUser[]>(`${this.apiServerUrl}/users/all`);
    }

    public createUser(user : CustomUser):Observable<CustomUser>{
        return this.http.post<CustomUser>(`${this.apiServerUrl}/users/add`, user);
    }

    public updateUser(user: CustomUser, userId: number):Observable<CustomUser>{
        return this.http.put<CustomUser>(`${this.apiServerUrl}/users/update/${userId}`, user);
    }
    
    public deleteUser(userId: number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
    }
}