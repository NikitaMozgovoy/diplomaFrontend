import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Film } from "../models/film";

@Injectable({
    providedIn: 'root'
})
export class FilmService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getFilms():Observable<Film[]>{
        return this.http.get<Film[]>(`${this.apiServerUrl}/films`);
    }

    public createFilm(film : Film):Observable<Film>{
        return this.http.post<Film>(`${this.apiServerUrl}/films/add`, film);
    }

    public updateFilm(film: Film, filmId: number):Observable<Film>{
        return this.http.put<Film>(`${this.apiServerUrl}/films/update/${filmId}`, film);
    }
    
    public deleteFilm(filmId: number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/films/delete/${filmId}`);
    }

    public getFilmByUrl(filmUrl:string):Observable<Film>{
        return this.http.get<Film>(`${this.apiServerUrl}/films/${filmUrl}`);
    }
}