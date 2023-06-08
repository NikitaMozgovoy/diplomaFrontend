import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment'
import {FilmDTO} from "../dto/FilmDTO";
import {FilmsListDTO} from "../dto/FilmsListDTO";

@Injectable({
    providedIn: 'root'
})
export class FilmService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

  public getFilms(limit:number, pageNumber: number):Observable<FilmsListDTO[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", limit);
    return this.http.get<FilmsListDTO[]>(`${this.apiServerUrl}/films/page/${pageNumber}`, {params:queryParams});
  }

  public getFilmById(id: number):Observable<FilmDTO>{
    return this.http.get<FilmDTO>(`${this.apiServerUrl}/films/${id}`);
  }

  public getSearchResults(query: string, limit: number, pageNumber: number):Observable<FilmsListDTO[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("query", "&name="+encodeURI(query));
    queryParams = queryParams.append("page", pageNumber);
    queryParams = queryParams.append("limit", limit);
    return this.http.get<FilmsListDTO[]>(`${this.apiServerUrl}/films/search`, {params:queryParams});
  }

  public getFilmsPagesQuantity(query: string, limit:number):Observable<number>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("query", "&name="+encodeURI(query));
    queryParams = queryParams.append("limit", limit);
    return this.http.get<number>(`${this.apiServerUrl}/films/pages`, {params:queryParams});
  }
}
