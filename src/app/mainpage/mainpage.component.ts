import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CustomUser } from '../models/customUser';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{
  // public users!: CustomUser[];
  // public apiServerUrl! : string;
  // title: any;

  // constructor(private userService: UserService){};

  // ngOnInit(): void {
  //   this.apiServerUrl = environment.apiBaseUrl;
  //   this.getUsers();
  // }
  
  // public getUsers(): void{
  //   this.userService.getUsers().subscribe(
  //     {
  //       error: (err: HttpErrorResponse) => {alert(err.message)},
  //       next: (response: CustomUser[]) => {this.users=response}
  //     }
  //   )
  // }
  
  // onSave(id: number, user: CustomUser) {
  //   console.log(user);
  //   this.userService.updateUser(user, id); 
  // }

  // public onUpdate(userId: number, updateForm: NgForm) :void {
  //   this.userService.updateUser(updateForm.value, userId).subscribe(
  //     (response: CustomUser) => {
  //       console.log(response);
  //       this.getUsers();
  //     },
  //     (error: HttpErrorResponse) =>{
  //       alert(error.message);
  //     }
  //   );
  // }

  // public onCreate(createForm: NgForm) :void {
  //   this.userService.createUser(createForm.value).subscribe(
  //     (response: CustomUser) => {
  //       console.log(response);
  //       this.getUsers();
  //     },
  //     (error: HttpErrorResponse) =>{
  //       alert(error.message);
  //     }
  //   );
  // }

  public films!: Film[];
  public apiServerUrl! : string;

  constructor(private filmService: FilmService){};

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.getFilms();
  }

  public getFilms(): void{
    this.filmService.getFilms().subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: Film[]) => {this.films=response}
      }
    )
  }
}
