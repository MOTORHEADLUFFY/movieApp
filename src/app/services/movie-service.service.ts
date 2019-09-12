import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Movies } from '../Interfaces';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  genres = [];
  constructor(
    private http: HttpClient,
  ) { }

  fetchRecords(): Observable<Movies[]> {
    return this.http.get<Movies[]>('https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-in-theaters.json'
    );
  }
}
