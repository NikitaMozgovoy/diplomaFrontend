import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  updateFilmFunction = new EventEmitter();
  subsVar: Subscription | undefined;

  constructor() { }

  updateFilmFromReviews() {
    this.updateFilmFunction.emit();
  }
}
