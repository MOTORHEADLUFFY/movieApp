import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { UserSelectedService } from '../services/user-selected.service';
import { Movies } from 'src/app/Interfaces';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  allGenres = [];
  allMovies = [];
  displayList = [];
  recentlyReleased = [];
  highestRated = [];
  selectedValue = '';
  searchText = '';
  genreMovies = new Map<string, Movies[]>();
  selectedHashMap = new Map<number, Movies>();
  constructor(
    public moviesFetch: MovieServiceService,
    public playList: UserSelectedService
  ) { }
  ngOnInit() {
    this.allGenres = [];
    this.allMovies = [];
    this.genreMovies = new Map<string, Movies[]>();
    if (this.playList.genreSelected === '') {
      this.moviesFetch.fetchRecords().subscribe((data: Movies[]) => {
        const genreMap = new Map<string, boolean>();
        for (const movie of data) {
          this.allMovies.push(movie);
          for (const genre of movie.genres) {
            if (!genreMap.get(genre)) {
              genreMap.set(genre, true);
              this.allGenres.push(genre);
            }
            if (this.genreMovies.get(genre)) {
              this.genreMovies.get(genre).push(movie);
            } else {
              const x: Movies[] = [];
              this.genreMovies.set(genre, x);
            }
          }
        }
      });
      console.log(this.genreMovies);
      this.selectedHashMap = this.playList.selectedHashMap;
      this.playList.allGenres = this.allGenres;
      this.playList.allMovies = this.allMovies;
      this.playList.genreMovies = this.genreMovies;
    } else {
      this.selectedValue = this.playList.genreSelected;
      this.allGenres = this.playList.allGenres;
      this.allMovies = this.playList.allMovies;
      this.genreMovies = this.playList.genreMovies;
      this.selectedHashMap = this.playList.selectedHashMap;
      this.onChange();
      if (this.playList.searchText !== '') {
        this.searchText = this.playList.searchText;
        this.onSearch();
      }
    }
  }

  onChange() {
    this.playList.genreSelected = this.selectedValue;
    console.log(this.genreMovies);
    console.log(this.selectedValue);
    this.displayList = JSON.parse(JSON.stringify(this.genreMovies.get(this.selectedValue)));
    this.recentlyReleased = JSON.parse(JSON.stringify(this.genreMovies.get(this.selectedValue)));
    this.highestRated = JSON.parse(JSON.stringify(this.genreMovies.get(this.selectedValue)));

    this.recentlyReleased.sort((val1, val2) => {
      return <any>new Date(val2.releaseDate) - <any>new
        Date(val1.releaseDate);
    });

    this.highestRated.sort((val1, val2) => {
      return +val2.imdbRating - +val1.imdbRating;
    });
    console.log(this.highestRated);
    this.highestRated = this.highestRated.slice(0, 10);
    this.recentlyReleased = this.recentlyReleased.slice(0, 10);
  }

  onSearch() {
    this.playList.searchText = this.searchText;
    const query = this.searchText.toLowerCase();
    const copy = JSON.parse(JSON.stringify(this.allMovies));
    this.displayList = copy.filter(row => {
      let columns = Object.keys(row);
      columns = ['title', 'imdbRating', 'actors', 'genres'];
      return (
        columns
          .map(column => {
            return row[column];
          })
          .toString()
          .toLowerCase()
          .indexOf(query) > -1
      );
    });
  }

  selectForPlayList(movie: Movies) {
    if (this.selectedHashMap.get(movie.id)) {
      this.selectedHashMap.delete(movie.id);
    } else {
      this.selectedHashMap.set(movie.id, movie);
    }
    this.playList.selectedMovies = Array.from(this.selectedHashMap.values());
  }
}
