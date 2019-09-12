import { Component, OnInit } from '@angular/core';
import { UserSelectedService } from '../services/user-selected.service';
import { Movies } from 'src/app/Interfaces';

const PAGE_LIMIT = 5;
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})

export class MoreComponent implements OnInit {

  selectedValue = '';
  displayList: Movies[] = [];
  segmentedList: Movies[] = [];
  genreMovies = new Map<string, Movies[]>();
  index = 0;
  paginator = [];
  constructor(public playList: UserSelectedService) { }

  ngOnInit() {
    this.selectedValue = this.playList.genreSelected;
    this.genreMovies = this.playList.genreMovies;
    this.displayList = JSON.parse(JSON.stringify(this.genreMovies.get(this.selectedValue)));
    this.segmentedList = this.displayList.slice(0, 5);
    for (let i = 1; (i * PAGE_LIMIT - this.displayList.length) < PAGE_LIMIT; i++) {
      this.paginator.push(i);
    }
    console.log(this.paginator);
  }

  paginate(buttonNo) {
    let upperLimit = (buttonNo) * PAGE_LIMIT;
    if (upperLimit > this.displayList.length) {
      upperLimit = this.displayList.length;
    }
    this.segmentedList = this.displayList.slice((buttonNo - 1) * PAGE_LIMIT, upperLimit);
  }
}
