import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CustomUser } from '../models/customUser';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import {FilmDTO} from "../dto/FilmDTO";
import {FilmsListDTO} from "../dto/FilmsListDTO";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{

  public films!: FilmsListDTO[];
  public apiServerUrl! : string;

  constructor(private filmService: FilmService){};

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.getFilms(1);
  }

  public getFilms(pageNumber: number): void{
    this.filmService.getFilms(pageNumber).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: FilmsListDTO[]) => {
          console.log(response);
          this.films=response}
      }
    )
  }
}
