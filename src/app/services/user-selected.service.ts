import { Injectable } from '@angular/core';
import { Movies } from 'src/app/Interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserSelectedService {

  selectedMovies: Movies[] = [];
  selectedHashMap = new Map<number, Movies>();
  genreSelected = '';
  allGenres = [];
  allMovies = [];
  genreMovies = new Map<string, Movies[]>();
  searchText = '';
  constructor() { }
}
