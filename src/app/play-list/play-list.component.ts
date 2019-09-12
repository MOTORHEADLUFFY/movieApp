import { Component, OnInit } from '@angular/core';
import { UserSelectedService } from '../services/user-selected.service';
@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  constructor(
    public playList: UserSelectedService
  ) { }

  ngOnInit() {

  }

}
